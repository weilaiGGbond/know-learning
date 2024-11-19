// 签到
import { LineChartOutlined, SendOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import CreatQuestion from '@renderer/components/testCoponent/teacher/create/createQuestion'

const items = [
  {
    key: '1',
    label: '发布签到',
    children: 'Tab 1',
    icon: <SendOutlined />
  },
  {
    key: '2',
    label: '签到统计',
    children: 'Tab 2',
    icon: <LineChartOutlined />
  }
]

function SingIn(): JSX.Element {
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
      >
        <CreatQuestion />
      </PageContainer>
    </div>
  )
}

export default SingIn
