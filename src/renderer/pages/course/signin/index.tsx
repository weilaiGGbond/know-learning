// 签到
import { LineChartOutlined, SendOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import PostCheck from './postCheckIn'
import Statistics from './statistics'
import useWebSocket from '@renderer/hook/socketConnet'

function SingIn(): JSX.Element {
  const [_, sendMessage, lastMessage, _event] = useWebSocket({
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
  const items = [
    {
      key: '1',
      label: '发布签到',
      children: <PostCheck sendMessage={sendMessage} />,
      icon: <SendOutlined />
    },
    {
      key: '2',
      label: '签到统计',
      children: <Statistics lastMessage={lastMessage} />,
      icon: <LineChartOutlined />
    }
  ]
  return (
    <div className="signIn">
      <PageContainer
        title=" "
        tabList={items}
        tabBarExtraContent={
          <p className="CourseName pl-6 text-base font-bold text-[#131B26] sm:hidden xs:hidden lg:block">
            深入理解机器学习算法与应用：从基础理论到实际案例分析
          </p>
        }
      ></PageContainer>
    </div>
  )
}

export default SingIn
