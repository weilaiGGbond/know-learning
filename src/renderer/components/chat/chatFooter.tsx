import { SendOutlined } from "@ant-design/icons";
import chatMethods from "@renderer/hook/chat/chat";
import { Button, Input, message } from "antd";
import { Footer } from "antd/es/layout/layout";
import { chatConten } from "../message/messPeople";
import { useCourse } from "@renderer/pages/course";
import { useEffect } from "react";

const ChatFooter = (msg) => {
    const { WebSocket, sendMessage } = chatConten();
    const { inputMessage, setInputMessage } = chatMethods();
    const { lessonId } = useCourse()
    const {lastMessage,loadMore}=msg
    const handleSendMessage = () => {        
        if (WebSocket && WebSocket.readyState === WebSocket.OPEN) {
            if (inputMessage.trim() == '') {
                message.error('请输入消息内容');
            } else {
                sendMessage(JSON.stringify({
                    type: 0,
                    msg: inputMessage,
                    lessonId: lessonId
                }))
            }
        } else {
            message.error('请先检查网络连接');
        }
    };
    useEffect(()=>{
        loadMore(true)

    },[lastMessage])
    return (
        <Footer
            style={{ padding: '16px', background: '#fff', borderTop: '1px solid #f0f0f0' }}
            className="sticky bottom-0"
        >
            <div style={{ display: 'flex', gap: '8px' }}>
                <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                    placeholder="输入消息..."
                    style={{ flex: 1 }}
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage}>
                    发送
                </Button>
            </div>
        </Footer>
    );
};

export default ChatFooter;
