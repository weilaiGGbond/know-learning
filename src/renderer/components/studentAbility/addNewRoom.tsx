import { AliwangwangOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List, message, Modal, Space } from 'antd'
import React, { useState } from 'react'
import Empty from '@renderer/assets/img/emptyMessage.png'
import { joinClass } from '@renderer/api/student/student'
import '@renderer/assets/styles/message/index.scss'
import useWebSocket from '@renderer/hook/socketConnet';

interface ListItem {
  title: string
  description: string
  avatar: string
}
interface NewRoomInvite {
  data: joinObj

  code: number
  title: string
  description: string
  avatar: string
}
interface joinObj {
  status: any
  lessonName: string
  lessonId: number
  name: string
  stuClass: string
}
interface joinObj {
  status: any
  lessonName: string
  lessonId: number
  name: string
  stuClass: string
}
const AddNewRoom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    //websocket
    const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
        url: `ws://81.70.144.36:8080/ws/audit`, 
        onOpen: () => {
        //连接成功
          console.log('WebSocket connected');
        },
        onClose: () => {
        //连接关闭
          console.log('WebSocket disconnected');
        },
        onError: (event) => {
        //连接异常
          console.error('WebSocket error:', event);
        },
        onMessage: (message) => {
        //收到消息
          console.log('WebSocket received message:', message);
        }
      })
    const [listAddnew, setListAddnew] = useState<joinObj>({
        name: '',
        status: null,
        lessonName: '',
        lessonId: 1,
        stuClass: ''
    });
    //课程码的输入框
    const [inputValue, setInputValue] = useState('');
    const joinNewClassMethods = () => {
        Modal.warning({
            title: '加入新班级',
            content: '确定加入新班级？',
            async onOk() {
                const invitedData = await joinClass(inputValue) as unknown as NewRoomInvite
                if (invitedData.code == 20000) {
                    setListAddnew(invitedData.data)
                    sendMessage(JSON.stringify(invitedData.data))
                    message.success('申请中，等待老师同意')
                }else{
                    message.error('加入失败,请检查邀请码')
                }
            }
        })
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="dragger">
      <Button
        type="primary"
        className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white duration-300"
        size="middle"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        加入班级
      </Button>
      <Modal title="填写邀请码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            defaultValue="请填写验证码"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="primary" onClick={joinNewClassMethods}>
            确定
          </Button>
        </Space.Compact>
        {listAddnew.name == '' ? (
          <img src={Empty} alt="没有数据" style={{ width: '100%', textAlign: 'center' }} />
        ) : (
          <div className="listMain">
            <Avatar size={32} icon={<Avatar src={<AliwangwangOutlined />} />} />
            <div className="listMainTitle">
              <p className="listMainText">{listAddnew.lessonName}</p>
              <p>{listAddnew.stuClass}</p>
            </div>
            <div className="listMainTeacher">
              <p>{listAddnew.name}</p>
            </div>
            <div>
              {listAddnew.status === 1 ? (
                <div style={{ color: '#1677ff' }}>同意</div>
              ) : listAddnew.status === 2 ? (
                <div style={{ color: '#fc3d49' }}>已拒绝</div>
              ) : listAddnew.status === 0 ? (
                <div style={{ color: '#1677ff' }}>审核中</div>
              ) : null}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AddNewRoom
