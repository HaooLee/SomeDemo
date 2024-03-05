
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
  
  function getEx1(){
  
  function w(e) {
      for (var t = '9527'.split("").map((function(e) {
          return Number(e)
      }
      )), n = e.split("").map((function(e) {
          return Number(e)
      }
      )), r = 7 * n.reduce((function(e, t) {
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
      for (var t = [], n = function() {
          for (var e = [], t = 0; t < 36; t++)
              t >= 0 && t <= 9 ? e.push(t) : e.push(String.fromCharCode(t + 87));
          return e
      }(); e; ) {
          var r = e % 36;
          t.unshift(n[r]),
          e = parseInt(e / 36)
      }
      return t.join("")
    }
  
    return w(`${Date.now()}`)
  }


  function customFetch(url,data = {},headers){
    return new Promise((res)=>{
        var xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    res(response);
                } else {
                    res(xhr.status);
                }
            }
        };

        var body = JSON.stringify(Object.assign({},{
            "platform": "pc",
            "version": "5.26.0",
            "ua": "Chrome116",
            "ex": getEx('indexContent'),
            "trafficType": 0,
            "ex1": getEx1(),
            "token": docCookies.getItem('Token')
        },data));
        xhr.send(body);
    })
  }

  customFetch('https://dian.ysbang.cn/wholesale-drug/sales/getWholesaleList/v4270',{
    "trafficType": 1,
    "page": 1,
    "pagesize": "60",
    "classify_id": 410,
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
}).then((res)=>{
    if(res && res.code === '40001'){
        console.log(res)
    }
})

