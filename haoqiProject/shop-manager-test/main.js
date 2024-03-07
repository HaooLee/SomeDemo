const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('node:url');
const path = require('node:path')

let mainWindow

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })


  mainWindow.webContents.openDevTools();
  mainWindow.loadURL('http://localhost:3000')

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './build/index.html'), protocol: 'file:', slashes: true }))

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