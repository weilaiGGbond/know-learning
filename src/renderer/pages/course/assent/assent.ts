// 文件相关方法
import { uploadFile } from '@renderer/api/teacher'
import { message } from 'antd'
import wordIcon from '@renderer/assets/img/wordIcon.png'
import pdfIcon from '@renderer/assets/img/pdfIcon.png'
import unknown from '@renderer/assets/img/unknown.png'
import dir from '@renderer/assets/img/dir.png'
import xlsx from '@renderer/assets/img/xlsx.png'

// 上传文件
export const uploadFileCourse = (params: {
  fileName: string
  filePath: string
  lessonId: number
  parentId: number
}) => {
  uploadFile(params)
    .then((res) => {
      if (res) {
        message.success('上传成功')
      }
    })
    .catch((err) => {
      message.error(err.errMsg)
    })
}
export const getFileType = (item: DataType) => {
  if (item.isDir === 1) return dir
  const extension = item.docRef?.split('.').pop() || ''
  return iconMap[extension] || unknown
}

