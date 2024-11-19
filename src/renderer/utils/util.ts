import moment from "moment";

const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds}秒前`;
    } else if (minutes < 60) {
        return `${minutes}分钟前`;
    } else if (hours < 24) {
        return `${hours}小时前`;
    } else if (days < 30) {
        return `${days}天前`;
    } else if (months < 12) {
        return `${months}个月前`;
    } else {
        return `${years}年前`;
    }
}
//返回区间
const turnDate = (startTime: string, endTime: string): string => {
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    };

    const formattedStartTime = formatDate(startTime);
    const formattedEndTime = formatDate(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
};
//返回单个时间
const getTImeStarandEnd = (endTime) => {
    console.log(endTime, '转化');
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    };
    const formattedEndTime = formatDate(endTime);

    return `${formattedEndTime}`;

}
export default {
    timeAgo,
    turnDate,
    getTImeStarandEnd
}