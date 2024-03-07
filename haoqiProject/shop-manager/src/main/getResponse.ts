import {webContents} from "electron";


/**
 *
 * 用于webContents.debugger中
 * 监听网页中http请求，获取请求和响应数据
 * @param webWindow  当前窗体实例
 * @param urls
 * @constructor false
 */
function getHttpData(webWindow:any, urls:any[]) {
  const id = webWindow.id;
  try {
    webWindow.webContents.debugger.attach('1.1');
  } catch (err) {
    console.log('调试器连接失败: ', err)
  }
  webWindow.webContents.debugger.on('detach', (event:any, reason:string) => {
    console.log('调试器由于以下原因而分离 : ', reason)
  });

  webWindow.on('close', () => {
    webWindow.webContents.off('message', messageHandler);
    try {
      webWindow.webContents.debugger.detach();
    } catch (err) {
      console.log('调试器分离失败: ', err)
    }
  })

  const postDataCache:any = {};

  function messageHandler(event:any, method:any, params:any){
    if (method === 'Network.requestWillBeSent') {
      // @ts-ignore
      // webContents.fromId(id).send("GetHttpData",{type:'req',url:params.request.url},params)
      // console.log(params)

      if (params.request.postData) {
        postDataCache[params.requestId] = params.request.postData;
      }
    }

    //Network.loadingFinished
    if (method === 'Network.responseReceived') {
      for (let i = 0; i < urls.length; i++) {
        if (params.response.url.indexOf(urls[i].url) === -1) {
          continue;
        }
        var mimeType = params.response.mimeType;
        if (mimeType != 'image/gif' && mimeType != 'image/jpeg' && mimeType == 'application/json') {
          // webContents.fromId(id).send("GetHttpData",{type:'rep',url:params.response.url},params)
          webWindow.webContents.debugger.sendCommand('Network.getResponseBody', { requestId: params.requestId }).then(function(response:any) {
            //webContents.fromId(id).send("GetHttpData",{type:'repBody',url:params.response.url},JSON.parse(response.body))
            // webWindow.webContents.debugger.sendCommand('Network.getRequestBody', { requestId: params.requestId }).then(function(requestBody:any) {
              urls[i].callback(params.response.url, response.body, postDataCache[params.requestId]);
            // })
          }).catch((err:any)=>{
            console.log('err', err, params);
          }).finally(()=>{
            delete postDataCache[params.requestId];
          }
          )
        }
      }
      //
    }
  }

  webWindow.webContents.debugger.on('message', messageHandler)
  webWindow.webContents.debugger.sendCommand('Network.enable');
}

export {
  getHttpData
};
