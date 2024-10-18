import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'
import Asset from '../assets'
import PersonCenter from '../user'
import Course from '../course'

interface RouteItem {
  path: string
  name?: string
  icon?: React.ReactNode
  component?: React.ComponentType
  routes?: RouteItem[]
}
interface DisplayRoute {
  path: string
  component?: React.ComponentType
  routes?: DisplayRoute[]
}
const route: RouteItem[] = [
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
    path: 'course/:id',
    component: Course
  }
]
const displayRoute: DisplayRoute[] = [
  {
    path: 'notify',
    component: Course
  }
]

export const props = {
  route: {
    path: '/',
    routes: [...route, ...displayRoute]
  },
  location: {
    pathname: '/'
  }
}
