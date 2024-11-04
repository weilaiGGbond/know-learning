'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Layout, List, Input, Button, Avatar, Typography, Space, message } from 'antd'
import chatMethods from '@renderer/hook/chat/chat'
import ChatTop from '../chat/chatTop'
import useWebSocket from '@renderer/hook/socketConnet'
import ChatFooter from '../chat/chatFooter'
import ChatConten from '../chat/chatConten'
import AIsendTop from './AIsendTop'
import { Content, Footer } from 'antd/es/layout/layout'
import Util from '@renderer/utils/util';
import { useSelector } from 'react-redux'
import { SendOutlined } from '@ant-design/icons'
const { Text } = Typography

interface Message {
    id: number
    text: string
    sender: 'user' | 'contact'
    timestamp: string
}

interface Contact {
    id: number
    name: string
    avatar: string
}
interface messageChatmain {
    messageId: number,
    messageText: string,
    name: string,
    createTime: number,
    username: string,
}

interface ChatContextType {
    chatMessage: {
        coverUrl: string;
        lessonName: string;
        name: string;
    };
    WebSocket: WebSocket | null;
    sendMessage: (message: string) => void;
}

const AIsend = () => {
    const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
        url: `ws://81.70.144.36:8080/ws/model`,
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            console.log(data);

            // setAIchatList((prevList) => [...prevList, data])
        },
        onOpen: () => {
            console.log('WebSocket 连接已打开')
        },
        onError: (error) => {
            console.error('WebSocket 连接错误:', error)
        },
        onClose: () => {
            console.log('WebSocket 连接已关闭')
        }
    })
    const [AIchatList, setAIchatList] = useState([])
    const username = useSelector((state) => state.personReducer.username);
    const [inputMessage, setInputMessage] = useState('')
    const handleSendMessage = (() => {
        if (webSocket && webSocket.readyState === webSocket.OPEN) {
            if (inputMessage.trim() == '') {
                message.error('请输入消息内容');
            } else {
                sendMessage(JSON.stringify({
                    type: 0,
                    msg: inputMessage,
                    lessonId: 1
                }))
            }
        } else {
            message.error('请先检查网络连接');
        }
    })


    return (

        <Layout className="h-full">

            <>
                <AIsendTop />
                <Content
                    style={{ overflowY: 'auto', padding: '16px', background: '#fff' }}
                    className="srollBar overflow-auto"
                >
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 500,
                            overflow: 'auto',
                            padding: '0 16px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}

                    >
                        <List
                            dataSource={AIchatList}
                            renderItem={(message: messageChatmain) => (
                                <div>
                                    <List.Item
                                        style={{
                                            justifyContent: message.username === username ? 'flex-end' : 'flex-start'
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: '70%',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                background: message.username === username ? '#d6eae9' : '#f0f2f5',
                                                color: message.username === username ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                                            }}
                                        >
                                            <Text>{message.messageText}</Text>
                                        </div>
                                    </List.Item>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', opacity: 0.7 }}>
                                            {Util.timeAgo(message.createTime)}
                                        </Text>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </Content>
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
            </>


        </Layout>

    )
}
export default AIsend
