// 创建题目相关的函数
// 根据题型判断是否需要选项
export function createOption(questionType: string) {
    if (questionType === '2') {
        // 判断题
        return [{
            ansContent: '对',
            isRight: 1
        }, {
            ansContent: '错',
            isRight: 0
        }]
    } else if (questionType === '3') {
        // 简答题
        return []
    } else {
        // 选择题
        return [{
            ansContent: '选项',
            isRight: 0
        }, {
            ansContent: '选项',
            isRight: 0
        }, {
            ansContent: '选项',
            isRight: 0
        }, {
            ansContent: '选项',
            isRight: 0
        }]
    }
}

export const numberToLetter = (num: number) => {
    // 偏移量是 0 对应 'A'，所以需要加上 65
    return String.fromCharCode(num + 65)
}
// 判断是否是图片
export const patternImage = (url: string) => {
    return /\.(png|jpg|jpeg|gif|webp|bmp)$/.test(url)
}