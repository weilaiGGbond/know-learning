import { useCallback, useEffect, useState } from "react";
import { useCourse } from "@renderer/pages/course";
import { getLessonChat, lessonMessageMethods } from "@renderer/api/student/chat";

interface MessageData {
    code: number;
    data: any;
    msg: string;
}

interface chatTop {
    coverUrl: string,
    lessonName: string,
    name: string,
}

interface messageChatmain {
    messageId: number,
    messageText: string,
    name: string,
    createTime: string,
    username: string,
}

const chatMethods = () => {
    const [lessonMessage, setLessonMessage] = useState<chatTop>({} as chatTop);
    const { lessonId } = useCourse();

    const getLessonMessage = useCallback(async () => {
        try {
            const data = await lessonMessageMethods(lessonId) as unknown as MessageData;
            if (data.code === 20000) {
                setLessonMessage(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [lessonId]);

    // 发送聊天消息
    const [inputMessage, setInputMessage] = useState('');
    // 获取聊天消息
    const [chatMessage, setChatMessage] = useState<messageChatmain[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    // 获取聊天信
    const [loading, setLoading] = useState(false);
    let totalpage = 1;
    const getChatMessage = useCallback(async (flag = false) => {
        setLoading(true);
        try {
            // 如果 flag 为 true，获取最后一页的数据
            const targetPage = flag ? totalpage : page;
            console.log(totalpage);

            if (totalpage > 0) {
                const data = await getLessonChat(lessonId, targetPage, 10) as unknown as MessageData;
                console.log(data.data);

                if (data.code === 20000) {
                    // 更新聊天消息

                    setChatMessage(prevMessages => [...prevMessages, ...data.data.records]);

                    totalpage = data.data.pages
                    setTotalPages(data.data.pages); // 更新总页数
                    setPage(targetPage); // 更新当前页
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [lessonId, page, totalPages]);
    const handleScroll = useCallback((event) => {
        console.log('455');
        
        const { scrollTop } = event.target;
        console.log(scrollTop);
        
        if (scrollTop === 0) { 
            // getChatMessage(false)
            if (page > 1) {
                (false); // false 表示获取上一页的数据
            }
        }
    }, [page]);
    // 先获取一下数据
    const getNewMessage = useCallback(async () => {
        const data = await getLessonChat(lessonId, page, 10) as unknown as MessageData;
        if (data.code === 20000) {
            setTotalPages(data.data.pages);
            setPage(data.data.pages)

            totalpage = data.data.pages;
            await getChatMessage(true)
        }
    }, [lessonId, page]);

    useEffect(() => {
        getNewMessage();
    }, [getNewMessage]);

    return {
        getLessonMessage,
        lessonMessage,
        inputMessage,
        setInputMessage,
        getChatMessage,
        chatMessage,
        page,
        totalPages,
        getNewMessage,
        handleScroll,
    };
}

export default chatMethods;
