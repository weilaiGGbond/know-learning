import { Input, Flex, Button, Radio, Divider } from 'antd'
import { WechatOutlined, KeyOutlined, GithubOutlined, SwitcherOutlined } from '@ant-design/icons'
import logo from '@renderer/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import NailBar from '@renderer/components/layout/nailBar'
const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const gotoHome = () => {
    navigate('/home')
  }
  return (
    <div>
      <NailBar />
      <div className="px-10 py-5">
        <Flex vertical justify="center">
          <img src={logo} alt="logo" className="w-32" />
          <p className="text-lg text-gray-900 italic" style={{ fontFamily: 'cursive' }}>
            让知识变得更简单，让学习变得更有趣
          </p>
        </Flex>
        {/* 用户邮箱验证码登录 */}
        <div className="mt-8">
          <Flex vertical gap={20}>
            <Input placeholder="请输入用户账号" className="h-10" />
            <Flex gap={12}>
              <Input placeholder="6位短信验证码" className="h-10" />
              <Button className="h-10">获取验证码</Button>
            </Flex>
            <Button className="h-10 bg-blue-100 duration-500" type="primary" onClick={gotoHome}>
              登录 / 注册
            </Button>
          </Flex>
          <Radio className="text-sm my-4">
            我已同意阅读 知学 <span className="text-sm text-blue-400">服务协议</span> 和{' '}
            <span className="text-sm text-blue-400">隐私权政策</span>
          </Radio>
        </div>
      </div>
      <div className="fixed bottom-4 px-10 w-[100%]">
        <Divider className="">
          <span className="text-sm">其他登录方式</span>
        </Divider>
        <Flex gap="middle" justify="space-around" className="w-[50%] m-auto">
          <Button shape="round" icon={<KeyOutlined />} className="text-xs">
            密码登录
          </Button>
          <Button shape="circle" type="primary" className="bg-[#3cb034]">
            <WechatOutlined />
          </Button>
          <Button shape="circle" type="primary" className="bg-[#000]">
            <GithubOutlined />
          </Button>
        </Flex>
        <p className="text-xs text-gray-900 text-center mt-5 cursor-pointer">客服反馈</p>
      </div>
    </div>
  )
}

export default Login
