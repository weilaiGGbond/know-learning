import myAxios from '@renderer/service'
//获取老师申请列表
export const joinLesson = (pageNum:number,pageSize:number) => {
    return myAxios({
      url:`/tea/auditList?pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'get',
    })
}