// src/router/index.ts
import { createBrowserRouter } from 'react-router-dom'
import Home from '@renderer/pages/home'
import Login from '@renderer/pages/login'
import Asset from '@renderer/pages/assets'
import Test from '@renderer/pages/test/index'
import MemorandumIndex from '@renderer/pages/memorandum/index'
import Message from '@renderer/pages/message'
import MessagePeople from '@renderer/components/message/messPeople'
import Course from '@renderer/pages/course'
import PersonCenter from '@renderer/pages/user'
import AssetList from '@renderer/pages/course/assets'
import NoticeSystem from '@renderer/pages/notice/index'
// import MessagePeople from '@renderer/components/message/messPeople'
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
      },
      {
        path: 'person',
        element: <PersonCenter />
      },
      {
        path: 'course',
        element: <Course />,
        children: [
          {
            path: 'assetList',
            element: <AssetList />
          },
          {
            path: 'message',
            element: <Message />
          }
        ]
      },
      {
        path:'notify',
        element: <NoticeSystem />

      },
      {
        path:'test',
        element: <Test />

      },
      {
        path: '/memorandum',
        element: <MemorandumIndex />
      },
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
