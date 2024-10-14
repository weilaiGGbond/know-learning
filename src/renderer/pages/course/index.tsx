import { useMemo, useState } from 'react'
import {
  BookOutlined,
  ExceptionOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  SignatureOutlined,
  TwitchOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import AssetList from './assets'
import MessagePeople from '@renderer/components/message/messPeople'
const contact = {
  id: 1,
  name: 'lalall',
  avatar: 'URL_ADDRESS'
}
const items = [
  { key: '1', icon: <TwitchOutlined />, label: '聊天', component: <MessagePeople contact={contact} /> },
  { key: '2', icon: <FileProtectOutlined />, label: '考试' },
  { key: '3', icon: <FileTextOutlined />, label: '作业' },
  { key: '4', icon: <SignatureOutlined />, label: '课堂笔记' },
  { key: '5', icon: <BookOutlined />, label: '资料', component: <AssetList /> },
  { key: '6', icon: <ExceptionOutlined />, label: '错题集', component: <div>错题集内容</div> }
]

const Course = (): JSX.Element => {
  const [selectedKey, setSelectedKey] = useState('1')

  const handleMenuClick = (item) => {
    setSelectedKey(item.key)
  }

  const currentComponent = useMemo(() => {
    const selectedItem = items.find((item) => item.key === selectedKey)
    return selectedItem ? selectedItem.component : null
  }, [selectedKey])

  return (
    <div className="bg-white h-[82vh] rounded-md flex overflow-hidden course-detail">
      <div className="h-full border-r-[1.5px] border-[rgba(5, 5, 5, 0.06)] flex-shrink-0">
        <Menu
          selectedKeys={[selectedKey]}
          mode="inline"
          onClick={handleMenuClick}
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
            icon: item.icon
          }))}
        />
      </div>
      <div className="flex flex-col flex-grow h-full w-full">
        <div className="p-2 flex-1 h-full">
          {/* 占据剩余高度 */}
          {currentComponent}
        </div>
      </div>
    </div>
  )
}

export default Course
