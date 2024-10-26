import { useCallback, useEffect, useState } from "react"
import { useCourse } from "@renderer/pages/course"
import { lessonMessageMethods } from "@renderer/api/student/chat"
import { useSelector } from "react-redux";
interface MessageData {
    code: number;
    data: any;
    msg: string;
}
interface chatTop {
    coverUrl:string,
    lessonName:string
    name:string,
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
    const [chatMessage, setChatMessage] = useState<Array<any>>([])
    return {
        getLessonMessage,
        lessonMessage,
        inputMessage,
        setInputMessage
    }
}
export default chatMethods