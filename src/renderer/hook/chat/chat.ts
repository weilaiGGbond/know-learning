import { useCallback, useEffect, useState } from "react"
import { useCourse } from "@renderer/pages/course"
import { getLessonChat, lessonMessageMethods } from "@renderer/api/student/chat"
import { useSelector } from "react-redux";
interface MessageData {
    code: number;
    data: any;
    msg: string;
}
interface chatTop {
    coverUrl: string,
    lessonName: string
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
    const [lessonMessage, setLessonMessage] = useState<chatTop>({} as chatTop)
    const { lessonId } = useCourse()
    //获取username
    const username = useSelector((state) => state.personReducer.username)
    console.log(username);

    const getLessonMessage = useCallback(async () => {
        const data = await lessonMessageMethods(lessonId) as unknown as MessageData
        if (data.code === 20000) {
            setLessonMessage(data.data)
        }
    }, [lessonId])
    //发送聊天消息
    const [inputMessage, setInputMessage] = useState('')
    //获取聊天消息
    const [chatMessage, setChatMessage] = useState<messageChatmain[]>([])
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    //获取聊天信息
    const [loading, setLoading] = useState(false);
    const getChatMessage = useCallback(async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        if (pages > page) {
            setPage(page + 1)
        } else {
            return
        }
        const data = await getLessonChat(lessonId, page, 10) as unknown as MessageData
        if (data.code === 20000) {
            setChatMessage([...chatMessage, ...data.data.records])
            setPages(data.data.pages)
            setLoading(false);
        }
    }, [page])
    return {
        getLessonMessage,
        lessonMessage,
        inputMessage,
        setInputMessage,
        getChatMessage,
        chatMessage
    }
}
export default chatMethods