import electronStorage from '@renderer/store/electron-store'
export const getTokenAuth = async (): Promise<string> => {
  try {
    const token = await electronStorage.getItem('token')
    return token || ''
  } catch (error) {
    console.error('Error retrieving token:', error)
    return ''
  }
}

export const setTokenAuth = async (token: string) => {
  try {
    await electronStorage.setItem('token', token)
  } catch (error) {
    console.error('Error setting token:', error)
  }
}

export const deleteTokenAuth = async () => {
  try {
    electronStorage.removeItem('token')
  } catch (error) {
    console.error('Error deleting token:', error)
  }
}

export const learnStorage = {
  getItem: async (key: string) => {
    return await electronStorage.getItem(key)
  },
  set: async (key: string, value: string) => {
    await electronStorage.setItem(key, value)
  },
  remove: async (key: string) => {
    electronStorage.removeItem(key)
  }
}
