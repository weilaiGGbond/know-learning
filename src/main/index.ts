import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
let mainWindow: BrowserWindow | null = null
let loginWindow: BrowserWindow | null = null
import Store from 'electron-store' // 同步导入

let store = new Store()

initIpcRenderer()
function initIpcRenderer() {
  ipcMain.on('setStore', (_, key, value) => {
    store.set(key, value)
  })

  ipcMain.on('getStore', (event, key) => {
    try {
      const value = store.get(key) // 使用 electron-store 获取存储的值
      // 确保 event.returnValue 被赋予的是字符串、对象等合法值
      event.returnValue = value !== undefined ? value : null
    } catch (error) {
      event.returnValue = null // 如果有错误，返回 null 而不是字符串
      console.error('Error retrieving value from store:', error)
    }
  })

  ipcMain.on('deleteStore', (_, key) => {
    store.delete(key)
  })
}
const Authentication = store.get('token')

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // IPC listeners
  ipcMain.on('maximize-window', (_) => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    }
  })

  ipcMain.on('minimize-window', (_) => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.minimize()
    }
  })

  ipcMain.on('close-window', (_) => {
    mainWindow?.close()
  })
}
function createLoginWindow(): void {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 620,
    autoHideMenuBar: true, // Hide menu controls
    resizable: false, // Make the window non-resizable
    frame: false, // Hide default window controls
    modal: true, // Modal to prevent interaction with other windows until closed
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loginWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/login`) // Load login page
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  loginWindow.show()
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('open-main-window', () => {
    if (!mainWindow) {
      createWindow()
    }
  })

  ipcMain.on('close-login-window', () => {
    if (loginWindow) {
      loginWindow.close()
    }
  })
  ipcMain.on('open-login-window', () => {
    if (!loginWindow) {
      createLoginWindow()
    }
  })
  if (BrowserWindow.getAllWindows().length === 0 && !Authentication) {
    createLoginWindow()
  } else {
    createWindow()
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0 && !Authentication) {
      createLoginWindow()
    } else {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
