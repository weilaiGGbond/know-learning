import React, { useState } from 'react'
import { Button, message, Modal } from 'antd'
import BaiduMap from '@renderer/components/BaiduMap'
import { EnvironmentFilled } from '@ant-design/icons'
import useWebSocket from '@renderer/hook/socketConnet'
import { studentSign } from '@renderer/api/student'
const StudentCheck: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<{ longitude: number; latitude: number }>({
    longitude: 0,
    latitude: 0
  })
  const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
    url: 'ws://81.70.144.36:8080/ws/les',
    onOpen: () => {
      console.log('连接成功')
    },
    onClose: () => {
      console.log('连接关闭')
    },
    onError: () => {
      console.log('连接错误')
    },
    onMessage: (message) => {
      console.log('收到消息', message)
    }
  })
  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setLoading(true)
    if (position.longitude === 0 || position.latitude === 0) {
      message.error('位置信息获取失败，请重新获取位置信息后重试')
      return
    }
    console.log(position, 'position', lastMessage)
    // studentSign({
    //   longitude: position.longitude,
    //   latitude: position.latitude,
    //   lessonId: 1
    // }).then((res) => {
    //   if (res) {
    //     console.log(res)
    //     message.success('签到成功')
    //   } else {
    //     message.error('签到失败')
    //   }
    // })
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 3000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const getCheck = (value: { longitude: number; latitude: number }) => {
    setPosition(value)
  }

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EnvironmentFilled />}>
        位置签到
      </Button>
      <Modal
        open={open}
        title="位置签到"
        onCancel={handleCancel}
        footer={[
          <Button loading={loading} onClick={handleCancel}>
            取消
          </Button>,
          <Button type="primary" loading={loading} onClick={handleOk}>
            签到
          </Button>
        ]}
      >
        <div className="h-[300px] w-full">
          <BaiduMap getCheck={(value) => getCheck(value)} />
        </div>
      </Modal>
    </>
  )
}

export default StudentCheck
