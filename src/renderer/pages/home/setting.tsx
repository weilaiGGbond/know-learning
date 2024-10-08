import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'
import Asset from '../assets'
import PersonCenter from '../user'
import Course from '../course'
import NoticeSystem from '../notice'
interface RouteItem {
  path: string
  name?: string
  icon?: React.ReactNode
  component?: React.ComponentType
  routes?: RouteItem[]
}
const route: RouteItem = {
  path: '/',
  routes: [
    {
      path: 'welcome',
      name: '欢迎',
      icon: <SmileFilled />,
      component: Asset
    },
    {
      path: 'my-course',
      name: '我的课程',
      icon: <CrownFilled />,
      component: Asset
    },
    {
      name: '我的笔记',
      icon: <TabletFilled />,
      path: 'list',
      component: Asset
    },
    {
      name: '个人中心',
      icon: <TabletFilled />,
      path: 'person',
      component: PersonCenter
    },
    {
      name: '课程',
      icon: <TabletFilled />,
      path: 'course',
      component: Course
    }, {
      name: '通知',
      icon: <TabletFilled />,
      path: 'notify',
      component: NoticeSystem
    }
  ]
}
export const props = {
  route: route,
  location: {
    pathname: '/'
  }
}
