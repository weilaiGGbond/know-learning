import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
  SwitcherOutlined
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components'
import { Input } from 'antd'
import { useState } from 'react'
// import avatar from '@renderer/assets/weixintupian.jpg'
// import background from '@renderer/assets/background.png'
// import tvp from '@renderer/assets/tvp.png'
// import tps from '@renderer/assets/tps.png'
import { props } from './setting'
import '@renderer/styles/user/user.scss'
import NailBar from '@renderer/components/layout/nailBar'
import { useNavigate } from 'react-router-dom'
function Home(): JSX.Element {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  }
  const navigate = useNavigate()
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1')
  const gotoUser=()=>{
    navigate('/userhome')
  }
  const gotoTest=()=>{
    navigate('/test')
  }

  return (
    <div>
      <NailBar>
        <SwitcherOutlined />
      </NailBar>
      <div>
        <div className='userHomecolor'>
          <button onClick={gotoUser}>点击去个人中心页</button>          
        </div>
        <div className='userHomecolor'>
          <button onClick={gotoTest}>点击去考试页</button>          
        </div>
      </div>
    </div>
  )
}

export default Home
