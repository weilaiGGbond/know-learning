import myAxios from '@renderer/service'
interface question {
    questionAnalysis: string
    questionContent: string
    questionLevel: number
    questionType: number
    questionSubject: string
    ansList: { ansContent: string; isRight: number }[]
}
//获取查询试题
export const getQuestionList = (pageList) => {
    return myAxios({
        url: `/qu/query`,
        method: 'get',
        params: pageList

    })
}
export const getAllBankList = () => {
    return myAxios({
        url: `/repo/repoSelf?pageNum=1&pageSize=1000`,
        method: 'get',

    })
}
//通过id查询试题
export const getQuestionById = (id: string) => {
    return myAxios({
        url: `/qu/getDetail?questionId=${id}`,
        method: 'get',
    })
}
// 上传试题
export const uploadQuestion = (data: question) => {
    const dataList = data.ansList;
    const { questionAnalysis, questionContent, questionLevel, questionType, questionSubject } = data;
    const params = { questionAnalysis, questionContent, questionLevel, questionType, questionSubject };
    return myAxios({
        url: `/qu/add`,
        method: 'post',
        data: dataList,
        params: params
    })
}