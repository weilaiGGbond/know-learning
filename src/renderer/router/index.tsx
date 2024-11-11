// src/router/index.ts
import { createBrowserRouter } from 'react-router-dom'
import Home from '@renderer/pages/home'
import Login from '@renderer/pages/login'
import Asset from '@renderer/pages/assets'
import Test from '@renderer/pages/test/student/index'
import MemorandumIndex from '@renderer/pages/memorandum/index'
import Course from '@renderer/pages/course'
import PersonCenter from '@renderer/pages/user'
import AssetList from '@renderer/pages/course/assent'
import NoticeSystem from '@renderer/pages/notice/index'
import TeacherSystem from '@renderer/pages/message/teacher'
import StudentSystem from '@renderer/pages/message/student'
import AIsend from '@renderer/components/AIsend/AIsend'
import TestMain from '@renderer/components/test/testMain'
import TestFinsh from '@renderer/pages/test/student/testFinsh'
// import MessagePeople from '@renderer/components/message/messPeople'
// 类型注释 router
const router: any = createBrowserRouter([
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
        path: 'course/:lessonId',
        element: <Course />,
        children: [
          {
            path: 'assetList',
            element: <AssetList />
          }
        ]
      },
      {
        path: 'notify',
        element: <NoticeSystem />
      },
      {
        path: 'test',
        element: <Test />
      },
      {
        path: '/memorandum',
        element: <MemorandumIndex />
      },
      {
        path: '/teacherSys',
        element: <TeacherSystem />
      },
      {
        path: '/studentSys',
        element: <StudentSystem />
      },
      {
        path: '/aisend',
        element: <AIsend />
      },
      {
        path: '/studenttest',
        element: <Test />
      },
      {
        path: '/testMain',
        element: <TestMain />
      },
      {
        path: '/testFinsh',
        element: <TestFinsh />
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
