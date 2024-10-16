// 创建班级
import myAxios from '@renderer/service'
export const login = (param: { end: string; lessonName: string }, file: File) => {
  let data = { end: '', lessonName: '' }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/create',
    method: 'post',
    data: file,
    params: data
  })
}
// 获取课程邀请码
export const getInvite = (lessonId: number) => {
  return myAxios({
    url: '/tea/getInvite',
    method: 'get',
    params: {lessonId}
  })
}

// 获取课程列表
export const getLessonList = (param: { name: string; pageNum: number; pageSize: number }) => {
  let data = { name: '', pageNum: 1, pageSize: 10 }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/getList',
    method: 'get',
    params: data
  })
}

//根据父id获取文件列表
export const getFileList = (param: {
  parentId: number
  docTitle: string
  pageNum: number
  pageSize: number
  lessonId: number
}) => {
  let data = { parentId: 0, docTitle: '', pageNum: 1, pageSize: 10, lessonId: 0 }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/listFile',
    method: 'get',
    params: data
  })
}

// 创建文件夹
export const createFolder = (param: {
  parentId: number
  dirName: string
  lessonId: number
  isRoot: 0 | 1
}) => {
  let data = { parentId: 0, dirName: '', lessonId: 0, isRoot: 0 }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/makeDir',
    method: 'post',
    data: data
  })
}

// 上传文件
export const uploadFile = (param: { parentId: number; lessonId: number }, file: File) => {
  let data = { parentId: 0, lessonId: 0 }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/makeFile',
    method: 'post',
    data: file,
    params: data
  })
}
