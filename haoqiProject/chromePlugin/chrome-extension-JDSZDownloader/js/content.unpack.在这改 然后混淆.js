var chanTypeList = [
  {
    'value': -999,
    'label': '全部渠道',
    'groupId': 100181,
    'dictKeyId': -999
  },
  {
    'value': 10000101,
    'label': 'APP',
    'groupId': 100181,
    'dictKeyId': 10000101
  },
  {
    'value': 10000102,
    'label': 'PC',
    'groupId': 100181,
    'dictKeyId': 10000102
  },
  {
    'value': 10000106,
    'label': '微信',
    'groupId': 100181,
    'dictKeyId': 10000106
  },
  {
    'value': 10000105,
    'label': '手Q',
    'groupId': 100181,
    'dictKeyId': 10000105
  },
  {
    'value': 10000103,
    'label': 'M端',
    'groupId': 100181,
    'dictKeyId': 10000103
  }
];

function createHash(text) {
  return CryptoJS.SHA256(text).toString();
}

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxQQQBO9v7hovmGekn8OJ
8uFdBT6Mqg/dMXyIBLTp9+I1LroysveL6hLeQ7XmC1FeWDbhYXpjHcqE2x5+kOUB
B4JCW5oYkRim63N2y2ME+bmgMx9llosoub/VsWtINYhRI9BkCUtnSh7mh0SS+QCz
JygisI3d4yR8vH7W1HldKfy+nDPyCrrafrUtmCzW9B1UQad8aH3lGVSACfjoTF+e
8+eoBDlK4Poe/QTDgNM/UV2hp+RT3k1MuBjJgkjdTuWrPOOQznV90+AFr8drK55G
5zQJ/+bPYmb5kqcsoXYn08H+FSzRjJ3qyxuAZsJMk+Upe6xTjHjYFdq9ZSv0+Kqf
IwIDAQAB
-----END PUBLIC KEY-----
`

const encrypt = new JSEncrypt()
encrypt.setPublicKey(publicKey)


$(function() {
// createDownloadEle()

  createLoginEle();

  function createLoginEle() {
    if ($('.component-wrapper')[0]) {

      var loginWrap = $('<div></div>');

      var loginButton = $(`<div>
        <button type="button" 
                icon="jmt-download" 
                class="jmtd-button data-download jmtd-button-small jmtd-button-primary jmtd-button-outline jmtd-button-clickable" 
                style="position: absolute; right: 20px; top: 80px; width: 100px;"
          <span class="jmt-download jmtd-icon jmtd-icon-font">
          </span>
          登录
          </button>
        </div>`).click(function() {
        const username = usernameInput.find('input')[0].value;
        const password = passwordInput.find('input')[0].value;

        localStorage.setItem('uuun', username);
        localStorage.setItem('pppw', password);

        // 生成一个随机的aes秘钥
        const aesKey = createHash(Math.random().toString(32).slice(2, 8));
        // 使用公钥加密aes秘钥
        const encryptAesKey = encrypt.encrypt(aesKey);

        const body = CryptoJS.AES.encrypt(JSON.stringify({username, password}), aesKey).toString();

        fetch('https://admin.haoolee.com/fy/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            'F-Y-Key': encryptAesKey
          },
          body
        }).then((res) => {
          return res.json();
        }).then((res) => {
          if (res && res.code === 0) {
            loginWrap.remove();
            createDownloadEle()
          }
        });
      });

      var usernameInput = $(`<div class="jmtd-base-input jmtd-button-like jmtd-input  jmtd-base-input-small jmtd-base-input-with-start-icon jmtd-base-input-empty" 
        style="position:absolute; top: 79px; right: 347px;width: 200px;">
<div class="jmtd-base-input-top"><div class="jmtd-base-input-content">
<input id="HL_downloadLimitNum" class="jmtd-input-input" placeholder="用户名" width="200" type="text" prefix="jmt-search" value="${ localStorage.getItem('uuun') || ''}"></div></div></div>`)

      var passwordInput = $(`<div class="jmtd-base-input jmtd-button-like jmtd-input  jmtd-base-input-small jmtd-base-input-with-start-icon jmtd-base-input-empty" 
        style="position:absolute; top: 79px; right: 127px;width: 200px;">
<div class="jmtd-base-input-top"><div class="jmtd-base-input-content">
<input id="HL_downloadLimitNum" class="jmtd-input-input" placeholder="密码" width="200" type="password" prefix="jmt-search" value="${localStorage.getItem('pppw') ||''}"></div></div></div>`);

      $('.component-wrapper').append(loginWrap.append(usernameInput).append(passwordInput).append(loginButton));

    } else {
      setTimeout(() => {
        createLoginEle();
      }, 100);
    }
  }


  function createDownloadEle() {
    if ($('.component-wrapper')[0]) {
      var chanTypeSelection = $(`<div 
        id="HL_chanTypeList"
        style="display:flex;
            position: absolute; 
            right: 140px; 
            top: 80px; 
            width: 370px;
            border:1px solid #175EDE;
            border-radius: 4px;
            justify-content: space-between;
            align-items: center;
            line-height: 18px;
            color:#175EDE;
            padding:4px 11px;"
            >${chanTypeList.map((i) => {
        return `<div style="display:flex;justify-content: space-between;align-items: center;">
                <input style="margin-right:5px;" type="radio" value="${i.value}" name="chanTypeList" /> ${i.label}
              </div>`;
      }).join('')}
            </div>`);

      var downloadLimitNumInput = $(`<div class="jmtd-base-input jmtd-button-like jmtd-input  jmtd-base-input-small jmtd-base-input-with-start-icon jmtd-base-input-empty" 
                                          style="position:absolute; top: 79px; right: 540px;width: 80px;">
      <div class="jmtd-base-input-top"><div class="jmtd-base-input-content">
        <input id="HL_downloadLimitNum" class="jmtd-input-input" placeholder="并发下载数量" width="80" type="primary" prefix="jmt-search" value="30"></div></div></div>`);

      var downloadDateInput = $(`<div class="jmtd-base-input jmtd-button-like jmtd-input  jmtd-base-input-small jmtd-base-input-with-start-icon jmtd-base-input-empty" 
        style="position:absolute; top: 79px; right: 627px;width: 200px;">
<div class="jmtd-base-input-top"><div class="jmtd-base-input-content">
<input id="HL_downloadLimitNum" class="jmtd-input-input" placeholder="输入日期,不填代表最近30天" width="200" type="primary" prefix="jmt-search" value=""></div></div></div>`);

      var tips = $(`<span style="position:absolute;display: inline-flex;align-items: center; top: 120px; right: 40px;color: rgba(0, 0, 0, 0.4);font-size: 12px;font-weight: normal">
          <span class="jmti-info-circle jmtd-icon jmtd-icon-font"></span>
          <span id="HL_tips">暂无下载任务,若开始下载要取消,请刷新页面</span>
      </span>`);

      var isDownloadPrimary = $(`<div class="grace-checkbox-item horizontal" style="
      position:absolute;top:79px;right:840px;border: 1px solid #e3e6e9;height:28px;
      display:flex;    display: flex;
      justify-content: space-around;
      align-items: center;width:110px;
      color:rgba(0, 0, 0, 0.7);

'      border-radius: 4px;
      ">
			<i class="grace-icon-check bdp-color-blue"></i><input type="checkbox" class="ng-pristine ng-untouched ng-valid ng-empty"><label class="ng-binding"> 下载一级类目</label>
		</div>`);

      var downloadAllButton = $(`<div>
        <button type="button" 
                icon="jmt-download" 
                class="jmtd-button data-download jmtd-button-small jmtd-button-primary jmtd-button-outline jmtd-button-clickable" 
                style="position: absolute; right: 20px; top: 80px; width: 100px;"
          <span class="jmt-download jmtd-icon jmtd-icon-font">
          </span>
          下载全部数据
          </button>
        </div>`).click(function() {

        var chanType = $('#HL_chanTypeList input[type=radio]').filter(function() {
          return $(this).prop('checked');
        })[0].value;
        var downloadDate = downloadDateInput.find('input')[0].value || getPreDay(30);
        var isDownloadPrimaryCat = isDownloadPrimary.find('input').prop('checked');
        var downloadLimitNum = downloadLimitNumInput.find('#HL_downloadLimitNum')[0].value || 1;
        tips.find('#HL_tips').text('开始下载');
        download(chanType, downloadDate, downloadLimitNum, isDownloadPrimaryCat, (taskNum, doneNum, useTime) => {
          tips.find('#HL_tips').text(`下载中,总共有 ${taskNum} 个数据表，当前已下载 ${doneNum} 个,用时${useTime}秒`);
        });
        $(this).attr('disabled', true);
      });

      $('.component-wrapper').append(downloadAllButton).append(downloadLimitNumInput)
        .append(downloadDateInput).append(chanTypeSelection).append(tips).append(isDownloadPrimary);
      $('#HL_chanTypeList input[type=radio]')[0].checked = true;

    } else {
      setTimeout(() => {
        createDownloadEle();
      }, 100);
    }
  }
});

function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate();
  if (month < 10) month = `0${month}`;
  if (strDate < 10) strDate = `0${strDate}`;

  return `${year}-${month}-${strDate}`;
}

function getPreDay(pre) {
  var date = new Date();
  date.setDate(date.getDate() - pre);

  year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate();
  if (month < 10) month = `0${month}`;
  if (strDate < 10) strDate = `0${strDate}`;

  return `${year}-${month}-${strDate}`;
}

function download(chanType, time, limit, isDownloadPrimaryCat, callback) {
  console.log('isDownloadPrimaryCat', isDownloadPrimaryCat);
  var taskList = [];
  var result = [];

  function addTask(task) {
    taskList.push(task);
    taskNum = taskList.length;
  }

  var doneNum = 0;
  var taskNum = 0;
  const startTime = Date.now();

  function executeTask(loop = 50) {
    if (i > taskNum) {
      result;
    }
    for (var i = 0; i < loop; i++) {
      if (taskList.length > 0) {
        const task = taskList.shift();
        // let num = taskList.length
        task().then(() => {
          doneNum++;
          callback(taskNum, doneNum, (Date.now() - startTime) / 1000);
          executeTask(1);
        });
      } else {
        if (doneNum == taskNum && doneNum !== 0) {
          doneNum = 0;
          taskNum = 0;
          isFirstTask = true;
          downloadExcel(result);
        } else {
          setTimeout(() => {
            executeTask(1);
          }, 100);
        }
      }
    }
  }

  // window.$jd_page_monitor_config  /用户信息

  function getReqSign(x) {
    var rbs = {
      stringify: function(e) {
        var t = e.words
          , n = e.sigBytes
          , r = this._map;
        e.clamp();
        for (var i = [], o = 0; o < n; o += 3)
          for (var a = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = 0; c < 4 && o + .75 * c < n; c++)
            i.push(r.charAt(a >>> 6 * (3 - c) & 63));
        var s = r.charAt(64);
        if (s)
          for (; i.length % 4;)
            i.push(s);
        return i.join('');
      },
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_='
    };
    var Hh = function(e) {
      if (e.__esModule)
        return e;
      var t = Object.defineProperty({}, '__esModule', {
        value: !0
      });
      return Object.keys(e).forEach((function(n) {
          var r = Object.getOwnPropertyDescriptor(e, n);
          Object.defineProperty(t, n, r.get ? r : {
            enumerable: !0,
            get: function() {
              return e[n];
            }
          });
        }
      )),
        t;
    }(Object.freeze({
      __proto__: null,
      default: {}
    }));

    var caodan = function(e, t) {
      var n;
      if ('undefined' != typeof window && window.crypto && (n = window.crypto),
      !n && 'undefined' != typeof window && window.msCrypto && (n = window.msCrypto),
      !n && void 0 !== r && r.crypto && (n = r.crypto),
        !n)
        try {
          n = Hh;
        } catch (e) {
        }
      var i = function() {
        if (n) {
          if ('function' == typeof n.getRandomValues)
            try {
              return n.getRandomValues(new Uint32Array(1))[0];
            } catch (e) {
            }
          if ('function' == typeof n.randomBytes)
            try {
              return n.randomBytes(4).readInt32LE();
            } catch (e) {
            }
        }
        throw new Error('Native crypto module could not be used to get secure random number.');
      }
        , o = Object.create || function() {
        function e() {
        }

        return function(t) {
          var n;
          return e.prototype = t,
            n = new e,
            e.prototype = null,
            n;
        };
      }()
        , a = {}
        , c = a.lib = {}
        , s = c.Base = {
        extend: function(e) {
          var t = o(this);
          return e && t.mixIn(e),
          t.hasOwnProperty('init') && this.init !== t.init || (t.init = function() {
              t.$super.init.apply(this, arguments);
            }
          ),
            t.init.prototype = t,
            t.$super = this,
            t;
        },
        create: function() {
          var e = this.extend();
          return e.init.apply(e, arguments),
            e;
        },
        init: function() {
        },
        mixIn: function(e) {
          for (var t in e)
            e.hasOwnProperty(t) && (this[t] = e[t]);
          e.hasOwnProperty('toString') && (this.toString = e.toString);
        },
        clone: function() {
          return this.init.prototype.extend(this);
        }
      }
        , u = c.WordArray = s.extend({
        init: function(e, t) {
          e = this.words = e || [],
            this.sigBytes = null != t ? t : 4 * e.length;
        },
        toString: function(e) {
          return (e || d).stringify(this);
        },
        concat: function(e) {
          var t = this.words
            , n = e.words
            , r = this.sigBytes
            , i = e.sigBytes;
          if (this.clamp(),
          r % 4)
            for (var o = 0; o < i; o++) {
              var a = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
              t[r + o >>> 2] |= a << 24 - (r + o) % 4 * 8;
            }
          else
            for (o = 0; o < i; o += 4)
              t[r + o >>> 2] = n[o >>> 2];
          return this.sigBytes += i,
            this;
        },
        clamp: function() {
          var t = this.words
            , n = this.sigBytes;
          t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8,
            t.length = e.ceil(n / 4);
        },
        clone: function() {
          var e = s.clone.call(this);
          return e.words = this.words.slice(0),
            e;
        },
        random: function(e) {
          for (var t = [], n = 0; n < e; n += 4)
            t.push(i());
          return new u.init(t, e);
        }
      })
        , l = a.enc = {}
        , d = l.Hex = {
        stringify: function(e) {
          for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
            var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            r.push((o >>> 4).toString(16)),
              r.push((15 & o).toString(16));
          }
          return r.join('');
        },
        parse: function(e) {
          for (var t = e.length, n = [], r = 0; r < t; r += 2)
            n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
          return new u.init(n, t / 2);
        }
      }
        , f = l.Latin1 = {
        stringify: function(e) {
          for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
            var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            r.push(String.fromCharCode(o));
          }
          return r.join('');
        },
        parse: function(e) {
          for (var t = e.length, n = [], r = 0; r < t; r++)
            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
          return new u.init(n, t);
        }
      }
        , h = l.Utf8 = {
        stringify: function(e) {
          try {
            return decodeURIComponent(escape(f.stringify(e)));
          } catch (e) {
            throw new Error('Malformed UTF-8 data');
          }
        },
        parse: function(e) {
          return f.parse(unescape(encodeURIComponent(e)));
        }
      }
        , g = c.BufferedBlockAlgorithm = s.extend({
        reset: function() {
          this._data = new u.init,
            this._nDataBytes = 0;
        },
        _append: function(e) {
          'string' == typeof e && (e = h.parse(e)),
            this._data.concat(e),
            this._nDataBytes += e.sigBytes;
        },
        _process: function(t) {
          var n, r = this._data, i = r.words, o = r.sigBytes, a = this.blockSize, c = o / (4 * a),
            s = (c = t ? e.ceil(c) : e.max((0 | c) - this._minBufferSize, 0)) * a, l = e.min(4 * s, o);
          if (s) {
            for (var d = 0; d < s; d += a)
              this._doProcessBlock(i, d);
            n = i.splice(0, s),
              r.sigBytes -= l;
          }
          return new u.init(n, l);
        },
        clone: function() {
          var e = s.clone.call(this);
          return e._data = this._data.clone(),
            e;
        },
        _minBufferSize: 0
      });
      c.Hasher = g.extend({
        cfg: s.extend(),
        init: function(e) {
          this.cfg = this.cfg.extend(e),
            this.reset();
        },
        reset: function() {
          g.reset.call(this),
            this._doReset();
        },
        update: function(e) {
          return this._append(e),
            this._process(),
            this;
        },
        finalize: function(e) {
          return e && this._append(e),
            this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function(e) {
          return function(t, n) {
            return new e.init(n).finalize(t);
          };
        },
        _createHmacHelper: function(e) {
          return function(t, n) {
            return new p.HMAC.init(e, n).finalize(t);
          };
        }
      });
      var p = a.algo = {};
      return a;
    }(Math);

    var s = function(t) {
      var n = caodan
        , r = n.lib
        , i = r.WordArray
        , o = r.Hasher
        , a = n.algo
        , c = [];
      !function() {
        for (var e = 0; e < 64; e++)
          c[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0;
      }();
      var s = a.MD5 = o.extend({
        _doReset: function() {
          this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878]);
        },
        _doProcessBlock: function(e, t) {
          for (var n = 0; n < 16; n++) {
            var r = t + n
              , i = e[r];
            e[r] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
          }
          var o = this._hash.words
            , a = e[t + 0]
            , s = e[t + 1]
            , h = e[t + 2]
            , g = e[t + 3]
            , p = e[t + 4]
            , m = e[t + 5]
            , A = e[t + 6]
            , M = e[t + 7]
            , y = e[t + 8]
            , j = e[t + 9]
            , b = e[t + 10]
            , w = e[t + 11]
            , v = e[t + 12]
            , N = e[t + 13]
            , I = e[t + 14]
            , D = e[t + 15]
            , x = o[0]
            , E = o[1]
            , T = o[2]
            , O = o[3];
          x = u(x, E, T, O, a, 7, c[0]),
            O = u(O, x, E, T, s, 12, c[1]),
            T = u(T, O, x, E, h, 17, c[2]),
            E = u(E, T, O, x, g, 22, c[3]),
            x = u(x, E, T, O, p, 7, c[4]),
            O = u(O, x, E, T, m, 12, c[5]),
            T = u(T, O, x, E, A, 17, c[6]),
            E = u(E, T, O, x, M, 22, c[7]),
            x = u(x, E, T, O, y, 7, c[8]),
            O = u(O, x, E, T, j, 12, c[9]),
            T = u(T, O, x, E, b, 17, c[10]),
            E = u(E, T, O, x, w, 22, c[11]),
            x = u(x, E, T, O, v, 7, c[12]),
            O = u(O, x, E, T, N, 12, c[13]),
            T = u(T, O, x, E, I, 17, c[14]),
            x = l(x, E = u(E, T, O, x, D, 22, c[15]), T, O, s, 5, c[16]),
            O = l(O, x, E, T, A, 9, c[17]),
            T = l(T, O, x, E, w, 14, c[18]),
            E = l(E, T, O, x, a, 20, c[19]),
            x = l(x, E, T, O, m, 5, c[20]),
            O = l(O, x, E, T, b, 9, c[21]),
            T = l(T, O, x, E, D, 14, c[22]),
            E = l(E, T, O, x, p, 20, c[23]),
            x = l(x, E, T, O, j, 5, c[24]),
            O = l(O, x, E, T, I, 9, c[25]),
            T = l(T, O, x, E, g, 14, c[26]),
            E = l(E, T, O, x, y, 20, c[27]),
            x = l(x, E, T, O, N, 5, c[28]),
            O = l(O, x, E, T, h, 9, c[29]),
            T = l(T, O, x, E, M, 14, c[30]),
            x = d(x, E = l(E, T, O, x, v, 20, c[31]), T, O, m, 4, c[32]),
            O = d(O, x, E, T, y, 11, c[33]),
            T = d(T, O, x, E, w, 16, c[34]),
            E = d(E, T, O, x, I, 23, c[35]),
            x = d(x, E, T, O, s, 4, c[36]),
            O = d(O, x, E, T, p, 11, c[37]),
            T = d(T, O, x, E, M, 16, c[38]),
            E = d(E, T, O, x, b, 23, c[39]),
            x = d(x, E, T, O, N, 4, c[40]),
            O = d(O, x, E, T, a, 11, c[41]),
            T = d(T, O, x, E, g, 16, c[42]),
            E = d(E, T, O, x, A, 23, c[43]),
            x = d(x, E, T, O, j, 4, c[44]),
            O = d(O, x, E, T, v, 11, c[45]),
            T = d(T, O, x, E, D, 16, c[46]),
            x = f(x, E = d(E, T, O, x, h, 23, c[47]), T, O, a, 6, c[48]),
            O = f(O, x, E, T, M, 10, c[49]),
            T = f(T, O, x, E, I, 15, c[50]),
            E = f(E, T, O, x, m, 21, c[51]),
            x = f(x, E, T, O, v, 6, c[52]),
            O = f(O, x, E, T, g, 10, c[53]),
            T = f(T, O, x, E, b, 15, c[54]),
            E = f(E, T, O, x, s, 21, c[55]),
            x = f(x, E, T, O, y, 6, c[56]),
            O = f(O, x, E, T, D, 10, c[57]),
            T = f(T, O, x, E, A, 15, c[58]),
            E = f(E, T, O, x, N, 21, c[59]),
            x = f(x, E, T, O, p, 6, c[60]),
            O = f(O, x, E, T, w, 10, c[61]),
            T = f(T, O, x, E, h, 15, c[62]),
            E = f(E, T, O, x, j, 21, c[63]),
            o[0] = o[0] + x | 0,
            o[1] = o[1] + E | 0,
            o[2] = o[2] + T | 0,
            o[3] = o[3] + O | 0;
        },
        _doFinalize: function() {
          var e = this._data
            , n = e.words
            , r = 8 * this._nDataBytes
            , i = 8 * e.sigBytes;
          n[i >>> 5] |= 128 << 24 - i % 32;
          var o = t.floor(r / 4294967296)
            , a = r;
          n[15 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
            n[14 + (i + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
            e.sigBytes = 4 * (n.length + 1),
            this._process();
          for (var c = this._hash, s = c.words, u = 0; u < 4; u++) {
            var l = s[u];
            s[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);
          }
          return c;
        },
        clone: function() {
          var e = o.clone.call(this);
          return e._hash = this._hash.clone(),
            e;
        }
      });

      function u(e, t, n, r, i, o, a) {
        var c = e + (t & n | ~t & r) + i + a;
        return (c << o | c >>> 32 - o) + t;
      }

      function l(e, t, n, r, i, o, a) {
        var c = e + (t & r | n & ~r) + i + a;
        return (c << o | c >>> 32 - o) + t;
      }

      function d(e, t, n, r, i, o, a) {
        var c = e + (t ^ n ^ r) + i + a;
        return (c << o | c >>> 32 - o) + t;
      }

      function f(e, t, n, r, i, o, a) {
        var c = e + (n ^ (t | ~r)) + i + a;
        return (c << o | c >>> 32 - o) + t;
      }

      return s;
    }(Math);

    function createHelper(e) {
      return function gb(t, n) {
        return new e.init(n).finalize(t);
      };
    }

    var n = '/api/v1/sz/common/search_keyword_order_list_table/_table',
      e = n + JSON.stringify(x),
      o = Math.floor(.2754 * e.length),
      n = e.substring(0, o),
      o = e.substring(o),
      o = ''.concat(n).concat('652').concat(o);

    return rbs.stringify(createHelper(s)(o, '652'));
  }


  function getHeaderParam() {
    //获取header参数
    function j(e, t) {
      var n, r = Object.keys(e);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e),
      t && (n = n.filter((function(t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        }
      ))),
        r.push.apply(r, n)),
        r;
    }

    function b(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? j(Object(n), !0).forEach((function(t) {
            i()(e, t, n[t]);
          }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : j(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          }
        ));
      }
      return e;
    }

    var h = function(e) {
      return e = new RegExp('(^| )'.concat(e, '=([^;]*)(;|$)')),
        (e = document.cookie.match(e)) ? e[2] : null;
    };

    function createHash(e) {
      if (null === e)
        return null;
      for (var t, n, r, i, o, a = function(e, t) {
        return e << t | e >>> 32 - t;
      }, c = function(e, t) {
        var n = 2147483648 & e
          , r = 2147483648 & t
          , i = 1073741824 & e
          , o = 1073741824 & t;
        return t = (1073741823 & e) + (1073741823 & t),
          i & o ? 2147483648 ^ t ^ n ^ r : i | o ? 1073741824 & t ? 3221225472 ^ t ^ n ^ r : 1073741824 ^ t ^ n ^ r : t ^ n ^ r;
      }, s = function(e, t, n, r, i, o, s) {
        var u;
        return e = c(e, c(c((u = t) & n | ~u & r, i), s)),
          c(a(e, o), t);
      }, u = function(e, t, n, r, i, o, s) {
        return e = c(e, c(c(t & (r = r) | n & ~r, i), s)),
          c(a(e, o), t);
      }, l = function(e, t, n, r, i, o, s) {
        return e = c(e, c(c(t ^ n ^ r, i), s)),
          c(a(e, o), t);
      }, d = function(e, t, n, r, i, o, s) {
        return e = c(e, c(c(n ^ (t | ~r), i), s)),
          c(a(e, o), t);
      }, f = function(e) {
        for (var t = '', n = '', r = 0; r <= 3; r++)
          t += (n = '0' + (e >>> 8 * r & 255).toString(16)).substr(n.length - 2, 2);
        return t;
      }, h = 1732584193, g = 4023233417, p = 2562383102, m = 271733878, A = (o = function(e) {
        for (var t, n = e.length, r = 16 * (1 + ((r = n + 8) - r % 64) / 64), i = new Array(r - 1), o = 0, a = 0; a < n;)
          o = a % 4 * 8,
            i[t = (a - a % 4) / 4] = i[t] | e.charCodeAt(a) << o,
            a++;
        return i[t = (a - a % 4) / 4] = i[t] | 128 << (o = a % 4 * 8),
          i[r - 2] = n << 3,
          i[r - 1] = n >>> 29,
          i;
      }(e)).length, M = 0; M < A; M += 16)
        g = d(g = d(g = d(g = d(g = l(g = l(g = l(g = l(g = u(g = u(g = u(g = u(g = s(g = s(g = s(g = s(n = g, p = s(r = p, m = s(i = m, h = s(t = h, g, p, m, o[M + 0], 7, 3614090360), g, p, o[M + 1], 12, 3905402710), h, g, o[M + 2], 17, 606105819), m, h, o[M + 3], 22, 3250441966), p = s(p, m = s(m, h = s(h, g, p, m, o[M + 4], 7, 4118548399), g, p, o[M + 5], 12, 1200080426), h, g, o[M + 6], 17, 2821735955), m, h, o[M + 7], 22, 4249261313), p = s(p, m = s(m, h = s(h, g, p, m, o[M + 8], 7, 1770035416), g, p, o[M + 9], 12, 2336552879), h, g, o[M + 10], 17, 4294925233), m, h, o[M + 11], 22, 2304563134), p = s(p, m = s(m, h = s(h, g, p, m, o[M + 12], 7, 1804603682), g, p, o[M + 13], 12, 4254626195), h, g, o[M + 14], 17, 2792965006), m, h, o[M + 15], 22, 1236535329), p = u(p, m = u(m, h = u(h, g, p, m, o[M + 1], 5, 4129170786), g, p, o[M + 6], 9, 3225465664), h, g, o[M + 11], 14, 643717713), m, h, o[M + 0], 20, 3921069994), p = u(p, m = u(m, h = u(h, g, p, m, o[M + 5], 5, 3593408605), g, p, o[M + 10], 9, 38016083), h, g, o[M + 15], 14, 3634488961), m, h, o[M + 4], 20, 3889429448), p = u(p, m = u(m, h = u(h, g, p, m, o[M + 9], 5, 568446438), g, p, o[M + 14], 9, 3275163606), h, g, o[M + 3], 14, 4107603335), m, h, o[M + 8], 20, 1163531501), p = u(p, m = u(m, h = u(h, g, p, m, o[M + 13], 5, 2850285829), g, p, o[M + 2], 9, 4243563512), h, g, o[M + 7], 14, 1735328473), m, h, o[M + 12], 20, 2368359562), p = l(p, m = l(m, h = l(h, g, p, m, o[M + 5], 4, 4294588738), g, p, o[M + 8], 11, 2272392833), h, g, o[M + 11], 16, 1839030562), m, h, o[M + 14], 23, 4259657740), p = l(p, m = l(m, h = l(h, g, p, m, o[M + 1], 4, 2763975236), g, p, o[M + 4], 11, 1272893353), h, g, o[M + 7], 16, 4139469664), m, h, o[M + 10], 23, 3200236656), p = l(p, m = l(m, h = l(h, g, p, m, o[M + 13], 4, 681279174), g, p, o[M + 0], 11, 3936430074), h, g, o[M + 3], 16, 3572445317), m, h, o[M + 6], 23, 76029189), p = l(p, m = l(m, h = l(h, g, p, m, o[M + 9], 4, 3654602809), g, p, o[M + 12], 11, 3873151461), h, g, o[M + 15], 16, 530742520), m, h, o[M + 2], 23, 3299628645), p = d(p, m = d(m, h = d(h, g, p, m, o[M + 0], 6, 4096336452), g, p, o[M + 7], 10, 1126891415), h, g, o[M + 14], 15, 2878612391), m, h, o[M + 5], 21, 4237533241), p = d(p, m = d(m, h = d(h, g, p, m, o[M + 12], 6, 1700485571), g, p, o[M + 3], 10, 2399980690), h, g, o[M + 10], 15, 4293915773), m, h, o[M + 1], 21, 2240044497), p = d(p, m = d(m, h = d(h, g, p, m, o[M + 8], 6, 1873313359), g, p, o[M + 15], 10, 4264355552), h, g, o[M + 6], 15, 2734768916), m, h, o[M + 13], 21, 1309151649), p = d(p, m = d(m, h = d(h, g, p, m, o[M + 4], 6, 4149444226), g, p, o[M + 11], 10, 3174756917), h, g, o[M + 2], 15, 718787259), m, h, o[M + 9], 21, 3951481745),
          h = c(h, t),
          g = c(g, n),
          p = c(p, r),
          m = c(m, i);
      return (f(h) + f(g) + f(p) + f(m)).toLowerCase();
    }

    var l = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (function(e) {
          var t = 16 * Math.random() | 0;
          return ('x' === e ? t : 3 & t | 8).toString(16);
        }
      ));
    };

    var a = l();
    // var a = "c857e2ca-abc9-4189-9ce9-2b9634dd21d0"
    var p = '/octopusajax/octopus/api/v1/sz/common/search_keyword_order_list_table/_table';
    var m = (new Date).getTime();
    // var m = 1690858282492
    // c532780fc7b69195f7f049f00fea845c
    var res = b({
      'User-mup': m,
      'User-mnp': createHash(p + a + m + '372ad2c2b6'),
      'Uuid': a,
      'p-pin': h('pin'),
      'X-Requested-With': 'XMLHttpRequest'
    }, undefined);
    return res;
  }

  var myHeaders = new Headers();
  myHeaders.append('User-Mnp', '4028d468098d4935b5fba21c30a2ed8e');
  myHeaders.append('User-Mup', 1690785412184);
  myHeaders.append('Uuid', 'd9c1dfaf-96fc-4f59-b1e6-358895406fb6');


  var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    credentials: 'include'
  };

  fetch('https://szgateway.jd.com/octopusajax/octopus/api/v1/sz/category/parentCids/-999/parentLevel/2/mainIndustry?containAll=false&keyIsValue=true&pageNum=1&pageSize=10000', myInit).then((res) => {
    return res.json();
  }).then(({content: {data}}) => {
    console.log('获取品类列表成功:', data);
    // return

    data.forEach((item) => {
      if (isDownloadPrimaryCat) {
        addTask(() => {
          return getTableDataTask(item);
        });
      }
      item.children?.forEach((i) => {
        // 获取数据的任务
        addTask(() => {
          return getTableDataTask(item, i);
        });
      });
    });
    // 开始执行下载任务
    setTimeout(() => {
      executeTask(limit);
    }, 500);
  });

  function getTableDataTask(item, i = {label: ''}) {
    var params = {
      'metrics': [
        'uv',
        'clickUv',
        'clickRate',
        'gmvCj',
        'cvrCj',
        'skuOnlineNum',
        'blueOcean',
        'clickPv',
        'pv1',
        'orderNumCj',
        'uniqSkuExpoNum',
        'capability',
        'expressBidPrice'
      ],
      'outputDimensions': [
        'keyword',
        'firstHcCid3'
      ],
      'filters': {
        'originalStartDate': {
          'value': '2023-07-02',
          'operator': 'eq'
        },
        'originalEndDate': {
          'value': '2023-07-31',
          'operator': 'eq'
        },
        'dateType': {
          'value': '0',
          'operator': 'eq'
        },
        'validStartDay': {
          'value': '2019-01-01',
          'operator': 'eq'
        },
        'validEndDay': {
          'value': '2023-07-31',
          'operator': 'eq'
        },
        'cid2': {
          'value': '9849',
          'operator': 'eq'
        },
        'cid3': {
          'value': '9871',
          'operator': 'eq'
        },
        'chanType': {
          'value': -999,
          'operator': 'eq'
        },
        'gmvCj': {
          'value': '0',
          'operator': 'gt'
        },
        'keywordType': {
          'value': '1',
          'operator': 'eq'
        },
        'cidLevel': {
          'value': '3',
          'operator': 'eq'
        }
      },
      'orderBy': [
        {
          'name': 'gmvCj',
          'desc': true
        },
        {
          'name': 'uv',
          'desc': true
        },
        {
          'name': 'clickUv',
          'desc': true
        },
        {
          'name': 'keyword',
          'desc': true
        }
      ],
      'pageNum': 1,
      'pageSize': 500
    };
    // 0 = 按天 1 = 按周 2 = 按月
    params.filters.dateType.value = '0';
    params.filters.chanType.value = chanType;
    params.filters.originalStartDate.value = time;
    params.filters.originalEndDate.value = getPreDay(1);
    params.filters.validEndDay.value = getPreDay(1);
    params.filters.cid2.value = item.value;
    params.filters.cid3.value = i?.value || '-999';
    params.filters.cidLevel.value = i?.value ? '3' : '2';

    var myHeaders_1 = new Headers(getHeaderParam());
    myHeaders_1.set('X-Req-Sign', getReqSign(params));
    myHeaders_1.set('Content-Type', 'application/json;charset=UTF-8');
    var p = {
      method: 'POST',
      headers: myHeaders_1,
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    };
    return new Promise(resolve => {
      fetch('https://szgateway.jd.com/octopusajax/octopus/api/v1/sz/common/search_keyword_order_list_table/_table', p)
        .then((res) => {
          return res.json();
        }).then((res) => {
        if (res && res.status === 0 && res.content) {
          console.log(item.label + '-->' + i.label + '下载成功: ', '共有' + res.content.length + '条数据');
          res.content.forEach(ii => {
            ii.category = item.label;
            i.label && (ii.category2 = i.label);
          });
          result = result.concat(res.content);
          setTimeout(() => {
            resolve();
          }, 100);
        } else {
          setTimeout(() => {
            resolve();
          }, 1000);
          console.log(item.label + '-->' + i.label + '下载失败。 原因:' + res.message, '尝试下载下一个');
        }
      }).catch((e) => {
        console.log(item.label + '-->' + i.label + '下载失败。 原因:网络问题或频率太高被拒绝', e);
      });
    });
  }

  var columns = [
    {
      lable: '关键词',
      key: 'keyword'
    },
    {
      lable: '搜索人气',
      key: 'uv'
    },
    {
      lable: '搜索指数',
      key: 'pv1'
    },
    {
      lable: '点击人气',
      key: 'clickUv'
    },
    {
      lable: '点击指数',
      key: 'clickPv'
    },
    {
      lable: '点击率',
      key: 'clickRate'
    },
    {
      lable: '成交金额指数',
      key: 'gmvCj'
    },
    {
      lable: '成交单量指数',
      key: 'orderNumCj'
    },
    {
      lable: '成交转化率',
      key: 'cvrCj'
    },
    {
      lable: '全网商品数',
      key: 'skuOnlineNum'
    },
    {
      lable: '蓝海值',
      key: 'blueOcean'
    },
    {
      lable: '潜力值',
      key: 'capability'
    },
    {
      lable: '在线商品数',
      key: 'uniqSkuExpoNum'
    },
    {
      lable: '快车参考价',
      key: 'skuOnlineNum'
    },
    {
      lable: '最优品类',
      key: 'firstHcCid3Name'
    },
    {
      lable: '一级类目',
      key: 'category'
    },
    {
      lable: '二级类目',
      key: 'category2'
    }
  ];

  function downloadExcel(data) {
    let csvStr = data.map(item => {
      let valueList = columns.map(i => item[i.key]);
      return valueList.join(',\t');
    });
    csvStr = columns.map(i => i.lable).join(',') + ',\n' + csvStr.join(',\n');
    const href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csvStr);
    const aHtml = document.createElement('a');
    aHtml.download = 'all_table.xlsx';
    aHtml.href = href;
    aHtml.click();
  }
}