import myAxios from '@renderer/service'
//获取预览试卷
export const getPreviewListMethods = (idsString) => {
    return myAxios({
        url: `paper/preview?${idsString}`,
        method: 'get',
    });
};
//创建试卷
export const createPaperMethods = (data) => {
    return myAxios({
        url: `/exam/add`,
        method: 'post',
        data: data,
    });
};
//获取所有的考试
export const getExamMethods = (params) => {
    return myAxios({
        url: `/exam/query`,
        method: 'get',
        params: params,
    });
};