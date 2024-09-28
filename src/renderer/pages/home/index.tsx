// home/index.tsx
import {
  GithubFilled,
  InfoCircleFilled,
  MessageOutlined,
  QuestionCircleFilled,
  SearchOutlined
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Input } from 'antd'
import { useState } from 'react'
import avatar from '@renderer/assets/weixintupian.jpg'
import background from '@renderer/assets/background.png'
import tvp from '@renderer/assets/tvp.png'
import tps from '@renderer/assets/tps.png'
import { props } from './setting'
import { useNavigate, Route, Routes } from 'react-router-dom'
import '@renderer/assets/styles/common.scss'
import NailBar from '@renderer/components/layout/nailBar'

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

  return (
  
      <div
        id="test-pro-layout"

      >
        <ProLayout
          title=""
          logo={
            <h1
              className="font-bold italic font-mono text-5xl bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-center px-5"
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
          avatarProps={{
            src: avatar,
            size: 'small',
            title: '七妮妮'
          }}
          actionsRender={(props) => {
            if (props.isMobile) return []
            return [
              props.layout !== 'side' && document.body.clientWidth > 900 ? (
                <div
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
              <MessageOutlined key="MessageOutlined" />,
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled key="GithubFilled" />
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
