// 配置主题颜色
// 配置导航栏跳转
import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'

export const props = {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '开始',
        icon: <SmileFilled />,
        component: './Welcome'
      },
      {
        path: '/admin',
        name: '我的资源',
        icon: <CrownFilled />,
        component: './Admin'
      },
      {
        name: '模板资源',
        icon: <TabletFilled />,
        path: '/list',
        component: './ListTableList'
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
