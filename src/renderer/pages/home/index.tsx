import {
  CloseOutlined,
  ExpandOutlined,
  MessageOutlined,
  MinusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Button, Input, Modal, Popover } from 'antd'
import { useEffect, useState } from 'react'
import avatar from '@renderer/assets/weixintupian.jpg'
import background from '@renderer/assets/background.png'
import tvp from '@renderer/assets/tvp.png'
import tps from '@renderer/assets/tps.png'
import { props } from './setting'
import { useNavigate, Route, Routes } from 'react-router-dom'
import '@renderer/assets/styles/layout/nailbar.scss'
import AddNewRoom from '@renderer/components/studentAbility/addNewRoom'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenAuth, learnStorage } from '@renderer/utils/auth'
import { logout } from '@renderer/api/login'
import { setNewConnect } from '@renderer/store/reducers/socket'
import userMessage from '@renderer/hook/message/user'
import useWebSocket from '@renderer/hook/socketConnet'
function Home(): JSX.Element {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  }
  const log = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定要退出登录吗',
      onOk() {
        logout()
      },
      onCancel() { }
    })
  }
  const content = (
    <div className="flex flex-col gap-1">
      <Button type="text">个人中心</Button>
      <Button type="text" onClick={log}>
        退出登录
      </Button>
    </div>
  )

  const navigate = useNavigate()

  const [pathname, setPathname] = useState('/welcome')
  const { route } = props
  console.log(route)
  const gotoMessage = async () => {
    const role = await learnStorage.getItem('role')
    setRead(0)
    if (role == 0) {
      return navigate('/studentSys')
    } else {
      return navigate('/teacherSys')
    }
  }
  const maxSizeMethods = () => {
    console.log(1111111111)

    window.api.maximizeWindow()
  }

  const minimizeMethods = () => {
    window.api.minimizeWindow()
  }

  const closeMethods = () => {
    Modal.confirm({
      title: '退出程序',
      content: '确定要退出程序吗',
      onOk() {
        window.api.closeWindow()
      },
      onCancel() {}
    })
  }

  const { noReadmessageData,setRead } = userMessage()
  const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
    url: `ws://81.70.144.36:8080/ws/audit`, 
    onOpen: () => {
    //连接成功
      console.log('WebSocket connected');
    },
    onClose: () => {
    //连接关闭
      console.log('WebSocket disconnected');
    },
    onError: (event) => {
    //连接异常
      console.error('WebSocket error:', event);
    },
    onMessage: (message) => {
    //收到消息
      console.log('WebSocket received message:', message);
      message.info('收到一条新消息，请及时查看')

    }
  })
  return (
    <div id="test-pro-layout" className="h-screen">
      <ProLayout
        title=""
        logo={
          <h1
            className="font-bold italic font-mono text-5xl bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-center"
            style={{ fontSize: '30px', color: 'transparent' }}
          >
            JUST-doit
          </h1>
        }
        bgLayoutImgList={[
          {
            src: tvp,
            left: 85,
            bottom: 100,
            height: '303px'
          },
          {
            src: tps,
            bottom: -68,
            right: -45,
            height: '303px'
          },
          {
            src: background,
            bottom: 0,
            left: 0,
            width: '331px'
          }
        ]}
        {...props}
        // route={{ route }}
        location={{
          pathname
        }}
        menu={{
          type: 'group'
        }}
        actionsRender={(props) => {
          if (props.isMobile)
            return [
              <div
                className="dragger"
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginInlineEnd: 24
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: 'rgba(0,0,0,0.03)'
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: 'rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  }
                  placeholder="搜索方案"
                  variant="borderless"
                />
              </div>,
              <div
                className="h-6 w-[1.5px] bg-[#ccc] mx-2"
                style={{ pointerEvents: 'none', paddingInline: 0 }}
              ></div>,
              <MinusOutlined className="dragger" onClick={minimizeMethods} />,
              <ExpandOutlined className="dragger" onClick={maxSizeMethods} />,
              <CloseOutlined className="dragger" onClick={closeMethods} />
            ]
          return [
            props.layout !== 'side' && document.body.clientWidth > 900 ? (
              <div
                className="dragger"
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginInlineEnd: 24
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: 'rgba(0,0,0,0.03)'
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: 'rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  }
                  placeholder="搜索方案"
                  variant="borderless"
                />
              </div>
            ) : undefined,
            <Popover content={content} trigger="click">
              <div className="flex items-center gap-1  dragger">
                <div className="avatar w-7 h-7 rounded-full">
                  <img src={avatar} alt="用户头像" className="w-full h-full rounded-full" />
                </div>
                <div className="userName text-sm">张三上刷</div>
              </div>
            </Popover>,

            <div className='messageTextMain'>
              <MessageOutlined key="MessageOutlined" className="dragger" onClick={gotoMessage} />,

              {
                noReadmessageData > 0 && <div className='messageText'></div>

              }
            </div>,

            <div
              className="h-6 w-[1.5px] bg-[#ccc] mx-2"
              style={{ pointerEvents: 'none', paddingInline: 0 }}
            ></div>,
            <MinusOutlined className="dragger" onClick={minimizeMethods} />,
            <ExpandOutlined className="dragger" onClick={maxSizeMethods} />,
            <CloseOutlined className="dragger" onClick={closeMethods} />,
            <div></div>
          ]
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12
              }}
            ></div>
          )
        }}
        // menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) =>
          item.display === false ? null : (
            <div
              onClick={() => {
                setPathname(item.path || '/welcome')
                navigate(item.path || '/welcome') // 路由跳转
              }}
            >
              {dom}
            </div>
          )
        }
        {...settings}
      >
        <PageContainer title={false}>
          <Routes>
            {props.route.routes?.map((item) => {
              const ChildComponent = item.component
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={ChildComponent ? <ChildComponent /> : null}
                />
              )
            })}
          </Routes>
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default Home
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
