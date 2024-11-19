import { EnvironmentOutlined, PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useChatContext } from '@renderer/components/message/messPeople'
import MainPeople from '@renderer/components/message/people/mianPeople'

import BaiduMap from '../BaiduMap'
import { Avatar, Button, Modal, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useState } from 'react'
// 获取当前位置的地图
const ChatTop = () => {
  const { chatMessage } = useChatContext()
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const showLoading = () => {
    // 获取位置

    setOpen(true)
    setLoading(true)

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  return (
    <div>
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
            <Avatar src={chatMessage.coverUrl}></Avatar>
            <span>{chatMessage.lessonName}</span>
          </Space>
          <Space>
            <>
              <Button type="primary" onClick={showLoading} icon={<EnvironmentOutlined />}>
                位置签到
              </Button>
              <Modal
                className=""
                title={<p>获取当前位置</p>}
                footer={
                  <>
                    <Button type="primary" onClick={showLoading}>
                      重新获取
                    </Button>
                    <Button type="primary" onClick={showLoading}>
                      签到
                    </Button>
                  </>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
              >
                <p></p>
                <div className="w-full h-[300px] overflow-hidden">
                  <BaiduMap />
                </div>
              </Modal>
            </>
            <Button icon={<PhoneOutlined />} shape="circle" />
            <Button icon={<VideoCameraOutlined />} shape="circle" />
            <MainPeople />
          </Space>
        </div>
      </Header>
    </div>
  )
}
export default ChatTop
