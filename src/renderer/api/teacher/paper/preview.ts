import myAxios from '@renderer/service'
//获取预览试卷
export const getPreviewListMethods = (idsString) => {
    return myAxios({
        url: `paper/preview?${idsString}`,
        method: 'get',
    });
};