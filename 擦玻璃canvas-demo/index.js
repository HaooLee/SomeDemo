let mul_table = [
  512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
  454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
  482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
  437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
  497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
  320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
  446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
  329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
  505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
  399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
  324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
  268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
  451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
  385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
  332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
  289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259,
];

let shg_table = [
  9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
  17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
  19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
  21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
  21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
  22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
  22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
  23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
  23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
  23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
  23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
  24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
  24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
  24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
  24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
];

function prepareBackground(canvas, img, blur, width, height) {
  if (width && height) {
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
  } else {
    width = canvas.width;
    height = canvas.height;
  }

  let context = canvas.getContext('2d');
  context.clearRect(0, 0, width, height);
  context.drawImage(img, 0, 0, width, height);

  if (isNaN(blur) || blur < 1) return;

  stackBlur(context, 0, 0, width, height, blur);
};

function stackBlur(context, top_x, top_y, width, height, radius) {
  radius |= 0;
  let imageData = context.getImageData(top_x, top_y, width, height);

  let pixels = imageData.data;

  let x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
    r_out_sum, g_out_sum, b_out_sum,
    r_in_sum, g_in_sum, b_in_sum,
    pr, pg, pb, rbs;

  let div = radius + radius + 1;
  let w4 = width << 2;
  let widthMinus1 = width - 1;
  let heightMinus1 = height - 1;
  let radiusPlus1 = radius + 1;
  let sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

  let stackStart = new BlurStack();
  let stack = stackStart;
  let stackEnd;
  for (i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i == radiusPlus1) stackEnd = stack;
  }
  stack.next = stackStart;
  let stackIn = null;
  let stackOut = null;

  yw = yi = 0;

  let mul_sum = mul_table[radius];
  let shg_sum = shg_table[radius];

  for (let y = 0; y < height; y++) {
    let r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

    let r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    let g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    let b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;

    stack = stackStart;

    for (i = 0; i < radiusPlus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    for (i = 1; i < radiusPlus1; i++) {
      p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
      r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
      g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
      b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;

      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;

      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;
    for (x = 0; x < width; x++) {
      pixels[yi] = (r_sum * mul_sum) >> shg_sum;
      pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
      pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;

      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;

      p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

      r_in_sum += (stackIn.r = pixels[p]);
      g_in_sum += (stackIn.g = pixels[p + 1]);
      b_in_sum += (stackIn.b = pixels[p + 2]);

      r_sum += r_in_sum;
      g_sum += g_in_sum;
      b_sum += b_in_sum;

      stackIn = stackIn.next;

      r_out_sum += (pr = stackOut.r);
      g_out_sum += (pg = stackOut.g);
      b_out_sum += (pb = stackOut.b);

      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;

      stackOut = stackOut.next;

      yi += 4;
    }
    yw += width;
  }


  for (let x = 0; x < width; x++) {
    g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

    yi = x << 2;
    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;

    stack = stackStart;

    for (let i = 0; i < radiusPlus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    yp = width;

    for (let i = 1; i <= radius; i++) {
      yi = (yp + x) << 2;

      r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
      g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
      b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;

      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;

      stack = stack.next;

      if (i < heightMinus1) {
        yp += width;
      }
    }

    yi = x;
    stackIn = stackStart;
    stackOut = stackEnd;
    for (y = 0; y < height; y++) {
      p = yi << 2;
      pixels[p] = (r_sum * mul_sum) >> shg_sum;
      pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
      pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;

      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;

      p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

      r_sum += (r_in_sum += (stackIn.r = pixels[p]));
      g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
      b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));

      stackIn = stackIn.next;

      r_out_sum += (pr = stackOut.r);
      g_out_sum += (pg = stackOut.g);
      b_out_sum += (pb = stackOut.b);

      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;

      stackOut = stackOut.next;

      yi += width;
    }
  }

  context.putImageData(imageData, top_x, top_y);
};

function BlurStack() {
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  this.next = null;
}

(function(window) {
  let outBox = null, image = null, canvas = null, context = null,
    outPos = { x: 0, y: 0 }, outSize = { w: 0, h: 0 };
  let drawPercentCallback = null;

  function initWindow(_outBox) {
    outBox = _outBox;

    outBox.classList.add('clean-window-out');

    // 获取相关属性
    let imageSrc = outBox.getAttribute('data-image-src');
    let rect = outBox.getBoundingClientRect();
    outPos.x = rect.left;
    outPos.y = rect.top;
    outSize.w = rect.right - rect.left;
    outSize.h = rect.bottom - rect.top;

    image = document.createElement('img');
    image.className = 'image';
    image.style.display = 'none';
    image.onload = imageLoaded;
    image.src = imageSrc;
    outBox.appendChild(image);

    canvas = document.createElement('canvas');
    canvas.className = 'canvas';
    canvas.width = outSize.w;
    canvas.height = outSize.h;
    outBox.appendChild(canvas);
    context = canvas.getContext('2d');

    bindEvents();

  }

  function bindEvents() {
    // 绑定触摸事件
    let device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    let clickEvtName = device ? 'touchstart' : 'mousedown';
    let moveEvtName = device ? 'touchmove' : 'mousemove';
    let isMouseDown = false;
    if (!device) {
      document.addEventListener('mouseup', function(e) {
        isMouseDown = false;
        // if (typeof(drawPercentCallback) == 'function') {
        //   drawPercentCallback.call(null, );
        // }
        console.log(getTransparentPercent(context, context.canvas.width,context.canvas.height));
      }, false);
    }
    outBox.addEventListener(clickEvtName, function(e) {
      isMouseDown = true;
      let docEle = document.documentElement;
      let x = (device ? e.touches[0].clientX : e.clientX) - outPos.x + docEle.scrollLeft - docEle.clientLeft;
      let y = (device ? e.touches[0].clientY : e.clientY) - outPos.y + docEle.scrollTop - docEle.clientTop;
      drawPoint(x, y);

      e.preventDefault();
    }, false);

    outBox.addEventListener(moveEvtName, function(e) {
      if (!device && !isMouseDown) {
        return false;
      }
      let docEle = document.documentElement;
      let x = (device ? e.touches[0].clientX : e.clientX) - outPos.x + docEle.scrollLeft - docEle.clientLeft;
      let y = (device ? e.touches[0].clientY : e.clientY) - outPos.y + docEle.scrollTop - docEle.clientTop;
      drawPoint(x, y);

      e.preventDefault();
    }, false);
  }

  function drawPoint(x, y) {
    context.globalCompositeOperation = 'destination-out';
    // 绘制擦掉的部分
    context.beginPath();
    let radGrad = context.createRadialGradient(x, y, 0, x, y, 30);
    radGrad.addColorStop(0, 'rgba(0,0,0,0.6)');
    radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = radGrad;
    context.arc(x, y, 30, 0, Math.PI * 2, true);
    context.fill();
  }

  function getTransparentPercent(ctx, width, height) {
    // 计算擦掉部分的百分比
    let imgData = ctx.getImageData(0, 0, width, height);
    let pixles = imgData.data;
    let transPixs = 0;
    for (let i = 0, j = pixles.length; i < j; i += 4) {
      let a = pixles[i + 3];
      if (a < 128) {
        transPixs++
      }
    }
    return (transPixs / (pixles.length / 4) * 100).toFixed(2);
  }

  function setDrawPercentCallback(callback) {
    // 设置擦掉百分比统计的回调函数
    drawPercentCallback = callback;
  }

  function imageLoaded() {
    image.style.display = 'block';
    console.log(performance.now());
    prepareBackground(canvas, image, 50, outSize.w, outSize.h);
    console.log(performance.now());
  }

  window['initWindow'] = initWindow;
  window['setDrawPercentCallback'] = setDrawPercentCallback;
})(window);
document.getElementById('box').style.height = window.screen.availHeight + 'px';
initWindow(document.getElementById('box'));

