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
import { getTokenAuth } from '@renderer/utils/auth'
const { Text } = Typography

interface messageChatmain {
    text: string
    user: boolean
}

const AIsend = () => {
    const [token, setToken] = useState('')
    const getToken = (async () => {
        const tokendata = await getTokenAuth() as string
        setToken(tokendata)
    })
    useEffect(() => {
        getToken()
    }, [])
    let result = ''
    const [AIchatList, setAIchatList] = useState<messageChatmain[]>([])
    const username = useSelector((state) => state.personReducer.username);
    const [inputMessage, setInputMessage] = useState('')
    const handleSendMessage = (() => {
        let messageTimeout: any;
        if (inputMessage.trim() == '') {
            message.error('请输入消息')
            return
        }
        let webSocket = new WebSocket(`ws://81.70.144.36:8080/ws/model`, [`${token}`])
        webSocket.onopen = () => {
            console.log('WebSocket 连接已打开');
            webSocket.send(JSON.stringify(inputMessage))
            setAIchatList((prevList) => [...prevList, {
                user: true,
                text: inputMessage,
            }])
        }

        webSocket.onmessage = (data) => {
            const messageData = data.data;
            result += messageData;
            clearTimeout(messageTimeout);
            messageTimeout = setTimeout(() => {
                console.log(result);
                
                setAIchatList((prevList) => [...prevList, {
                    user: false,
                    text: result,
                }]);
                console.log(AIchatList,'1111');
                
                result = ''; 
            }, 300);
        };
        webSocket.onerror = (error) => {
            console.error('WebSocket 连接错误:', error)
        }
        webSocket.onclose = () => {
            setAIchatList((prevList) => [...prevList, {
                user: true,
                text: result,
            }])

            console.log('WebSocket 连接已关闭')

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
                                            justifyContent: message.user ? 'flex-end' : 'flex-start'
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: '70%',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                background:  message.user ? '#d6eae9' : '#f0f2f5',
                                                color:  message.user ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                                            }}
                                        >
                                            <Text>{message.text}</Text>
                                        </div>
                                    </List.Item>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', opacity: 0.7 }}>
                                            {/* {Util.timeAgo(message.createTime)} */}
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
