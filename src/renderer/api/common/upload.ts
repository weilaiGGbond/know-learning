// 上传逻辑相关
// 分片上传
import myAxios from '@renderer/service'
export const upload = (param: { chunk: number; md5: string; total: number }, file: FormData) => {
  let data = { chunk: 0, md5: '', total: 0 }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/bigUpload',
    method: 'post',
    data: file,
    params: data
  })
}

// 查询未上传的索引
export const getNotUpload = (param: { md5: string }) => {
  let data = { md5: '' }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/getNoUp',
    method: 'get',
    params: data
  })
}

// 合并文件
export const mergeFile = (param: { fileName: string; md5: string; total: number }) => {
  let data = { fileName: '', md5: '', total: 0 }
  data = { ...data, ...param }
  return myAxios({
    url: '/tea/merge',
    method: 'post',
    params: data
  })
}

// 普通上传文件
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return myAxios({
    url: '/user/upload',
    method: 'post',
    data: formData
  })
}
