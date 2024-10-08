'use client'

import React, { useState } from 'react'
import MainPeople from './people/mianPeople'
import { Layout, List, Input, Button, Avatar, Typography, Space } from 'antd'
import {
  SendOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  EllipsisOutlined
} from '@ant-design/icons'

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

const MessagePeople = ({ contact }: ChatWindowProps) => {
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
    <Layout className="h-full">
      {contact ? (
        <>
          <Header
            style={{ background: '#fff', padding: '0 16px', borderBottom: '1px solid #f0f0f0' }}
            className="sticky top-0 z-10"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Space>
                <Avatar src={contact.avatar} alt={contact.name}>
                  {contact.name[0]}
                </Avatar>
                <Text strong>{contact.name}</Text>
              </Space>
              <Space>
                <Button icon={<PhoneOutlined />} shape="circle" />
                <Button icon={<VideoCameraOutlined />} shape="circle" />
                <MainPeople contact={contact} />
              </Space>
            </div>
          </Header>
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
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Text type="secondary">选择一个联系人开始聊天</Text>
        </div>
      )}
    </Layout>
  )
}
export default MessagePeople
