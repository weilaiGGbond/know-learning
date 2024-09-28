// src/router/index.ts
import { createBrowserRouter } from 'react-router-dom'
import Home from '@renderer/pages/home'
import Login from '@renderer/pages/login'
import Asset from '@renderer/pages/assets'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'welcome',
        element: <Home />
      },
      {
        path: 'my-course',
        element: <Asset />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Login /> // 捕获所有未匹配的路由
  }
])

export default router
