const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createWindow (shop) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: `persist:web${shop.name}`
    }
  })

  win.loadURL('https://www.baidu.com')
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})

ipcMain.on('open-url', (event, shop) => {
  createWindow(shop)
})