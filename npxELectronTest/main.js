const { app, BrowserWindow, crashReporter } = require('electron');

crashReporter.start({
  submitURL: 'http://172.16.0.72:8093/homestay/api/v1/report/electron_crash',
  extra: {
    "build-version": 'buildVersion',
  }
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: 'crash test',
    webPreferences: {
      devTools: true,
      sandbox: false,
      // 禁用了同源策略，允许加载外部网页
      webSecurity: false,
      //  nodeIntegration 设置为 false 时，渲染进程中禁用了 Node.js 的集成，但仍然可以使用预加载脚本。设置为 true 时，启用了 Node.js 的集成。不能用preload
      nodeIntegration: true,
      // 上下文隔离 渲染进程访问node进程里面的数据 true开启隔离 false不开启隔离
      contextIsolation: false,
      autoplayPolicy: 'no-user-gesture-required',
    },
  });
  win.webContents.openDevTools();
  win.loadFile('./index.html').then(r =>win);
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
