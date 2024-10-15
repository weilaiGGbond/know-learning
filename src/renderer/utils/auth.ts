import electronStorage from '@renderer/store/electron-store'
export const getTokenAuth = (): string => {
  const token = electronStorage.getItem('token')
  return token as unknown as string
}
