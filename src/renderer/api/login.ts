import myAxios from '@renderer/service'
export const login = (param: { username: string; password: string }) => {
  let data = { username: '', password: '' }
  data = { ...data, ...param }
  return myAxios({
    url: '/user/login',
    method: 'post',
    data: data
  })
}
