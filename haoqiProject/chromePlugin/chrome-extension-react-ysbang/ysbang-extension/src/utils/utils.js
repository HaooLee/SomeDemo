export function customFetch(url, data = {}, headers) {
  return new Promise((res) => {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          res(response);
        } else {
          res(xhr.status);
        }
      }
    };

    let body = JSON.stringify(Object.assign({}, {
      "platform": "pc",
      "version": "5.30.0",
      "ua": "Chrome120",
      "trafficType": 1,
      "ex1": getEx1(),
      "token": docCookies.getItem('Token')
    }, data));
    xhr.send(body);
  })
}

let docCookies = {
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
    let sExpires = "";
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
    let aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};

export function getEx(route) {
  const currentDate = new Date();
  const timestamp1 = `2023-12-25 18:39 ${route}`;
  const timestamp2 = `${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds() - 1)}`;
  const timestamp3 = `${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds() + 1)}`;
  return `${timestamp1} ${timestamp2} ${timestamp3}`;
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}

export function getEx1() {

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

export function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate()
  if (month < 10) month = `0${month}`
  if (strDate < 10) strDate = `0${strDate}`

  return `${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export function downloadExcel(data, columns, name = 'all_data') {
  columns = columns || [
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
  aHtml.download = name + '.xlsx'
  aHtml.href = href
  aHtml.click()
}

export class TaskMgr {
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

  executeTask(loop = 1, delay, callback, doneCallback, errorCallback) {
    for (var i = 0; i < loop; i++) {
      if (this.taskList.length > 0) {
        const { attch, task } = this.taskList.shift();
        task().then((res) => {
          this.doneNum++
          callback && callback(res,this.taskNum, this.doneNum, (Date.now() - this.startTime) / 1000, attch)
          setTimeout(() => {
            this.executeTask(1, delay, callback);
          }, delay || (Math.random() * 2000) | 0)
        }, (res) => {
          errorCallback && errorCallback(attch,this.taskList,res)
        });
      } else {
        if (this.doneNum === this.taskNum && this.doneNum !== 0) {
          this.doneNum = 0
          this.taskNum = 0
          doneCallback && doneCallback()
        }
      }
    }
  }
}

var playAudioTimer = null

export function playAudio (text) {
// 取消之前的播报，如不加则存队列依次完成播报
  window.speechSynthesis.cancel()
  // 创建一个新的语音合成对象
  playAudioTimer && clearInterval(playAudioTimer)
  speak(text)
  playAudioTimer = setInterval(() => {
    speak(text)
  }, 5000)
}

export function speak (text) {
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
  utterance.rate = 1.0 // 数越大，语速就越快
  utterance.pitch = 1.0 // 数越大，声音就越尖锐
  // 将语音合成消息添加到队列中
  synth.speak(utterance)

}

export function cancelAudio () {
  window.speechSynthesis.cancel()
  playAudioTimer && clearInterval(playAudioTimer)
}