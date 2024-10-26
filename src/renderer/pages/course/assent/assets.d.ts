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

interface FormStateType {
  docTitle: string
  pageNum: number
  pageSize: number
  parentId: number
  lessonId: number
}
