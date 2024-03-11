// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'open-window' // 打开窗口
  | 'delete-session' // 删除会话
  | 'need-login' // 需要登录
  | 'update-shop-login-expire' // 更新店铺登录过期时间
  | 'start-task' // 开始任务
  | 'stop-task' // 停止任务
  | 'export-excel' // 导出 Excel
  | 'main-err' // 主进程错误
  | 'save-path-changed' // 保存路径改变
  | 'open-save-dialog' // 打开保存对话框
  | 'open-file' // 打开文件
  | 'update-shop-real-info'; // 更新店铺真实信息

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  getBase64(str: string): string {
    return Buffer.from(str).toString('base64');
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
