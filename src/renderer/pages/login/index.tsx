import { Input, Flex, Button, Divider, Checkbox } from 'antd'
import {
  WechatOutlined,
  GithubOutlined,
  SafetyCertificateFilled,
  EyeTwoTone,
  EyeInvisibleOutlined
} from '@ant-design/icons'
import logo from '@renderer/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import NailBar from '@renderer/components/layout/nailBar'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@renderer/api/login'
import { setToken } from '@renderer/store/reducers/person'
import { setTokenAuth } from '@renderer/utils/auth'
const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()

  // 修改此处以匹配 CheckboxChangeEvent
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    if (isChecked) {
      login({ username: userName, password }).then(async (res) => {
        await setTokenAuth(res.data.token)
        dispatch(setToken(res.data.token))
        // 关闭登录、
        window.api.openWindow()
        window.api.closeLoginWindow()
        // 打开主界面
        navigate('/')
      })
    }
  }

  return (
    <>
      <NailBar />
      <div>
        <div className="px-10 py-5">
          <Flex vertical justify="center">
            <img src={logo} alt="logo" className="w-32" />
            <p className="text-lg text-gray-900 italic" style={{ fontFamily: 'cursive' }}>
              让知识变得更简单，让学习变得更有趣
            </p>
          </Flex>
          {/* 用户邮箱验证码登录 */}
          <div className="mt-8">
            <Flex vertical gap={25}>
              <Input
                placeholder="请输入用户账号"
                className="h-10"
                value={userName}
                onChange={handleUserNameChange}
              />
              <Flex gap={12}>
                <Input.Password
                  placeholder="请输入用户密码"
                  className="h-10"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Flex>
              <Button
                className="h-10 bg-blue-100 duration-500"
                type="primary"
                onClick={handleLogin}
                disabled={!isChecked}
              >
                登录
              </Button>
            </Flex>
            <Checkbox className="text-sm my-4" onChange={handleCheckboxChange}>
              我已同意阅读 知学 <span className="text-sm text-blue-400">服务协议</span> 和{' '}
              <span className="text-sm text-blue-400">隐私权政策</span>
            </Checkbox>
          </div>
        </div>
        <div className="fixed bottom-4 px-10 w-full">
          <Divider>
            <span className="text-sm">其他登录方式</span>
          </Divider>
          <Flex gap="middle" justify="space-around" className="w-1/2 m-auto">
            <Button shape="round" icon={<SafetyCertificateFilled />} className="text-xs">
              验证码登录
            </Button>
            <Button shape="circle" type="primary" className="bg-[#3cb034]">
              <WechatOutlined />
            </Button>
            <Button shape="circle" type="primary" className="bg-black">
              <GithubOutlined />
            </Button>
          </Flex>
          <p className="text-xs text-gray-900 text-center mt-5 cursor-pointer">客服反馈</p>
        </div>
      </div>
    </>
  )
}

export default Login
