import myAxios from '@renderer/service'
//获取老师申请列表
export const joinLesson = (pageNum: number, pageSize: number) => {
  return myAxios({
    url: `/tea/auditList?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
  })
}
//同意或拒绝申请
export const aduitStudentApplication = (choose: number, lessonStuId: number) => {
  return myAxios({
    url: `/tea/audit?choose=${choose}&lessonStuId=${lessonStuId}`,
    method: 'put',
  })
}
//获取未读消息 用户的
export const getNoRead = () => {
  return myAxios({
    url: `/user/getNoRead`,
    method: 'get',
  })
}
//设置已读 用户的
export const readMessage = () => {
  return myAxios({
    url: `/user/setRead`,
    method: 'put',
  })
}
