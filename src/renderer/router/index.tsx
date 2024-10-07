// src/router/index.ts
import { createBrowserRouter } from 'react-router-dom'
import Home from '@renderer/pages/home'
import Login from '@renderer/pages/login'
import Asset from '@renderer/pages/assets'
import Test from '@renderer/pages/test/index'
import MemorandumIndex from '@renderer/pages/memorandum/index'
import Message from '@renderer/pages/message'
import MessagePeople from '@renderer/components/message/messPeople'
import PersonCenter from '@renderer/pages/user'
const router = createBrowserRouter([
  {/*  */
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
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/memorandum',
    element: <MemorandumIndex />
  },
  {
    path: '/message',
    element: <Message />,
    children: [
      {
        path: 'people',
        element: <Message />
      }
    ]
  },
  {
    path: '*',
    element: <Login /> // 捕获所有未匹配的路由
  }
])

export default router
