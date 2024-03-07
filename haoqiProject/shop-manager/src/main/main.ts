/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { Buffer } from 'node:buffer';
import { app, BrowserWindow, shell, ipcMain, session } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { getHttpData } from './getResponse';
import {
  getYesterday235959Timestamp,
  getCurrentMonthFirstDayTimestamp,
  getDate,
} from '../utils/date';
import { createExcel } from '../utils/createExcel';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

export type Shop = {
  name: string;
  expire?: number | undefined;
};

let mainWindow: BrowserWindow | null = null;

let isTaskRunning = false;

const excelData: any[] = [];

ipcMain.on('export-excel', async (event, arg) => {
  console.log(arg, 'export-excel');
  const name = createExcel(excelData);
  event.reply('export-excel', path.resolve(__dirname, name));
});

ipcMain.on('open-window', async (event, arg) => {
  //
  // console.log(arg, 'open-window');
  createSubWindow(arg.shop);
  event.reply('open-window', 'pong');
});

ipcMain.on('delete-session', async (event, arg) => {
  const id = Buffer.from(arg.shopName).toString('base64');

  session
    .fromPartition(`persist:${id}`)
    .clearStorageData()
    .then(() => event.reply('delete-session', 'success'))
    .catch(() => event.reply('delete-session', 'error'));
});

ipcMain.on('start-task', async (event, shopList) => {
  event.reply('start-task', 'pong');
  console.log(shopList, 'start-task');
  isTaskRunning = true;
  runGetDataTask(shopList)
    .then(() => {
      console.log('任务结束');
      isTaskRunning = false;
      if (excelData.length > 0) {
        const name = createExcel(excelData);
        mainWindow?.webContents.send(
          'export-excel',
          path.resolve(__dirname, name),
        );
      }
    })
    .finally(() => {
      console.log('任务结束');
      isTaskRunning = false;
    });
});

ipcMain.on('stop-task', async (event, arg) => {
  console.log(arg, 'stop-task');
  isTaskRunning = false;
  event.reply('stop-task', 'pong');
});

async function runGetDataTask(shopList: Shop[]) {
  for (let i = 0; i < shopList.length; i++) {
    if (!isTaskRunning) return;
    const rowData = await createSubWindow(shopList[i]);
    if (rowData) {
      excelData.push(rowData);
    }
  }
}

function createSubWindow(shop: Shop): Promise<any> {
  const id = Buffer.from(shop.name).toString('base64');
  const rowData = new Array(15).fill('-');

  console.log('id', `persist:${id}`);
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!mainWindow) return Promise.reject('mainWindow is null');
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    parent: mainWindow,
    // modal: true,
    // closable: true,
    // titleBarStyle: 'default',

    webPreferences: {
      devTools: true,
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: false,
      partition: `persist:${id}`,
    },
  });

  // 窗口即将关闭时
  win.on('close', (e) => {
    e.preventDefault();
    // eslint-disable-next-line promise/catch-or-return
    win.webContents.session.cookies
      .get({ name: 'thor', domain: '.jd.com', httpOnly: true })
      .then((cookies) => {
        console.log('cookies', cookies);
        mainWindow?.webContents.send('update-shop-login-expire', {
          name: shop.name,
          expire: (cookies?.[0].expirationDate || 0) * 1000,
        });
      })
      .catch((err: any) => {
        console.log('get cookies err', err);
      })
      .finally(() => {
        win.destroy();
      });
  });

  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      details.requestHeaders['User-Agent'] =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    },
  );

  let currentStep = 0;

  return Promise.race([
    new Promise((resolve, reject) => {
      if (!isTaskRunning) return;
      setTimeout(() => {
        resolve(rowData);
        win.close();
      }, 60000);
    }),
    new Promise((resolve, reject) => {
      win.webContents.on('did-navigate', (event, url) => {
        console.log(`已经导航到: ${url}`);
        if (!isTaskRunning) return;
        if (
          url.indexOf('https://passport.shop.jd.com/login/index.action') > -1
        ) {
          mainWindow?.webContents.send('need-login', shop.name);
          resolve(rowData);
        }
      });

      win.webContents.on('did-finish-load', () => {
        const currentUrl = win.webContents.getURL();
        console.log('did-finish-load', currentUrl);
        // https://jzt.jd.com/home/#/index
        if (
          !isTaskRunning ||
          !currentUrl.includes('https://jzt.jd.com/home/#/index')
        )
          return;
        win.webContents.executeJavaScript(`
      setTimeout(() => {
        document.querySelector("body > div.container > div > div.new-body > div > div.left > div.overview.mt16 > div > div.tab_new > div.conditions-left > div > div > button")?.click();
        console.log('点击时间选择')
        setTimeout(() => {
          document.querySelector("body > div.jad-dropdown-popper.jad-click-popper.jad-pro-date-compare-asidetrue.jad-date-picker-default > div.jad-date-picker-body-wrapper.jad-date-picker-with-range > div.jad-date-picker-shortcut > p:nth-child(3) > label")?.click()
          console.log('选择昨天')
          setTimeout(() => {
            document.querySelector("body > div.jad-dropdown-popper.jad-click-popper.jad-pro-date-compare-asidetrue.jad-date-picker-default > div.clearfix.jad-pro-date-compare-custom > div > button.jad-btn.jad-btn-primary")?.click()
            console.log('点击确定')
            setTimeout(() => {
              document.querySelector("body > div.container > div > div.new-body > div > div.left > div.overview.mt16 > div > div.tab_new > div.conditions-left > div > div > button")?.click();
              console.log('点击时间选择')
              setTimeout(() => {
                document.querySelector("body > div.jad-dropdown-popper.jad-click-popper.jad-pro-date-compare-asidetrue.jad-date-picker-default > div.jad-date-picker-body-wrapper.jad-date-picker-with-range > div.jad-date-picker-shortcut > p:nth-child(7) > label")?.click()
                console.log('选择本月')
                setTimeout(() => {
                  document.querySelector("body > div.jad-dropdown-popper.jad-click-popper.jad-pro-date-compare-asidetrue.jad-date-picker-default > div.clearfix.jad-pro-date-compare-custom > div > button.jad-btn.jad-btn-primary")?.click()
                  console.log('点击确定')
                }, 1000)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    `);
      });

      //     'https://passport.shop.jd.com/login/json/qrcode_check.action',
      //     'https://sz.jd.com/sz/api/trade/getSummaryData.ajax',
      //     // 店铺信息
      //     'api=dsm.shop.vane.view.core.export.ohs.stars.service.VaneStarsFacade'
      getHttpData(win, [
        {
          url: 'https://sz.jd.com/sz/api/trade/getSummaryData.ajax',
          callback: (url: string, data: string) => {
            if (!isTaskRunning) return;
            console.log('商智数据', data);
          },
        },
        {
          url: 'api=dsm.shop.vane.view.core.export.ohs.stars.service.VaneStarsFacade',
          callback: (url: string, data: string) => {
            if (!isTaskRunning) return;
            if (data) {
              console.log('店铺信息', JSON.parse(data));
              const shopData = JSON.parse(data);
              rowData[0] = shopData.data.shopName;
              rowData[1] = shopData.data.scoreRankRateGrade;
              winLoadUrl(
                win,
                'https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302',
              );
            }
          },
        },
        {
          url: 'api=dsm.wareshopv2.ware.wareListService.queryWareList',
          callback: (url: string, data: string) => {
            if (!isTaskRunning) return;
            // 需要打开的页面 https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302
            //记录第一个商品de上架时间，名称为 最新上架时间。右下角，记录在售商品数
            console.log('商品数据', JSON.parse(data));
            const wareData = JSON.parse(data);
            rowData[2] = wareData.data.totalCount;
            rowData[3] = getDate(wareData.data.data[0].onlineTime);
            resolve(rowData);
            win.close();
          },
        },
        {
          url: 'https://atoms-api.jd.com/reweb/common/indicator',
          callback: (
            url: string,
            data: string,
            postDataStr: string | undefined,
          ) => {
            if (!isTaskRunning) return;
            const postData = JSON.parse(postDataStr || '');

            if (Date.parse(postData.endDay) === getYesterday235959Timestamp()) {
              console.log('昨日数据', JSON.parse(data));
            } else if (
              Date.parse(postData.startDay) ===
              getCurrentMonthFirstDayTimestamp()
            ) {
              console.log('本月数据', JSON.parse(data));
            }
          },
        },
      ]);
      winLoadUrl(win, 'https://shop.jd.com/jdm/home');
    }),
  ]);
}

function winLoadUrl(win: BrowserWindow, url: string) {
  win.loadURL(url, {
    userAgent: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
  });
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      partition: 'persist:main',
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    BrowserWindow.getAllWindows().forEach((win) => {
      if (win.getParentWindow() === mainWindow) {
        win.close();
      }
    });
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
