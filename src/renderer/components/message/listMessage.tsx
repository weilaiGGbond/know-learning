import { Avatar, Badge, List, Modal } from 'antd';
import React from 'react'
import icon from '@renderer/assets/img/image.png'
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '@renderer/hook/socketConnet';

const { confirm } = Modal;
const ListMessage = () => {
    const navigate = useNavigate()
    const data = [
        {
            title: '鹤归江野',
            description:"神明夸口有人在他影里漂泊",
            read:false
        },
        {
            title: '鹤归江野',
            description:"神明夸口有人在他影里漂泊",
            read:false
        },
        {
            title: '鹤归江野',
            description:"神明夸口有人在他影里漂泊",
            read:false
        },
        {
            title: '鹤归江野',
            description:"神明夸口有人在他影里漂泊",
            read:true
        },
    ];
    const deletMessage=()=>{
        confirm({
            title: '删除对话',
            content: '确定删除对话？',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    const gotoPeople=()=>{
        navigate('/message/people')
    }
    const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
        url: `ws://81.70.144.36:8080/ws/les`, 
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
    return (
  <div className='listmessage'>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item className='hoverIcon' onClick={gotoPeople}>
                    <List.Item.Meta
                        avatar={
                            <Badge dot={item.read}>
                                <Avatar src={icon}  />
                            </Badge>
                        }
                        title={item.title}
                        description={item.description}
                    />
                    <CloseOutlined className='hoverIcon__icon' onClick={deletMessage}/>
                </List.Item>
            )}
        />
  </div>
    )
}
export default ListMessage
