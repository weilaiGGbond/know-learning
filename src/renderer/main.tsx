import React from 'react'
import './assets/base.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'tailwindcss/tailwind.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import '@renderer/assets/styles/common.scss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ConfigProvider locale={zhCN}>
          <App />
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
    ,
  </React.StrictMode>
)
