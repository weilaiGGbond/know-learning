//建立webworker减少请求和处理时导致的性能问题
// 优化的地方
// 将MD5的生成 放到worker中  减少主线程的压力
import sparkMD5 from 'spark-md5'
async function calculateMD5(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        //通过sparkmd5 得到hash值 先获取buffer
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
            const buffer = e.target?.result
            if (!buffer) reject()
            const hashArr = new sparkMD5.ArrayBuffer().append(buffer as ArrayBuffer).end()
            resolve(hashArr)
        }
    })
}

function chunkFile(file: File, chunkSize: number): Blob[] {
    // 获取文件需要分片的长度
    const chunks = Math.ceil(file.size / chunkSize)
    const chunksList: Blob[] = []
    // 当前分片的索引
    let currentChunk = 0
    // 当当前分片索引小于分片长度时，进行分片
    while (currentChunk < chunks) {
        // 计算当前分片的开始位置和结束位置
        // 当前分片的开始位置为当前分片索引 * 分片长度
        // 当前分片的结束位置为当前分片索引 * 分片长度 + 分片长度
        // 与 文件长度 中的最小值
        const start = currentChunk * chunkSize
        const end = Math.min(start + chunkSize, file.size)
        // 截取当前分片的blob
        const chunk = file.slice(start, end)
        // 将当前分片的blob追加到chunksList数组中
        chunksList.push(chunk)
        // 分片索引+1
        currentChunk++
    }
    return chunksList
}
self.onmessage = async (event: { data: { file: File; chunkSize: number } }) => {
    const { file, chunkSize } = event.data
    const chunks = chunkFile(file, chunkSize)
    const Md5Str = await calculateMD5(file)
    self.postMessage({ Md5Str, chunks })
}

// 将合并的代码调用到子线程中进行处理
