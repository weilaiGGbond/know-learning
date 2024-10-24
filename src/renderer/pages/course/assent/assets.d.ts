interface DataType {
  docId: number
  id: number
  docTitle: string
  docRef?: string
  isDir: number
}

interface DirType {
  id: number
  name: string
}

const iconMap = {
  doc: wordIcon,
  pdf: pdfIcon,
  xlsx: xlsx
}

interface FormStateType {
  docTitle: string
  pageNum: number
  pageSize: number
  parentId: number
  lessonId: number
}
