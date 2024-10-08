import {
  CloseOutlined,
  ExpandOutlined,
  MessageOutlined,
  MinusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Input, Modal } from 'antd'
import { useState } from 'react'
import avatar from '@renderer/assets/weixintupian.jpg'
import background from '@renderer/assets/background.png'
import tvp from '@renderer/assets/tvp.png'
import tps from '@renderer/assets/tps.png'
import { props } from './setting'
import { useNavigate, Route, Routes } from 'react-router-dom'
import '@renderer/assets/styles/layout/nailbar.scss'
function Home(): JSX.Element {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  }
  const navigate = useNavigate()

  const [pathname, setPathname] = useState('/welcome')
  const { route } = props
  console.log(route)
  const gotoMessage = () => {
    console.log('111114444');
    
    navigate('/notify')
  }
  const maxSizeMethods = () => {
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
  return (
    <div id="test-pro-layout">
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
            <div className="flex items-center gap-1  dragger">
              <div className="avatar w-7 h-7 rounded-full">
                <img src={avatar} alt="用户头像" className="w-full h-full rounded-full" />
              </div>
              <div className="userName text-sm">张三上刷</div>
            </div>,
            <MessageOutlined key="MessageOutlined" className="dragger" onClick={gotoMessage} />,
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
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome')
              navigate(item.path || '/welcome') // 路由跳转
            }}
          >
            {dom}
          </div>
        )}
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
