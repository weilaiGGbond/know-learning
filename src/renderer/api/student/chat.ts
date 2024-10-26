import myAxios from "@renderer/service"

export const studentRecords = (pageNum: number, pageSize: number) => {
    return myAxios({
      url: `/stu/getRecords?pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'get',
    })
  }