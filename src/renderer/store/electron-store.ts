// renderer/electron-store.js
const electronStore = window.store.ipcRenderer
const electronStorage = {
  getItem: async (key: unknown) => {
    const value = electronStore.getStoreValue(key)
    return value || null
  },

  setItem: async (key: unknown, value: string) => {
    electronStore.setStoreValue(key, value)
  },
  removeItem: (key: unknown) => {
    electronStore.deleteStore(key)
  }
}

export default electronStorage
