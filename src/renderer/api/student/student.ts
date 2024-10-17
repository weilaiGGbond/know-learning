import myAxios from '@renderer/service'
export const joinClass = (code:string) => {
  return myAxios({
    url: '/stu/join',
    method: 'post',
    params: {code}
  })
}