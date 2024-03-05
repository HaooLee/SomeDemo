
var pluginWrap = $(`<div style="
          position:fixed; 
          top:0;
          right:0;
          z-index: 9999;
          background: rgba(189,255,66,0.26);
          "></div>`)

var toggleButton = $(`<div>
  <button type="button"
          style="position:fixed;
          width: 100px;
          height:40px;
          top:20px;
          right:20px;
          background:skyBlue;
          border-radius: 5px;
          z-index: 9999;
          border:1px solid gray;">
    插件显示/隐藏
    </button>
  </div>`).click(function () {
    pluginWrap.toggle()
  })

var downloadAllButton = $(`<div>
  <button type="button" 
          style="position:absolute;
          width: 100px;
          height:40px;
          top:100px;
          right:80px; 
          background:skyBlue;
          border-radius: 5px;
          z-index: 9999;
          border:1px solid gray;">
    下载全部数据
    </button>
  </div>`).click(function () {
  download()
})

var downloadPageInput = $(`<div>
  <input type="number"
          style="position:absolute;
          width: 50px;
          height:30px;
          top:100px;
          right:20px;
          z-index: 9999;
          border:1px solid gray;
          text-align: center;"
          value="200">
    </input>
  </div>`)

var continueTasksButton = $(`<div>
  <button type="button" 
          style="position:absolute;
          width: 100px;
          height:40px;
          top:100px;
          right:190px; 
          background:skyBlue;
          border-radius: 5px;
          z-index: 9999;
          border:1px solid gray;">
    过了人工验证后点我继续下载
    </button>
  </div>`).click(
    function () {
  var lastResidueTasks = localStorage.getItem('lastResidueTasks')
  if (lastResidueTasks) {
    lastResidueTasks = JSON.parse(lastResidueTasks)
    localStorage.removeItem('lastResidueTasks')
    lastResidueTasks.forEach((item) => {
      taskMgr.addTask(item, () => {
        return getTableDataTask(item.classify_id, item.page, item.levels)
      })
    })
    downloadLog.append(`<p>继续未完成的下载任务</p>`)
    taskMgr.executeTask(1, null, (taskNum, doneNum, useTime) => {
      downloadLog.append(`<p>[ ${getNowFormatDate()} ]总下载量:${taskNum} 已完成:${doneNum} 用时:${useTime}秒</p>`)
      downloadLog.scrollTop(downloadLog[0].scrollHeight)
    })
  } else {
    downloadLog.append(`<p>没有需要继续下载的任务</p>`)
  }
})

var testAudioButton = $(`<div>
  <button type="button"
           style="position:absolute;
          width: 60px;
          height:40px;
          top:100px;
          right:410px;
          background:skyBlue;
          border-radius: 5px;
          z-index: 9999;
          border:1px solid gray;">
    测试语音
    </button>
    
  </div>`).click(function () {
    playAudio('来人啊!   过一下验证码')
  })

var cancelAudioButton = $(`<div>
  <button type="button"
            style="position:absolute;
          width: 60px;
          height:40px;
          top:100px;
          right:480px;
          background:skyBlue;
          border-radius: 5px;
          z-index: 9999;
          border:1px solid gray;">
    停止语音
    </button>
    
  </div>`).click(function () {
    cancelAudio()
  })


// 已下载数据生成excel
var downloadExcelButton = $(`<div>
  <button type="button"
          style="position:absolute;
          width: 100px;
          height:40px;
          top:100px;
          right:300px;
          background:skyBlue;
          border-radius: 5px;
          z-index: 9999;
          border:1px solid gray;">
    将已下载数据立即生成excel
    </button>
  </div>`).click(function () {
  if (result.length === 0) {
    downloadLog.append(`<p>还没有下载的数据</p>`)
    return
  }
  downloadExcel(result)
})

var downloadLog = $(`
  <div style="
          position:absolute;
          width: 521px;
          height:300px;
          top:150px;
          right:20px; 
          background:#bfc;
          border-radius: 5px;
          text-align: center;
          z-index: 9999;
          font-size: 12px;
          overflow-y: auto;"
    >
    <h3>下载日志</h3>
  </div>`)


$(function () {
  $(pluginWrap).hide().append(downloadAllButton)
    .append(downloadLog)
    .append(downloadExcelButton)
    .append(continueTasksButton)
    .append(downloadPageInput)
    .append(testAudioButton)
    .append(cancelAudioButton)

  $(document.body).append(pluginWrap).append(toggleButton)
})


var docCookies = {
  getItem: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
            encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$",
          ),
          "$1",
        ),
      ) || null
    );
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
      encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
      "\\s*\\=",
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};

function getEx(route) {
  const currentDate = new Date();
  const timestamp1 = `2023-10-16 14:49 ${route}`;
  const timestamp2 = `${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds() - 1)}`;
  const timestamp3 = `${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds() + 1)}`;
  return `${timestamp1} ${timestamp2} ${timestamp3}`;
}
function padZero(number) {
  return number.toString().padStart(2, '0');
}

function getEx1() {

  function w(e) {
    for (var t = '9527'.split("").map((function (e) {
      return Number(e)
    }
    )), n = e.split("").map((function (e) {
      return Number(e)
    }
    )), r = 7 * n.reduce((function (e, t) {
      return e + t
    }
    ), 0) % 10, a = [], o = 0, i = 0; i < n.length; i++)
      a[i] = (n[i] + t[o]) % 10,
        o = (o + 1) % t.length;
    for (var c = t.length % n.length, s = Array.apply(null, {
      length: 10
    }), u = 0; u < c; u++)
      s[u] = a[a.length - u - 1];
    s[c] = r;
    for (var l = c + 1; l < a.length + 1; l++)
      s[l] = a[a.length - l];
    return P(s.join(""))
  }

  function P(e) {
    for (var t = [], n = function () {
      for (var e = [], t = 0; t < 36; t++)
        t >= 0 && t <= 9 ? e.push(t) : e.push(String.fromCharCode(t + 87));
      return e
    }(); e;) {
      var r = e % 36;
      t.unshift(n[r]),
        e = parseInt(e / 36)
    }
    return t.join("")
  }

  return w(`${Date.now()}`)
}


function customFetch(url, data = {}, headers) {
  return new Promise((res) => {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          res(response);
        } else {
          res(xhr.status);
        }
      }
    };

    var body = JSON.stringify(Object.assign({}, {
      "platform": "pc",
      "version": "5.26.0",
      "ua": "Chrome116",
      "trafficType": 0,
      "ex1": getEx1(),
      "token": docCookies.getItem('Token')
    }, data));
    xhr.send(body);
  })
}

function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate()
  if (month < 10) month = `0${month}`
  if (strDate < 10) strDate = `0${strDate}`

  return `${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function getPreDay(pre) {
  var date = new Date()
  date.setDate(date.getDate() - pre)

  year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate()
  if (month < 10) month = `0${month}`
  if (strDate < 10) strDate = `0${strDate}`

  return `${year}-${month}-${strDate}`
}

function downloadExcel(data) {
  var columns = [
    {
      lable: '类目1',
      key: 'level-0'
    },
    {
      lable: '类目2',
      key: 'level-1'
    },
    {
      lable: '类目3',
      key: 'level-2'
    },
    {
      lable: '类目4',
      key: 'level-3'
    },
    {
      lable: '品牌',
      key: 'brand'
    },
    {
      lable: '名称',
      key: 'druginfo_common_name'
    },
    {
      lable: '规格',
      key: 'specification'
    },
    {
      lable: '价格',
      key: 'price'
    },
    {
      lable: '折后价',
      key: 'disPrice'
    },
    {
      lable: '最小价',
      key: 'minprice'
    },
    {
      lable: '最大价',
      key: 'maxprice'
    },
  ]
  let csvStr = data.map(item => {
    let valueList = columns.map(i => item[i.key])
    return valueList.join(',\t')
  })
  csvStr = columns.map(i => i.lable).join(',') + ',\n' + csvStr.join(',\n')
  const href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csvStr)
  const aHtml = document.createElement('a')
  aHtml.download = 'all_data.xlsx'
  aHtml.href = href
  aHtml.click()
}

class createTaskMgr {
  constructor() {
    this.taskList = []
    this.doneNum = 0
    this.taskNum = 0
    this.startTime = Date.now()
  }

  addTask(attch, task) {
    this.taskList.push({ attch, task })
    this.taskNum = this.taskList.length
  }

  executeTask(loop = 1, delay, callback, doneCallback) {
    for (var i = 0; i < loop; i++) {
      if (this.taskList.length > 0) {
        const { attch, task } = this.taskList.shift();
        task().then(() => {
          this.doneNum++
          callback && callback(this.taskNum, this.doneNum, (Date.now() - this.startTime) / 1000, attch)
          setTimeout(() => {
            this.executeTask(1, delay, callback);
          }, delay || (Math.random() * 2000) | 0)
        }, (res) => {
          downloadLog.append(`<p>下载失败:${res && res.message}</p>`)
          downloadExcel(result);
          localStorage.setItem('lastResidueTasks', JSON.stringify([attch, ...this.taskList.map(i => i.attch)]))
          playAudio('有人吗？ 过一下人工验证码呀')
          window.onmousemove = function () {
            location.reload()
            window.onmousemove = null
          }
        });
      } else {
        if (this.doneNum == this.taskNum && this.doneNum !== 0) {
          this.doneNum = 0
          this.taskNum = 0
          downloadExcel(result)
          doneCallback && doneCallback(result)
        }
      }
    }
  }
}

function download() {
  // window.$jd_page_monitor_config  /用户信息
  customFetch('https://dian.ysbang.cn/wholesale-drug/sales/getClassifyWholesaleList/v4270', {
    "ex": getEx('home'),
  }).then((res) => {
    if (res && res.code === '40001') {
      createTasks(res.data)
      // 开始执行下载任务
      setTimeout(() => {
        taskMgr.executeTask(1, null, (taskNum, doneNum, useTime) => {
          downloadLog.append(`<p>[${getNowFormatDate()}]总下载量:${taskNum} 已完成:${doneNum} 用时:${useTime}</p>`)
          downloadLog.scrollTop(downloadLog[0].scrollHeight)

        })
      }, 500)
    }
  })

  function createTasks(arr, levels = []) {
    arr.forEach((item) => {
      if (item.nextlevel) {
        createTasks(item.nextlevel, [...levels, item.classify_name])
      } else {
        const totalPage = Math.min(Math.ceil(item.count / 60),  Number(downloadPageInput.find('input').val()) || 200)
        for (let i = 1; i <= totalPage; i++) {
          taskMgr.addTask({
            classify_id: item.classify_id,
            page: i,
            levels: [...levels, item.classify_name]
          }, () => {
            return getTableDataTask(item.classify_id,i, [...levels, item.classify_name])
          })
        }
      }
    })
  }
}

function getTableDataTask(classify_id, page, levels) {
  var params = {
    "trafficType": 1,
    "page": page,
    "ex": getEx('indexContent'),
    "pagesize": "60",
    "classify_id": classify_id,
    "searchkey": "",
    "operationtype": 1,
    "provider_filter": "",
    "activityTypes": [],
    "qualifiedLoanee": 0,
    "factoryNames": "",
    "tcmGradeNames": [],
    "tcmExeStandardIds": [],
    "specs": "",
    "drugId": -1,
    "tagId": "",
    "showRecentlyPurchasedFlag": true,
    "onlyShowRecentlyPurchased": false,
    "onlySimpleLoan": 0,
    "sn": "",
    "deliverFloor": 0,
    "purchaseLimitFloor": 0,
    "validMonthFloor": 0,
  }

  return new Promise((resolve, reject) => {
    downloadLog.append(`<p>开始下载:${levels.join('/')} 第${page}页数据</p>`)
    customFetch('https://dian.ysbang.cn/wholesale-drug/sales/getWholesaleList/v4270', params)
      .then((res) => {
        if (res && res.code === '40001' && res.data) {
          const _res = JSON.parse(JSON.stringify(res.data.wholesales))
          _res.forEach(i => {
            let keys = Object.keys(levels)
            keys.forEach(l => {
              i[`level-${l}`] = levels[l]
            })
          })
          result = result.concat(_res)
          // console.log(_res)
          resolve(_res);
        } else {
          reject(res)
          console.log("请求遇到了异常", res)
        }
      }).catch((e) => {
        reject(e)
        console.log('下载失败。 原因:网络问题或频率太高被拒绝', e)
      })
  });
}

var taskMgr = new createTaskMgr()
var result = []

var playAudioTimer = null

function playAudio (text) {
// 取消之前的播报，如不加则存队列依次完成播报
  window.speechSynthesis.cancel()
  // 创建一个新的语音合成对象
  playAudioTimer && clearInterval(playAudioTimer)
  speak(text)
  playAudioTimer = setInterval(() => {
    speak(text)
  }, 5000)
}

function speak (text) {
  let synth = window.speechSynthesis
  if (!synth) {
    alert('浏览器不支持语音播报！')
  }
  // 创建一个新的语音合成消息
  let utterance = new SpeechSynthesisUtterance()
  // 设置要转换为语音的文本内容
  utterance.text = text
  // 设置语音合成的语言
  utterance.lang = 'zh-cn'
  // 设置语速和音调
  utterance.rate = 0.9 // 数越大，语速就越快
  utterance.pitch = 1.0 // 数越大，声音就越尖锐
  // 将语音合成消息添加到队列中
  synth.speak(utterance)
}

function cancelAudio () {
  window.speechSynthesis.cancel()
  playAudioTimer && clearInterval(playAudioTimer)
}
