import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const Store = require('electron-store')
const store = new Store()
initIpcRenderer()
let mainWindow: BrowserWindow | null = null
let loginWindow: BrowserWindow | null = null
const Authentication = ''
// 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjYzVkN2JjMTliMDQ0NGM2YTQ4ZDc0MjQzYzc0YmQ5MiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyODczODk4MCwiZXhwIjoxNzI5MzQzNzgwfQ.p0Cd0dVkE3OWjz7uRcwX4-Q4KBLjQQeO-doM-He1l_4'
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
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
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  loginWindow.on('closed', () => {
    loginWindow = null
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
  ipcMain.on('open-login-window', () => {
    if (!loginWindow) {
      createLoginWindow()
    }
  })
  ipcMain.on('close-login-window', () => {
    if (loginWindow) {
      loginWindow.close()
    }
  })
  if (BrowserWindow.getAllWindows().length === 0) createLoginWindow()
  // createWindow()

  app.on('activate', () => {
    console.log('activate', BrowserWindow.getAllWindows().length === 0 && !Authentication)

    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow()
    // } else {
    //   createWindow()
    // }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function initIpcRenderer() {
  ipcMain.on('setStore', (_, key, value) => {
    store.set(key, value)
  })

  ipcMain.on('getStore', (_, key) => {
    let value = store.get(key)
    _.returnValue = value || ''
  })

  ipcMain.on('deleteStore', (_, key) => {
    let value = store.delete(key)
    _.returnValue = value || ''
  })
}
