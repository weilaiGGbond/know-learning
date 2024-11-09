import { requestObj } from "@renderer/utils/config";
import { getWebsocketUrl } from "@renderer/utils/getWebsocket";
import { forwardRef, useImperativeHandle, useState } from "react";
interface AItoolProps {
    isText?: boolean,
    responeHooled?: (result: string) => void,
    loadHoodeled?: (isLoading: boolean) => void,
    errorHoodle?: (isLoading: boolean) => void,

}
interface FatherRef {
    sumbitmessage: (v: any) => void //父类调用
}
const AItool = forwardRef<FatherRef, AItoolProps>((props, ref) => {

    const { isText, responeHooled, loadHoodeled, errorHoodle } = props
    // console.log(ref, '子元素收到的');


    let result = ''
    //历史消息
    const [history, setHistory] = useState<{ role: string, content: string }[]>([{
        role: 'AI', content: '你好，我是你的AI助手'
    }])

    useImperativeHandle(ref, () => ({ sumbitmessage: sendMessage }))
    const sendMessage = async (text: string) => {
        result = ''
        let url = await getWebsocketUrl()
        let socket = new WebSocket(url)
        socket.onopen = () => {

            if (loadHoodeled) loadHoodeled(true)
            console.log('AI WebSocket 连接已打开');
            let params = {
                header: {
                    app_id: requestObj.APPID,
                    uid: "wzy12345"
                },
                parameter: {
                    chat: {
                        domain: "general",
                        temperature: 0.5,
                        max_tokens: 1024,
                    }
                },
                payload: {
                    message: {
                        // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
                        text: [
                            ...history,
                            // ....... 省略的历史对话
                            { role: 'user', content: text }
                        ]
                    }
                }
            };
            socket.send(JSON.stringify(params));
        }
        socket.onmessage = (data) => {
            let responseData = JSON.parse(data.data)
            console.log(responseData, '8888');

            if (!responseData.payload) {
                socket.close()
                return
            }
            result += responseData.payload.choices.text[0].content
            console.log(responeHooled);

            if (responeHooled) responeHooled(result)
            if (responseData.header.code != 0) {
                console.error('出错了', responseData.header.code, responseData.header.message)
                socket.close()
            }
            if (responseData.header.code == 0) {
                if (responseData.payload.choices.text && responseData.header.status === 2) {
                    socket.close()
                }
            }



        }
        socket.onclose = (data) => {
            setHistory([
                ...history,
                { role: 'user', content: text },
                { role: 'AI', content: result }

            ])
            if (loadHoodeled) loadHoodeled(false)
        }
        socket.onerror = (data) => {
            console.log(data, '4444');

            if (errorHoodle) errorHoodle(false)
            console.log('AI WebSocket 连接已关闭');
        }
    }
    return null


})
export default AItool;

