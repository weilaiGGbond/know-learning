import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  openWindow: () => ipcRenderer.send('open-main-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  closeLoginWindow: () => ipcRenderer.send('close-login-window')
}
const electronHandler = {
  ipcRenderer: {
    setStoreValue: (key: any, value: any) => {
      ipcRenderer.send('setStore', key, value)
    },

    getStoreValue(key: any) {
      const res = ipcRenderer.send('getStore', key)
      return res
    },

    deleteStore(key: any) {
      ipcRenderer.send('deleteStore', key)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('store', electronHandler)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.store = electronHandler
}
