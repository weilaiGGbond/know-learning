import { getNoRead } from "@renderer/api/teacher/chat"
import { useEffect, useState } from "react"
interface Responsedata {
    code: number,
    data: any,
    msg: string
}
const userMessage = () => {
    const [noReadmessageData, setRead] = useState<number>(0)
    //获取用户未读消息
    const getNoReadMessagelen = async () => {
        const noReadData = await getNoRead() as unknown as Responsedata
        if (noReadData.code === 20000) {
            setRead(noReadData.data)
        }

    }
    useEffect(() => {        
        getNoReadMessagelen()
    }, [])
    return { noReadmessageData,setRead }
}
export default userMessage