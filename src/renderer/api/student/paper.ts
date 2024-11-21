import myAxios from "@renderer/service";

export const getPaperIdMethods = (examId: number, lessonId: number) => {
  return myAxios({
    url: `/exam/enter?examId=${examId}&lessonId=${lessonId}`,
    method: 'post',
  })
}
export const getPaperLeftQuestionMethods = (paperId) => {
  return myAxios({
    url: `/paper/detail?paperId=${paperId}`,
    method: 'get',
  })
}
export const getPaperQuestionIdMethods = (paperId, questionID) => {
  return myAxios({
    url: `/paper/getQu?paperId=${paperId}&questionId=${questionID}`,
    method: 'get',
  })
}
export const sumbitAnswerMethods = (paperId, questionId,answer) => {
  const questionIdArr=JSON.stringify(answer)
  return myAxios({
    url: '/paper/fillAns',
    method: 'post',
    data:{
      answer:questionIdArr,
      paperId,
      questionId
    }
  })
}