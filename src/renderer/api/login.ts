import myAxios from '@renderer/service'
import { deleteTokenAuth } from '@renderer/utils/auth'
export const login = (param: { username: string; password: string }) => {
  let data = { username: '', password: '' }
  data = { ...data, ...param }
  return myAxios({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return myAxios({
    url: '/user/getProfile',
    method: 'get',
    params: {}
  })
}

// 退出登录
export const logout = async () => {
  deleteTokenAuth()
  // 打开登录窗口
  window.api.openLoginWindow()
  window.api.closeWindow()
}
