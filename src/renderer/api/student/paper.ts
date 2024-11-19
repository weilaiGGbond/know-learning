import myAxios from "@renderer/service";

export const getPaperIdMethods= (examId:number,lessonId:number) => {
    return myAxios({
      url: `/exam/enter?examId=${examId}&lessonId=${lessonId}`,
      method: 'post',
    })
}
export const getPaperLeftQuestionMethods= (paperId) => {
  return myAxios({
    url: `/paper/detail?paperId=${paperId}`,
    method: 'get',
  })
}