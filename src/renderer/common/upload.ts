// 上传相关函数/类
import { message } from 'antd'
import sparkMD5 from 'spark-md5'
import Plimit from 'p-limit'
import { upload, mergeFile, getNotUpload } from '@renderer/api/common/upload'

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
    this.limit = Plimit(2)
    this.chunks = []
    this.Md5Str = undefined
    this.fileName = fileName
    this.unUploadChunks = []
    this.progressCallback = progressCallback
  }
  async calculateMD5(chunks: Blob[]): Promise<string> {
    const spark = new sparkMD5()
    await Promise.all(
      chunks.map((chunk) => {
        return new Promise<void>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            spark.append(e.target?.result as ArrayBuffer)
            resolve()
          }
          reader.readAsArrayBuffer(chunk)
        })
      })
    )
    return spark.end()
  }

  chunkFile(): Blob[] {
    // 获取文件需要分片的长度
    const chunks = Math.ceil(this.file.size / this.chunkSize)
    const chunksList: Blob[] = []
    // 当前分片的索引
    let currentChunk = 0
    // 当当前分片索引小于分片长度时，进行分片
    while (currentChunk < chunks) {
      // 计算当前分片的开始位置和结束位置
      // 当前分片的开始位置为当前分片索引 * 分片长度
      // 当前分片的结束位置为当前分片索引 * 分片长度 + 分片长度
      // 与 文件长度 中的最小值
      const start = currentChunk * this.chunkSize
      const end = Math.min(start + this.chunkSize, this.file.size)
      // 截取当前分片的blob
      const chunk = this.file.slice(start, end)
      // 将当前分片的blob追加到chunksList数组中
      chunksList.push(chunk)
      // 分片索引+1
      currentChunk++
    }
    return chunksList
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
    try {
      // 1. 将文件进行分片
      this.chunks = this.chunkFile()
      console.log('文件分片:', this.chunks)
      // 2. 计算文件的 MD5
      this.Md5Str = await this.calculateMD5(this.chunks)
      console.log('文件MD5:', this.Md5Str)
      // 3. 查询未上传的索引,同时判断该文件是否上传过
      this.unUploadChunks = await this.getNotUp()
      console.log('未上传的索引:', this.unUploadChunks)
      // 3. 准备上传每个分片
      const promiseList: Promise<any>[] = this.unUploadChunks.map((index) => {
        const formData = new FormData()
        formData.append('file', this.chunks[index])
        console.log('formData', formData, this.chunks[index])
        return this.limit(() => this.uploadChunk(formData, index)).then(() =>
          this.progressCallback((index + 1) / this.chunks.length)
        )
      })

      // 4. 等待所有分片上传完成
      await Promise.all(promiseList)
      // 5. 后续处理，例如：请求合并分片接口
      await this.mergeChunks()
      message.success('所有分片上传成功')
    } catch (err) {
      console.log('上传失败', err)

      message.error('上传失败')
    }
  }

  async mergeChunks(): Promise<void> {
    // 模拟合并的逻辑，可以替换为实际接口
    if (!this.Md5Str) return
    const params = { fileName: this.fileName, md5: this.Md5Str, total: this.chunks.length }
    return mergeFile(params)
      .then((res) => {
        console.log('合并成功', res)
      })
      .catch((err) => {
        console.log('合并失败', err)
      })
  }

  //   查询未上传的索引
  async getNotUp(): Promise<number[]> {
    console.log(this.Md5Str)

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
      console.log(error, 2222222222, 'error')
      message.error(error?.msg || 'Error fetching not-uploaded chunks')
      return []
    }
  }
}

export default FileUpload
