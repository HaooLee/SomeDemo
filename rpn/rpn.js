
  const rpn = {
    _precedence: {'/': 2, '*': 2, '-': 1, '+': 1, '#': 0},

    _operation: {
      '+': (a, b) => (+a) + (+b),
      '-': (a, b) => (+a) - (+b),
      '*': (a, b) => (+a) * (+b),
      '/': (a, b) => (+a) / (+b)
    },

    _splitExp: function (exp) {
      return exp.match(/\d+|[^\d\s\t]/g);
    },

    _isOperator: function (char) {
      return /^[\/\*\-\+#]$/.test(char);
    },

    _isBracket: function (char) {
      return /^[\(\)]$/.test(char);
    },

    _isNumber: function (str) {
      return /^\d+$/.test(str);
    },

    _isValidExpression: function (exp) { // 含有除数字、括号、操作符以外的符号即为非法
      return !/[^\d\s\t\+\-\*\/\(\)]/.test(exp);
    },
    infix2rpn: function(exp) {
      if (!rpn._isValidExpression(exp)) return null;  // 用于保证以下处理的是合法的表达式

      let arrExp = rpn._splitExp(exp);  // 输入串分割
      let opStack = [];                 // 运算符栈
      let rpnStack = [];                // 存放逆波兰式结果

      arrExp = arrExp.concat('#');      // 加入最低优先级的算符 '#'

      let i,                        // 用于遍历arrExp
        item,                     // 遍历arrExp时暂存
        op,                       // 暂存opStack中的操作符
        len = arrExp.length;      // 记录arrExp长度
      for (i = 0; i < len; i ++) {
        item = arrExp[i];
        if (rpn._isNumber(item)) {
          rpnStack.push(item);
        } else if (rpn._isOperator(item)) {
          while (opStack.length) {
            op = opStack[opStack.length-1];        // push性能低于pop和数组按索引取值，要尽量避免push
            if(op === '(') {                // 栈顶运算符是左括号,需单独处理
              break;
            } else if (rpn._precedence[item] > rpn._precedence[op]) { // 否则，栈顶是运算符。并且如果...
              // 当前算符优先级大于算符栈栈顶优先级
              break;
            } else {                    // 当前算符优先级小于等于算符栈栈顶优先级
              rpnStack.push(opStack.pop()); // 弹出算符栈栈顶算符并放入逆波兰式结果栈中
            }
          }
          opStack.push(item);           // 将运算符压入
        } else {                        // item是括号
          if (item === '(') {           // 是 '('
            opStack.push(item);
          } else  {  // 否则，item是 ')'
            while (opStack[opStack.length-1] !== '(') {
              rpnStack.push(opStack.pop());
            }                   // ')' 遇 '(' ，相抵消
            opStack.pop();
          }
        }
      }
      return rpnStack.length ? rpnStack.join(' ') : null;
    },
    rpnCalculate: function (exp) {
      if (!rpn._isValidExpression(exp)) return null;  

      let arrExp = rpn._splitExp(exp);
      let calcStack = [];
      let item;                      
      let param1, param2;           

      let i, len = arrExp.length;
      for (i = 0; i < len; i ++) {
        item = arrExp[i];
        if (rpn._isNumber(item)) {
          calcStack.push(+item);    
        } else {                    
          param2 = calcStack.pop();
          param1 = calcStack.pop();
          calcStack.push(rpn._operation[item](param1, param2));// 执行运算并将结果压栈
        }
      }
      return calcStack.pop();
    },
    calculate: function (exp) {
      return rpn.rpnCalculate(rpn.infix2rpn(exp));
    }
  }

  const exp = '1+2+(3*4+4)/3-2'
  
  function calculate(exp){
    console.log('正确结果：', new Function(`return ${exp}`)())
    console.log('逆波兰式结果:', rpn.calculate(exp))
  }

  calculate(exp)