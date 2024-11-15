import myAxios from '@renderer/service'
//获取查询试题
export const getQuestionList = (pageList) => {
    return myAxios({
        url: `/qu/query`,
        method: 'get',
        params: pageList

    })
}