import React from 'react'
import './assets/base.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'tailwindcss/tailwind.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
      <RouterProvider router={router}/>
    </ConfigProvider>
  </React.StrictMode>
)
