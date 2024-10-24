import myAxios from '@renderer/service'
export const studentCourses = (param: { name: string; pageNum: number; pageSize: number }) => {
  let data = { name: '', pageNum: 1, pageSize: 10 }
  data = { ...data, ...param }
  return myAxios({
    url: '/stu/getList',
    method: 'get',
    params: data
  })
}
