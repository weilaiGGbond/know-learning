import { useMemo, useState, createContext, useContext, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import {
  BookOutlined,
  ExceptionOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  MehOutlined,
  SignatureOutlined,
  TwitchOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import AssetList from './assent'
import AIsend from '@renderer/components/AIsend/AIsend'
import MessagePeople from '@renderer/components/message/messPeople'
import Test from '../test/student/index'
import SingIn from './signin'
import StudentTestList from '../test/student/testList'

const CourseContext = createContext({
  lessonId: 0
})

const contact = {
  id: 1,
  name: 'lalall',
  avatar: 'URL_ADDRESS'
}

const items = [
  { key: '1', icon: <TwitchOutlined />, label: '聊天', componentType: 'MessagePeople' },
  { key: '2', icon: <FileProtectOutlined />, label: '考试', componentType: 'Exam' },
  { key: '3', icon: <FileTextOutlined />, label: '作业', componentType: 'Homework' },
  { key: '4', icon: <SignatureOutlined />, label: '课堂笔记', componentType: 'Notes' },
  { key: '5', icon: <BookOutlined />, label: '资料', componentType: 'AssetList' },
  { key: '6', icon: <ExceptionOutlined />, label: '错题集', componentType: 'Mistakes' },
  { key: '7', icon: <EnvironmentOutlined />, label: '位置签到', componentType: 'SignIn' },
  { key: '8', icon: <MehOutlined />, label: 'AI', componentType: 'AIsend' }
]

const Course = (): JSX.Element => {
  const { lessonId } = useParams()
  const actualLessonId = Number(lessonId) || 0
  const [selectedKey, setSelectedKey] = useState('1')

  const handleMenuClick = (item: { key: SetStateAction<string> }) => {
    setSelectedKey(item.key)
  }

  // 根据 componentType 动态渲染组件
  const currentComponent = useMemo(() => {
    const selectedItem = items.find((item) => item.key === selectedKey)
    if (!selectedItem) return null

    switch (selectedItem.componentType) {
      case 'AssetList':
        return <AssetList />
      case 'AIsend':
        return <AIsend />
      case 'MessagePeople':
        return <MessagePeople contact={contact} />
      case 'Mistakes':
        return <div>错题集内容</div>
      case 'Exam':
        return <StudentTestList />
      case 'SignIn':
        return <SingIn />
      default:
        return null
    }
  }, [selectedKey])

  return (
    <CourseContext.Provider value={{ lessonId: actualLessonId }}>
      <div className="bg-white h-[82vh] rounded-md flex overflow-hidden course-detail border">
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
            {/* 动态渲染当前选中的组件 */}
            {currentComponent}
          </div>
        </div>
      </div>
    </CourseContext.Provider>
  )
}

export default Course
export const useCourse = () => useContext(CourseContext)
