import React from 'react'
import '@renderer/assets/styles/message/index.scss'
import emptyMessage from '@renderer/assets/img/emptyMessage.png'

import ListMessage from '@renderer/components/message/listMessage'
import MessagePeople from '@renderer/components/message/messPeople'
import { Route, Routes } from 'react-router-dom'
const Message = (): JSX.Element => {
    return (
        <div>
            <div className='message'>
                <div className='message__main srollBar'>
                    <div className='message__main-left'>
                        <div className='message__main-left-title'>
                            <p>
                                近期消息
                            </p>
                        </div>
                        <div className='message__main-left-conten srollBar'>
                            <ListMessage />
                        </div>
                    </div>
                    <div className='message__main-right'>
                        <Routes>
                            <Route path='/message' element={
                                <div className='message__main-right-iconmessage'>
                                    <img src={emptyMessage} alt="" />
                                </div>

                            } />
                            <Route path='/message/people' element={<MessagePeople />} />
                        </Routes>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Message