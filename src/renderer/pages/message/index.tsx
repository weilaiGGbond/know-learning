import React, { createContext, useContext } from 'react'
import '@renderer/assets/styles/message/index.scss'
import emptyMessage from '@renderer/assets/img/emptyMessage.png'

import ListMessage from '@renderer/components/message/listMessage'
import MessagePeople from '@renderer/components/message/messPeople'
import { Route, Routes } from 'react-router-dom'
import { useCourse } from '../course'
const ChatContext = createContext({
  lessonId: 0
})
const Message = (): JSX.Element => {
  const contact = {
    id: 1,
    name: '张三',
    avatar: 'https://example.com/avatar.jpg' // 替换为实际头像链接
  }
  // const { lessonId } = useCourse();
  return (
    <ChatContext.Provider value={{lessonId:0}}>
      <div className="h-full">
        <div className="message h-full">
          <div className="message__main srollBar">
            <div className="message__main-left">
              <div className="message__main-left-title">
                <p>近期消息</p>
              </div>
              <div className="message__main-left-conten srollBar">
                <ListMessage />
              </div>
            </div>
            <div className="message__main-right">
              <Routes>
                <Route path="/" element={<MessagePeople contact={contact}></MessagePeople>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </ChatContext.Provider>
  )

}
export const chatConten=()=>useContext(ChatContext)
export default Message
