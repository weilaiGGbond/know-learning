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

// 学生签到
export const studentSign = (param: { latitude: number; longitude: number; signId: number }) => {
  let data = { latitude: 0, longitude: 0, signId: 0 }
  data = { ...data, ...param }
  return myAxios({
    url: '/sign/click',
    method: 'post',
    params: data
  })
}