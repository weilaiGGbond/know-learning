import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'
import Asset from '../assets'
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
    }
  ]
}
export const props = {
  route: route,
  location: {
    pathname: '/'
  }
}
