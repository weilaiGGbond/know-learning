import { PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useChatContext } from '@renderer/components/message/messPeople'
import MainPeople from '@renderer/components/message/people/mianPeople'

import StudentCheck from '@renderer/pages/course/signin/studentCheck'
import { Avatar, Button, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
// 获取当前位置的地图
const ChatTop = ({lastMessage}) => {
  const { chatMessage } = useChatContext()
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
            <StudentCheck lastMessage={lastMessage} />
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
