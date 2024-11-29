// 上传相关函数/类
import { message } from 'antd'
import Plimit from 'p-limit'
import { upload, mergeFile, getNotUpload } from '@renderer/api/common/upload'
const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
class FileUpload {
  private limit: ReturnType<typeof Plimit>
  private chunks: Blob[]
  private Md5Str: string | undefined
  private unUploadChunks: number[]
  file: File
  chunkSize: number
  fileName: string
  progressCallback: (progress: number) => void
  constructor(
    file: File,
    chunkSize: number = 1024 * 1024 * 5,
    fileName: string = '默认名称',
    progressCallback: (progress: number) => void
  ) {
    this.file = file
    this.chunkSize = chunkSize
    this.limit = Plimit(5)
    this.chunks = []
    this.Md5Str = undefined
    this.fileName = fileName
    this.unUploadChunks = []
    this.progressCallback = progressCallback
  }


  async uploadChunk(formData: FormData, index: number): Promise<void> {
    if (!this.Md5Str) throw new Error('MD5 is undefined')
    const params = { chunk: index, md5: this.Md5Str, total: this.chunks.length }
    //每个分片的请求
    // index为当前分片的索引
    try {
      await upload(params, formData)
    } catch (err: any) {
      console.log('上传失败', err)
      message.error(err.msg)
    }
  }

  async startUpload(): Promise<void> { 
    worker.postMessage({
      file: this.file,
      chunkSize: this.chunkSize,
    })
    const workResponse: { chunks: Blob[], Md5Str: string } = await new Promise((resolve) => {
      worker.onmessage = (event) => {
        resolve(event.data)
      };
    })
    const { chunks, Md5Str } = workResponse;
    this.Md5Str = Md5Str
    this.chunks = chunks
    console.log('chunks', this.chunks)
    console.log('Md5Str', Md5Str)

    try {
      // 3. 查询未上传的索引,同时判断该文件是否上传过
      this.unUploadChunks = await this.getNotUp()
      console.log('未上传的索引:', this.unUploadChunks)
      // 3. 准备上传每个分片
      // 将分片上传放到子线程
      const promiseList: Promise<any>[] = this.unUploadChunks.map((index) => {
        const formData = new FormData()
        formData.append('file', this.chunks[index])
        console.log('formData', formData, this.chunks[index])
        return this.limit(() => this.uploadChunk(formData, index)).then(() =>
          this.progressCallback((index + 1) / this.chunks.length * 100)
        )
      })

      // 4. 等待所有分片上传完成
      await Promise.all(promiseList)
      // 5. 后续处理，例如：请求合并分片接口
      return await this.mergeChunks();
    } catch (err) {
      console.log('上传失败', err)
      message.error('上传失败')
    }
  }
  async mergeChunks(): Promise<any> {
    // 模拟合并的逻辑，可以替换为实际接口
    if (!this.Md5Str) return
    const params = { fileName: this.fileName, md5: this.Md5Str, total: this.chunks.length }
    try {
      const res = await mergeFile(params)
      console.log(res);

      return res 
    } catch (err) {
      console.log('合并失败', err)
    }
  }
  //   查询未上传的索引
  async getNotUp(): Promise<number[]> {
    if (!this.Md5Str) return []
    const params = { md5: this.Md5Str }
    try {
      const res = await getNotUpload(params)
      console.log(res)
      console.log('Chunks not uploaded:', res.data)
      return res.data
    } catch (error: any) {
      if (error.code === 51000) {
        // 文件未上传
        // 返回由chunks的长度组成的数组
        return Array.from({ length: this.chunks.length }, (_, i) => i)
      }
      message.error(error?.msg || 'Error fetching not-uploaded chunks')
      return []
    }
  }
}

export default FileUpload
