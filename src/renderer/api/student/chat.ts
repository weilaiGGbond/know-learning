import myAxios from "@renderer/service"

export const studentRecords = (pageNum: number, pageSize: number) => {
  return myAxios({
    url: `/stu/getRecords?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
  })
}
export const lessonMessageMethods = (lessonId: number) => {
  return myAxios({
    url: `/user/getLesson?lessonId=${lessonId}`,
    method: 'get',
  })
}
export const getLessonChat = (lessonId: number,page:number,pageSize:number) => {
  return myAxios({
    url: `/user/getChatDetails?lessonId=${lessonId}&pageNum=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}