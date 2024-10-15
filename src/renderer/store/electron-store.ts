const electronStore = window.store?.ipcRenderer
console.log(electronStore, 1111111111)

const electronStorage = {
  getItem: async (key: unknown) => {
    const value =  electronStore.getStoreValue(key)
    return value ? JSON.stringify(value) : null
  },
  setItem:async (key: unknown, value: string) => {
    electronStore.setStoreValue(key, JSON.parse(value))
  },
  removeItem: (key: unknown) => {
    electronStore.deleteStore(key)
  }
}

export default electronStorage
