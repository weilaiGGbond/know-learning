'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Layout, List, Input, Button, Avatar, Typography, Space } from 'antd'
import chatMethods from '@renderer/hook/chat/chat'
import ChatTop from '../chat/chatTop'
import useWebSocket from '@renderer/hook/socketConnet'
import ChatFooter from '../chat/chatFooter'
import ChatConten from '../chat/chatConten'
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
  const { getLessonMessage, lessonMessage,getChatMessage,getNewMessage,chatMessage,page,handleScroll } = chatMethods();
  const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
    url: `ws://81.70.144.36:8080/ws/les`,
  })
  useEffect(() => {
    getLessonMessage()
    getNewMessage()

  }, [])

  return (
    <ChatContext.Provider value={{ chatMessage: lessonMessage, WebSocket: webSocket, sendMessage: sendMessage }}>
      <Layout className="h-full">
        {contact ? (
          <>
            <ChatTop />
            <ChatConten chatMessage={chatMessage}
             loadMore={getChatMessage}
             page={page}
         
             />
            <ChatFooter lastMessage={lastMessage} chatMessage={chatMessage}  loadMore={getChatMessage} handleScroll={handleScroll}/>
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
