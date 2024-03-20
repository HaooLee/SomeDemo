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
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  session,
  dialog,
  screen,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
// import robot from 'robotjs';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { getHttpData } from './getResponse';
import {
  getYesterday235959Timestamp,
  getCurrentMonthFirstDayTimestamp,
  getDate,
} from '../utils/date';
import { createExcel, parseExcel } from '../utils/createExcel';

// robot.setMouseDelay(2);
//
// const twoPI = Math.PI * 2.0;
// const screenSize = robot.getScreenSize();
// const height = screenSize.height / 2 - 10;
// const { width } = screenSize;
//
// for (let x = 0; x < width; x++) {
//   const y = height * Math.sin((twoPI * x) / width) + height;
//   robot.moveMouse(x, y);
// }
console.log(process.versions);

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

export type Shop = {
  name: string;
  // 负责人
  person: string;
  // 助手
  assistant: string;
  realInfo: any;
  expire?: number | undefined;
  updateTime: string;
};

const userAgent =
  process.platform === 'win32'
    ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

let mainWindow: BrowserWindow | null = null;

let isTaskRunning = false;

let excelData: any[] = [];

let savePath = '';

ipcMain.on('open-file', async (event, arg) => {
  shell.openPath(savePath);
});

async function openDialog(): Promise<string | undefined> {
  const result = await dialog.showOpenDialog({
    title: '选择一个文件夹',
    properties: ['openDirectory'],
  });

  if (result.canceled) {
    return;
  }

  // eslint-disable-next-line prefer-destructuring
  savePath = result.filePaths[0];
  fs.access(savePath, fs.constants.W_OK, (err) => {
    if (err) {
      mainWindow?.webContents.send('main-err', '没有写入权限');
    }
  });
  console.log(result, 'open-save-dialog');
  mainWindow?.webContents.send('save-path-changed', savePath);
  // eslint-disable-next-line consistent-return
  return savePath;
}

// 打开导入excel
ipcMain.on('import-shop-list', async (event, arg) => {
  const result = await dialog.showOpenDialog({
    title: '选择一个文件',
    properties: ['openFile'],
    filters: [{ name: 'Excel', extensions: ['xlsx', 'xls'] }],
  });

  if (result.canceled) {
    return;
  }

  const filePath = result.filePaths[0];
  const jsonData = parseExcel(filePath);
  console.log(jsonData, 'import-shop-list');
  if (jsonData.length > 0) {
    // jsonData中item[0]不能重复 否则 return
    if (
      jsonData.some(
        (item: any) =>
          jsonData.filter((i: any) => i[0] === item[0] && item[0]).length > 1,
      )
    ) {
      // 找出所有重复的店铺名
      const repeatShop = jsonData
        .map((item: any) => item[0])
        .filter((item, index, arr) => arr.indexOf(item) !== index)
        .join(',');

      mainWindow?.webContents.send(
        'main-err',
        `导入数据中账号名称有重复:${repeatShop}`,
      );
      return;
    }

    const shopList = jsonData
      .filter((i) => i[0])
      .map((item: any) => {
        return {
          name: item[0],
          person: item[1],
          assistant: item[2],
          realInfo: {},
          updateTime: '',
        };
      });
    mainWindow?.webContents.send('import-shop-list', shopList);
  }
});

ipcMain.on('open-save-dialog', async (event, arg) => {
  await openDialog();
});

ipcMain.on('export-excel', async (event, sp) => {
  console.log(sp, 'export-excel');
  savePath = sp;
  if (excelData.length === 0) {
    event.reply('export-excel', {
      path: '',
      isAuto: false,
      isSuccess: false,
    });
    return;
  }
  try {
    const name = createExcel(excelData, savePath);
    event.reply('export-excel', {
      path: name,
      isAuto: false,
      isSuccess: true,
    });
  } catch (e) {
    mainWindow.webContents.send('main-err', e);
  }
});

ipcMain.on('open-window', async (event, arg) => {
  //
  // console.log(arg, 'open-window');
  createSubWindow(arg.shop, false);
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

ipcMain.on(
  'start-task',
  async (event, { shopList, isBackgroundTask, savePath: sp }) => {
    savePath = sp;
    if (isTaskRunning) {
      return;
    }
    if (shopList.length === 0) {
      mainWindow?.webContents.send('stop-task', 'pong');
      return;
    }

    if (!savePath) {
      const filePath = await openDialog();
      if (!filePath) {
        mainWindow?.webContents.send('stop-task', 'pong');
        return;
      }
    }

    event.reply('start-task', 'pong');
    console.log(shopList, 'start-task');
    isTaskRunning = true;
    excelData = [];
    runGetDataTask(shopList, isBackgroundTask)
      .then(() => {
        console.log('任务结束');
        isTaskRunning = false;
        if (excelData.length > 0) {
          const name = createExcel(excelData, savePath);
          mainWindow?.webContents.send('export-excel', {
            path: name,
            isAuto: true,
            isSuccess: true,
          });
        }
      })
      .catch((err) => {
        console.log('任务出错', err);
        isTaskRunning = false;
        mainWindow.webContents.send('main-err', err);
      })
      .finally(() => {
        console.log('任务结束');
        isTaskRunning = false;
        mainWindow?.webContents.send('stop-task', 'pong');
      });
  },
);

ipcMain.on('stop-task', async (event, arg) => {
  console.log(arg, 'stop-task');
  isTaskRunning = false;
  // 所有的子页面都销毁
  BrowserWindow.getAllWindows().forEach((win) => {
    if (win.getParentWindow() === mainWindow) {
      win.close();
    }
  });
  event.reply('stop-task', 'pong');
});

async function runGetDataTask(shopList: Shop[], isBackgroundTask: boolean) {
  for (let i = 0; i < shopList.length; i++) {
    if (!isTaskRunning) return;
    const rowData = await createSubWindow(shopList[i], isBackgroundTask);
    if (rowData) {
      rowData.push(shopList[i].person, shopList[i].assistant);
      excelData.push(rowData);
    }
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

function winLoadUrl(win: BrowserWindow, url: string) {
  if (win && !win.isDestroyed()) {
    win.loadURL(url, {
      userAgent,
    });
  }
}

function createSubWindow(shop: Shop, isBackgroundTask: boolean): Promise<any> {
  const id = Buffer.from(shop.name).toString('base64');
  const rowData = new Array(17).fill('-');

  console.log('id', `persist:${id}`);
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!mainWindow) return Promise.reject('mainWindow is null');
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    parent: mainWindow,
    show: !isBackgroundTask,
    title: shop?.realInfo?.shopName,
    // modal: true,
    // closable: true,
    // titleBarStyle: 'default',

    webPreferences: {
      devTools: false,
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
      details.requestHeaders['User-Agent'] = userAgent;
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    },
  );

  let timer: number;
  let needLoginTimer: number;

  return Promise.race([
    new Promise((resolve, reject) => {
      if (!isTaskRunning) return;
      // @ts-ignore
      timer = setTimeout(() => {
        resolve(rowData);
        if (win && !win.isDestroyed()) {
          win.close();
        }
      }, 60000 * 5);
    }),
    new Promise((resolve, reject) => {
      // win.webContents.on('did-navigate', (event, url) => {
      //   console.log(`已经导航到: ${url}`);
      //   // if (!isTaskRunning) return;
      //
      // });

      win.webContents.on('did-finish-load', () => {
        const currentUrl = win.webContents.getURL();
        console.log('did-finish-load', currentUrl);
        if (isTaskRunning) {
          win.webContents.executeJavaScript(`
            setTimeout(() => {
              window.location.reload();
            }, 15000)
        `);
        }
        // https://jzt.jd.com/home/#/index
        if (
          isTaskRunning &&
          currentUrl.includes('https://jzt.jd.com/home/#/index')
        ) {
          win.webContents.executeJavaScript(`
          var __scTimer = setInterval(function(){
            if(document.querySelector("body > div.container > div > div.new-body > div > div.left > div.overview.mt16 > div > div.tab_new > div.conditions-left > div > div > button")){
              startClick();
              clearInterval(__scTimer)
            }
          }, 100);

         function startClick(){
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
      }, 500)
         }
    `);
        } else if (
          currentUrl.indexOf(
            'https://passport.shop.jd.com/login/index.action',
          ) > -1
        ) {
          mainWindow?.webContents.send('need-login', shop.name);

          win.webContents.executeJavaScript(`
               var wrap = document.createElement('div');
              wrap.style.cssText = 'position: absolute;left:200px;top: 50%;width: 450px;height: 100px;border: 2px solid blue;background: skyblue; line-height: 100px;text-align: center;font-size: 20px;'
              wrap.innerText = '登录：${shop.name}';
              document.documentElement.appendChild(wrap);
          `);

          // @ts-ignore
          needLoginTimer = setTimeout(() => {
            resolve(rowData);
          }, 60000 * 4);
          // https://jzt.jd.com/jst/#/index
        } else if (currentUrl.includes('https://jzt.jd.com/jst/#/index')) {
          resolve(rowData);
        } else if (
          // eslint-disable-next-line no-dupe-else-if
          isTaskRunning &&
          currentUrl.includes('https://jzt.jd.com/gw/index')
        ) {
          // 进入这个页面代表没有京准通
          resolve(rowData);
        }

        if (
          currentUrl.indexOf(
            'https://passport.shop.jd.com/login/index.action',
          ) === -1
        ) {
          clearTimeout(needLoginTimer);
        }
      });

      //     'https://passport.shop.jd.com/login/json/qrcode_check.action',
      //     'https://sz.jd.com/sz/api/trade/getSummaryData.ajax',
      //     // 店铺信息
      //     'api=dsm.shop.vane.view.core.export.ohs.stars.service.VaneStarsFacade'
      getHttpData(win, [
        {
          url: 'api=dsm.shop.vane.view.core.export.ohs.stars.service.VaneStarsFacade',
          callback: (url: string, data: string) => {
            const shopData = JSON.parse(data);
            mainWindow.webContents.send('update-shop-real-info', {
              name: shop.name,
              realInfo: shopData.data,
            });
            if (!isTaskRunning) return;
            if (data) {
              console.log('店铺信息', JSON.parse(data));
              rowData[0] = shopData.data.shopName;
              rowData[1] = shopData.data.scoreRankRateGrade;
              // winLoadUrl(
              //   win,
              //   'https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302',
              // );
              setTimeout(() => {
                winLoadUrl(
                  win,
                  'https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302',
                );
              }, 1000);
            }
          },
        },
        {
          // 这个是老版本的接口返回的数据
          url: '/api/vender/backs/info/jsonp',
          callback: (url: string, d: string) => {
            const data = d.match(/\((.*)\)/)[1];
            const shopData = JSON.parse(data);
            mainWindow.webContents.send('update-shop-real-info', {
              name: shop.name,
              realInfo: shopData.data,
            });
            if (!isTaskRunning) return;
            if (d) {
              rowData[0] = shopData.data.shopName;
              rowData[1] = shopData.data.scoreRankRateGrade;
              console.log('店铺信息', shopData);
              setTimeout(() => {
                winLoadUrl(
                  win,
                  'https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302',
                );
              }, 1000);
            }
          },
        },
        // 新版本的商品上架时间和总数量
        {
          url: 'api=dsm.wareshopv2.ware.wareListService.queryWareList',
          callback: (url: string, data: string) => {
            if (!isTaskRunning) return;
            // 需要打开的页面 https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302
            // 记录第一个商品de上架时间，名称为 最新上架时间。右下角，记录在售商品数
            console.log('商品数据', JSON.parse(data));
            const wareData = JSON.parse(data);
            rowData[2] = wareData.data.totalCount;
            rowData[3] = getDate(wareData.data.data[0].onlineTime);

            // https://sz.jd.com/sz/view/dealAnalysis/dealSummarys.html
            setTimeout(() => {
              winLoadUrl(
                win,
                'https://sz.jd.com/sz/view/dealAnalysis/dealSummarys.html',
              );
            }, 1000);
          },
        },
        // 老版本的商品上架时间和总数量
        {
          url: 'https://ware.shop.jd.com/rest/ware/list/search',
          callback: (url: string, data: string) => {
            if (!isTaskRunning) return;
            // 需要打开的页面 https://shop.jd.com/jdm/ware/manage/list/OnsaleWare?_JDMOMID_=1303,1302
            // 记录第一个商品de上架时间，名称为 最新上架时间。右下角，记录在售商品数
            console.log('商品数据', JSON.parse(data));
            const wareData = JSON.parse(data);
            rowData[2] = wareData.data.totalItem;
            rowData[3] = getDate(wareData.data.data[0].ware.onlineTime);
            setTimeout(() => {
              winLoadUrl(
                win,
                'https://sz.jd.com/sz/view/dealAnalysis/dealSummarys.html',
              );
            });
          },
        },
        {
          url: 'sz.jd.com/sz/api/trade/getSummaryData.ajax',
          callback: (url: string, data: string) => {
            console.log('匹配到商智数据', data);
            if (!isTaskRunning) return;
            console.log('商智数据', data);
            const szData = JSON.parse(data);
            rowData[4] = szData.content.UV.value;
            rowData[5] = szData.content.OrdNum.value;
            rowData[6] = szData.content.OrdAmt.value;
            rowData[7] = szData.content.CustPriceAvg.value;
            rowData[8] = `${szData.content.ToOrdRate.value * 100}%`;
            setTimeout(() => {
              winLoadUrl(win, 'https://sz.jd.com/sz/view/indexs.html');
            }, 1000);
          },
        },
        {
          url: 'https://sz.jd.com/sz/api/realtime/getRealtimeData.ajax',
          callback: (url: string, data: string) => {
            if (!isTaskRunning) return;
            console.log('商智数据2', data);
            const szData = JSON.parse(data);
            rowData[9] = szData.content.MonthOrdAmtTotal.value;
            rowData[10] = szData.content.YearOrdAmtTotal.value;
            setTimeout(() => {
              winLoadUrl(win, 'https://jzt.jd.com/home/#/index');
            }, 1000);
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
              const jztData = JSON.parse(data);
              rowData[11] = jztData.data.cost;
              rowData[12] = jztData.data.CPC;
              rowData[13] = jztData.data.totalOrderROI;
            } else if (
              Date.parse(postData.startDay) ===
              getCurrentMonthFirstDayTimestamp()
            ) {
              console.log('本月数据', JSON.parse(data));
              const jztData = JSON.parse(data);
              rowData[14] = jztData.data.cost;
              rowData[15] = jztData.data.CPC;
              rowData[16] = jztData.data.totalOrderROI;
              resolve(rowData);
            }
          },
        },
      ]);
      // eslint-disable-next-line no-use-before-define
      winLoadUrl(win, 'https://shop.jd.com/jdm/home');
    }).finally(() => {
      clearTimeout(timer);
      win.destroy();
    }),
  ]);
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
    width: 1400,
    height: 900,
    icon: getAssetPath('icon.png'),
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      devTools: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      partition: 'persist:main',
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // mainWindow.webContents.openDevTools();
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
    // console.log(screen.getAllDisplays(), 'screen');

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
