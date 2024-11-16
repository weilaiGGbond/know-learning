import myAxios from '@renderer/service'
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