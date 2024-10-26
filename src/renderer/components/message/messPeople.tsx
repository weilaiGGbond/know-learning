'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Layout, List, Input, Button, Avatar, Typography, Space } from 'antd'
import chatMethods from '@renderer/hook/chat/chat'
import ChatTop from '../chat/chatTop'
import useWebSocket from '@renderer/hook/socketConnet'
import ChatFooter from '../chat/chatFooter'
const { Header, Content, Footer } = Layout
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

interface ChatWindowProps {
  contact: Contact | null
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
const ChatContext = createContext<ChatContextType>({
  chatMessage: {
    coverUrl: '',
    lessonName: '',
    name: '',
  },
  WebSocket: null,
  sendMessage: (message: string) => void {

  }

})
const MessagePeople = ({ contact }: ChatWindowProps) => {
  const { getLessonMessage, lessonMessage } = chatMethods();
  const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
    url: `ws://81.70.144.36:8080/ws/les`,
  })
  useEffect(() => {

    getLessonMessage()
  }, [])
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: `你好，很高兴认识你！`, sender: 'contact', timestamp: '10:00' },
    { id: 2, text: '你好！我也很高兴认识你。', sender: 'user', timestamp: '10:01' }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '' && contact) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      // 模拟联系人回复
      setTimeout(() => {
        const contactReply: Message = {
          id: messages.length + 2,
          text: '收到你的消息了，我会尽快回复你。',
          sender: 'contact',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages((prevMessages) => [...prevMessages, contactReply])
      }, 1000)
    }
  }

  return (
    <ChatContext.Provider value={{ chatMessage: lessonMessage, WebSocket: webSocket, sendMessage: sendMessage }}>
      <Layout className="h-full">
        {contact ? (
          <>
            <ChatTop />
            <Content
              style={{ overflowY: 'auto', padding: '16px', background: '#fff' }}
              className="srollBar overflow-auto"
            >
              <List
                dataSource={messages}
                renderItem={(message) => (
                  <div>
                    <List.Item
                      style={{
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '70%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: message.sender === 'user' ? '#d6eae9' : '#f0f2f5',
                          color: message.sender === 'user' ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                        }}
                      >
                        <Text>{message.text}</Text>
                      </div>
                    </List.Item>
                    <div style={{ textAlign: 'center' }}>
                      <Text type="secondary" style={{ fontSize: '12px', opacity: 0.7 }}>
                        {message.timestamp}
                      </Text>
                    </div>
                  </div>
                )}
              />
            </Content>
            <ChatFooter />
          </>

        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Text type="secondary">您好像无权限</Text>
          </div>
        )}
      </Layout>
    </ChatContext.Provider>
  )
}
export default MessagePeople
export const chatConten = () => useContext(ChatContext)
