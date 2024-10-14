const electronStore = window.store

const electronStorage = {
  getItem: async (key: unknown) => {
    const value = await electronStore.get(key)
    return value ? JSON.stringify(value) : null
  },
  setItem: (key: unknown, value: string) => {
    electronStore.set(key, JSON.parse(value))
  },
  removeItem: (key: unknown) => {
    electronStore.set(key, undefined)
  }
}

export default electronStorage
