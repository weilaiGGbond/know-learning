'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Layout, List, Input, Button, Avatar, Typography, Space, message, Spin } from 'antd'
import chatMethods from '@renderer/hook/chat/chat'
import ChatTop from '../chat/chatTop'
import useWebSocket from '@renderer/hook/socketConnet'
import ChatFooter from '../chat/chatFooter'
import ChatConten from '../chat/chatConten'
import AIsendTop from '@renderer/components/AIsend/AIsendTop'
import { Content, Footer } from 'antd/es/layout/layout'
import Util from '@renderer/utils/util';
import { useSelector } from 'react-redux'
import { SendOutlined } from '@ant-design/icons'
import AItool from './AItool'
const { Text } = Typography

interface Message {
    text: string,
    user: boolean
}
const AIchatFront = () => {
    const [question, setQuestion] = useState<string>('')
    let result = ''
    const [isLoading, setloading] = useState<boolean>(false)
    const [messageList, setMessageList] = useState<Message[]>([])
    const ref = useRef<any>(null)
    const messageContainer = useRef<any>(null)
    const messageInputRef = useRef<any>(null)
    const loadingRef = useRef<any>(null)
    const sumbit = () => {
        setQuestion('')
        setMessageList(prevMessages => [
            ...prevMessages,
            { user: true, text: question }
        ])
        // debugger
        download()
        if (ref.current) {
            ref.current.sumbitmessage(question)
        }

    }
    const responseHoodle = (response: string) => {
        result = response
        loadingRef.current.innerText = result
        console.log(loadingRef.current.innerText, 'refhhhh');
        download()
    }
    const overResponse = (v: boolean) => {
        console.log(messageList, 'qaq');

        if (!v) {
            setMessageList((prevList) => [...prevList, { user: false, text: result }]);
            download()
        }
        setloading(v)
    }

    const download = () => {
        const h = messageContainer.current.scrollHeight;
        messageContainer.current.scrollTop = h + 20;
    };


    return (

        <Layout className="h-full">

            <>
                <AIsendTop />
                <Content
                    style={{ overflowY: 'auto', padding: '6px', background: '#fff' }}
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
                        ref={messageContainer}
                    >
                        {isLoading ? (
                            <div>
                                <p>Ai</p>
                                <div>
                                    <p ref={loadingRef}>{result}</p>
                                    <Spin />
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <List
                            dataSource={messageList}
                            renderItem={(message: Message) => (
                                <div>
                                    <List.Item
                                        style={{
                                            justifyContent: message.user ? 'flex-end' : 'flex-start'
                                        }}
                                        key={message.text}

                                    >
                                        <div
                                            style={{
                                                maxWidth: '70%',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                background: message.user ? '#d6eae9' : '#f0f2f5',
                                                color: message.user ? '#fff' : 'rgba(0, 0, 0, 0.85)'
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
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onPressEnter={sumbit}
                            placeholder="输入消息..."
                            style={{ flex: 1 }}
                        />
                        <Button type="primary" icon={<SendOutlined />} onClick={sumbit}>
                            发送
                        </Button>
                    </div>
                </Footer>
                <AItool loadHoodeled={overResponse} responeHooled={responseHoodle} ref={ref} />
            </>


        </Layout>

    )
}
export default AIchatFront
