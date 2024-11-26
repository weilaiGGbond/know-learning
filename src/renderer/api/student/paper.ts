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
  return myAxios({
    url: '/paper/fillAns',
    method: 'post',
    data:{
      answer:`${answer}`,
      paperId,
      paperQuId:questionId
    }
  })
}
//提交试卷
export const sumbitPaper = (paperId) => {
  return myAxios({
    url:`/paper/handPaper?paperId=${paperId}`,
    method: 'post',
  })
}