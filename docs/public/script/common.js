'use strict';
import React from 'react';
import {Modal, Checkbox,message} from 'antd';

let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

module.exports = {
  //table时间排序
  handleTimeSort: function (key, a, b) {
    let sort = 0;
    let aa = a[key];
    let bb = b[key];
    if (!aa || !bb) {
      return sort;
    } else {
      sort = new Date(aa) - new Date(bb);
    }
    return sort;
  },
  //获取登录信息
  getLoginData: function () {
    let loginData = window.sessionStorage.loginData || window.loginData;
    //获取不到数据报错
    if (!loginData) {
      return;
    }
    let loginDataObj;
    if (typeof loginData === 'string') {
      try {
        loginDataObj = JSON.parse(loginData);
      } catch (err) {
      }
    } else {
      loginDataObj = loginData;
    }
    if (loginDataObj) {
      return loginDataObj;
    }
  },
  // 获取当前页用于分页
  //sizeChange
  getStartPage1: function (pageRow, totalRow, startPage) {
    let page = totalRow / pageRow;
    let allPage = totalRow % pageRow == 0 ? page : Math.floor(page) + 1;
    return startPage <= allPage ? startPage : allPage;
  },
  //remove
  getStartPage2: function (pageRow, totalRow, startPage) {
    let endpage = (totalRow - 1) % pageRow
    let allpage = (totalRow - 1) / pageRow
    return startPage !== 1 && endpage == 0 && allpage == (startPage - 1) ? startPage - 1 : startPage;
  },
  //获取配置文件参数
  getJsonParam(){
    let params = window.sessionStorage.config;
    let goLogin = ()=>{
      Modal.warning({
        title: '登录状态过期，请重新登录!',
        okText:'重新登录',
        className:'login-again',
        onOk(){
          window.sessionStorage.clear();
          window.location.href = '/index.html';
        }
      });
    }
    try {
      params = JSON.parse(params);
    }catch (err){
      goLogin();
      return;
    }
    if(!params){
      goLogin();
      return;
    }
    return params;
  },
  getOriginUrl(){
    let param = this.getJsonParam();
    if(param){
      return param['ChaChongManagerUrl'];
    }
  },
  filter: function (objList, filterValue) {
    if (filterValue === null || typeof (filterValue) === 'undefined' || filterValue === '') {
      return objList;
    }
    var rs = [];
    objList.map((node, i) => {
      if (this.isMatched(node, filterValue)) {
        rs.push(node);
      }
    });

    return rs;
  },
  //获取菜单信息
  getMenuList: function () {
    let loginData = this.getLoginData(),
        menuList = [];
    if (loginData) {
      menuList = loginData.userInfo.menus;
    }
    return menuList;
  },
  //获取通过校验的路由
  getFilterList: function (arr) {
    return arr;
    // let reData = [], menuLists = this.getMenuList();
    // if (menuLists) {
    //   let menuArr = menuLists.map(item => item.path);
    //   arr.map(item => {
    //     let f = false;
    //     for (let i = 0; i < menuArr.length; i++) {
    //       let path = item.path || item.to;
    //       if (menuArr[i].indexOf(path) !== -1) {
    //         f = true;
    //         break;
    //       }
    //     }
    //     if (f) {
    //       reData.push(item)
    //     }
    //   })
    // }
    // return reData;
  },
  //获取登录者的信息
  getUserInfo: function () {
    let loginData = this.getLoginData(),
        userInfo;
    if (loginData) {
      userInfo = loginData.userInfo;
    }
    return userInfo;
  },
  //获取登录者的类型
  getUserType: function () {
    let loginData = this.getLoginData(),
        userType = '';
    if (loginData) {
      userType = loginData.userInfo.userType;
    }
    return userType;
  },
  // 邮箱服务器
  eMailList: ['icerno.com', 'opssino.com', 'gmail.com', '163.com', 'qq.com', 'sina.com', 'sina.com.cn'],
  // 显示菜单，false=快速表单，不需要显示外框
  isShowMenu: true,
  // app login 跳转的页面
  appHomePage: '',
  initConf: function (conf) {
    for (let name in conf) {
      try {
        this[name] = conf[name];
      } catch (E) {
      }
    }
  },
  
  // required，max,min,dataType,pattern,patternPrompt,validator
  check: function (rule, value, page) {
    var isEmpty = (value === '' || value === null || typeof (value) === "undefined");
    
    let specialChar = /[/*`~!@#$%^&*()_+<>?:|?<>"{},.\/\\;'[\]]/im;
    
    //先校验是否有自己写的
    if (rule.validator) {
      var msg = rule.validator(value, rule, page);
      if (msg !== '' && msg !== null && typeof (msg) !== "undefined") {
        return msg;
      }
    }
    if (rule.required === true) {
        //用于选择框非空提示
        if( isEmpty && rule.select){
            return '请选择【' + rule.desc + '】';
        }
        if (isEmpty) {
            return '请输入【' + rule.desc + '】';
        }
    }
    
    if (specialChar.test(value) && !rule.allowSpecialChar) {
      return '不能输入特殊符号';
    }
    
    if (isEmpty) {
      return '';
    }
    
    if (rule.max > 0) {
      if (rule.dataType === 'number') {
        if (parseInt(value) > parseInt(rule.max)) {
          return '【' + rule.desc + '】最大输入【' + rule.max + '】';
        }
      }
      if (value.length > rule.max) {
        return '【' + rule.desc + '】最多输入【' + rule.max + '】个字符';
      }
    }
    
    if (rule.min > 0) {
      if (value.length < rule.min) {
        return '【' + rule.desc + '】至少输入【' + rule.min + '】个字符';
      }
    }
    
    if (rule.dataType !== '' && rule.dataType !== null && typeof (rule.dataType) !== "undefined") {
      var msg = _checkDataType(value, rule.dataType);
      if (msg !== '' && msg !== null && typeof (msg) !== "undefined") {
        return msg;
      }
    }
    
    if (rule.pattern !== null && typeof (rule.pattern) !== "undefined") {
      if (rule.pattern.test(value) == false) {
        if (rule.patternPrompt === '' || rule.patternPrompt === null || typeof (rule.patternPrompt) === "undefined") {
          return "请输入正确的内容!";
        }
        else {
          return rule.patternPrompt;
        }
      }
    }
    return '';
  },
  checkDataType: function (value, dataType) {
    return _checkDataType(value, dataType);
  },
  
  setError: function (page, id, msg) {
    if (msg === '' || msg === null || typeof (msg) === "undefined") {
      page.state.hints[id + 'Status'] = '';
      page.state.hints[id + 'Hint'] = '';
    }
    else {
      page.state.hints[id + 'Status'] = 'error';
      page.state.hints[id + 'Hint'] = <span className='errorHint'>{msg}</span>;
    }
  },
  
  // 检查数据合法性
  validator: function (page, record, id) {
    
    var validRules = page.state.validRules;
    if (validRules.length === 0) {
      return true;
    }
    
    var flag = true;
    if (id === '' || id === null || typeof (id) === "undefined") {
      page.state.hints = {};
      
      validRules.map((rule, i) => {
        var value = record[rule.id];
        if (!rule.whitespace && value != null) {
          value = value.toString().replace(/(^\s*)|(\s*$)/g, "");
          record[rule.id] = value;
        }
        
        var msg = this.check(rule, value, page);
        if (msg !== '') {
          //含有最多这个字段的时候截取字段
          if (msg.indexOf('最多') !== -1 && rule['max']) {
            record[rule.id] = value.substring(0, rule['max'])
          }
          this.setError(page, rule.id, msg);
          // console.log('flag='+flag);
          flag = false;
        }
      });
    }
    else {
      for (var x = validRules.length - 1; x >= 0; x--) {
        var rule = validRules[x];
        if (rule.id === id) {
          var value = record[id];
          var msg = this.check(rule, value, page);
          this.setError(page, id, msg);
          if (msg !== '') {
            flag = false;
            //含有最多这个字段的时候截取字段
            if (msg.indexOf('最多') !== -1 && rule['max']) {
              record[rule.id] = value.substring(0, rule['max'])
            }
          }
          else if (rule.dataType === 'number' && value !== '') {
            record[id] = '' + parseInt(value);
          }
          
          break;
        }
      }
    }
    //强制刷新下
    page.forceUpdate();
    return flag;
  },
  formValidator: function (page, record) {
    var flag = this.validator(page, record);
    if (!flag) {
      var hints = page.state.hints;
      page.setState({
        hints: hints
      });
    }
    
    return flag;
  },
  // 全局通知
  deskMessage: function (content, type, time) {
    let t = time || 6;
    switch (type) {
      case 'info':
        message.info(content, t);
        break;
      case 'success':
        message.success(content, t);
        break;
      case 'error':
        message.error(content, t);
        break;
      case 'warning':
        message.warning(content, t);
        break;
      default:
        message.info(content, t);
        break;
    }
  },
  
  // 格式化日期用于显示
  formatDate: function (value, dateFormat) {
    if (value === null || value === '' || typeof (value) === 'undefined') return '';
    
    var reg = /^[1-2]\d{6,7}$/;
    if (!reg.test(value)) return value;
    
    var yyyy = value.substr(0, 4);
    var mm = value.substr(4, 2);
    var dd = value.substr(6, 2);
    if (dd.length == 1) dd = '0' + dd;
    var mon = monthList[parseInt('1' + mm) - 101];
    
    var mask = dateFormat;
    mask = mask.replace(/YYYY/g, yyyy);
    mask = mask.replace(/YY/g, yyyy.substring(2));
    mask = mask.replace(/MM/g, mm);
    mask = mask.replace(/MON/g, mon);
    mask = mask.replace(/DD/g, dd);
    
    return mask;
  },
  formatMonth: function (value, monthFormat) {
    if (value === null || value === '' || typeof (value) === 'undefined') return '';
    
    var reg = /^[1-2]\d{5}$/;
    if (!reg.test(value)) return value;
    
    var yyyy = value.substr(0, 4);
    var mm = value.substr(4, 2);
    var mon = monthList[parseInt('1' + mm) - 101];
    
    var mask = monthFormat;
    mask = mask.replace(/YYYY/g, yyyy);
    mask = mask.replace(/YY/g, yyyy.substring(2));
    mask = mask.replace(/MM/g, mm);
    mask = mask.replace(/MON/g, mon);
    
    return mask;
  },
  formatTime: function (value, dateFormat) {
    if (value === null || value === '' || typeof (value) === 'undefined' || value.length !== 6) return '';
    
    var hh = value.substr(0, 2);
    var mm = value.substr(2, 2);
    var ss = value.substr(4, 2);
    
    var mask = dateFormat;
    mask = mask.replace(/hh/g, hh);
    mask = mask.replace(/mm/g, mm);
    mask = mask.replace(/ss/g, ss);
    
    return mask;
  },
  /*
   * Take a string and return the hex representation of its MD5.
   */
  calcMD5: function (str) {
    var x = str2blks_MD5(str);
    
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    
    var i;
    for (i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      
      a = __ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = __ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = __ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = __ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = __ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = __ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = __ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = __ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = __ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = __ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = __ff(c, d, a, b, x[i + 10], 17, -42063);
      b = __ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = __ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = __ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = __ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = __ff(b, c, d, a, x[i + 15], 22, 1236535329);
      
      a = __gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = __gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = __gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = __gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = __gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = __gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = __gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = __gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = __gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = __gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = __gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = __gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = __gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = __gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = __gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = __gg(b, c, d, a, x[i + 12], 20, -1926607734);
      
      a = __hh(a, b, c, d, x[i + 5], 4, -378558);
      d = __hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = __hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = __hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = __hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = __hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = __hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = __hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = __hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = __hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = __hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = __hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = __hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = __hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = __hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = __hh(b, c, d, a, x[i + 2], 23, -995338651);
      
      a = __ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = __ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = __ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = __ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = __ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = __ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = __ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = __ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = __ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = __ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = __ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = __ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = __ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = __ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = __ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = __ii(b, c, d, a, x[i + 9], 21, -343485551);
      
      a = __add(a, olda);
      b = __add(b, oldb);
      c = __add(c, oldc);
      d = __add(d, oldd);
    }
    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
  },
  
  // 提示信息
  infoMsg: function (content) {
    Modal.info({
      title: '提示',
      content: content,
    });
  },
  succMsg: function (content) {
    Modal.success({
      title: '成功',
      content: content,
    });
  },
  errMsg: function (content) {
    Modal.error({
      title: '错误',
      content: content,
    });
  },
  warnMsg: function (content) {
    Modal.warning({
      title: '警告',
      content: content,
    });
  },
  // PUBLIC ICON
  iconAdd: 'plus',
  iconRefresh: 'reload',//刷新
  iconBack: 'rollback',//返回
  iconUpdate: 'edit',//编辑
  iconRemove: 'delete',//删除
  iconUser: 'user',//用户
  iconAddChild: 'folder-add',//文件新增
  iconDetail: 'bars',//详情
  iconSearch: 'search',//搜索
  iconReset:'sync',//重置参数
  iconExport:'export',//导出
  iconImport:'upload',//导入
  iconDownload:'download',//下载
};


/* MD5 begin */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
function rhex(num) {
  var j;
  var str = '';
  var md5_hex_chr = '0123456789ABCDEF';
  for (j = 0; j <= 3; j++)
    str += md5_hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
        md5_hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str) {
  var i;
  var nblk = ((str.length + 8) >> 6) + 1;
  var blks = new Array(nblk * 16);
  for (i = 0; i < nblk * 16; i++) blks[i] = 0;
  for (i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function __add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function __cmn(q, a, b, x, s, t) {
  return __add(rol(__add(__add(a, q), __add(x, t)), s), b);
}

function __ff(a, b, c, d, x, s, t) {
  return __cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function __gg(a, b, c, d, x, s, t) {
  return __cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function __hh(a, b, c, d, x, s, t) {
  return __cmn(b ^ c ^ d, a, b, x, s, t);
}

function __ii(a, b, c, d, x, s, t) {
  return __cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/* MD5 end */

// 校验规则
function FormVerifyFun() {
  // 1 代表 2009-09-30 , 2 代表 2009/09/30 , 3 代表 20090930 , 4 代表 2009年09月30日
  this.regDate3 = /^[1-2]\d{6,7}$/;
  this.regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  this.regPhone = /^((\(\d{1,5}\))|(\d{1,5}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,5})?$/;
  this.regPhones = /^(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,5})?([,|;](\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,5})?)*$/;
  this.regMobile = /^((\(\d{3}\))|(\d{3}\-))?1[345789]\d{9}$/;
  this.regUrl = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;	//';
  this.className = /^([_a-z0-9]+\.)*[A-Z][_A-Za-z0-9]+$/;
  this.regIdCard15 = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
  this.regIdCard18 = /^\d{17}(?:\d|x|X)$/;
  this.regMoney = /^[-\+]?\d+(\.\d{0,2})?$/;
  this.regNumber = /^\d+$/;
  this.regZip = /^[0-9]\d{5}$/;
  this.regQQ = /^[1-9]\d{3,9}$/;
  this.regInteger = /^[-\+]?\d+$/;
  this.regDouble = /^[-\+]?\d+(\.\d+)?$/;
  this.regEnglish = /^[A-Za-z]+$/;
  this.regEnglish2 = /^[A-Za-z\s]+$/;
  this.regChinese = /^[\u0391-\uFFE5]+$/;
  this.regUnSafe = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;	//';
  this.regNotChar = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/;
  this.regChar = /[(\/)(\\)(')(")(<)(>)]/g;		//';
  this.regPsw = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/;//6~16位字母、数字、特殊字符至少二者组合
}

var FormVerify = new FormVerifyFun();

// 有效性函数
// isValid=检查数据有效性
// checkValid=检查数据是否越界
var _isValidMethod = [
  {
    type: 'int',
    isValid: function (str) {
      if (FormVerify.regInteger.test(str) == false) return '请输入整数!';
    }
  },
  {
    type: 'double',
    isValid: function (str) {
      if (FormVerify.regDouble.test(str) == false) return '请输入Double数据，比如：55.069!';
    }
  },
  {
    type: 'money',
    isValid: function (str) {
      if (FormVerify.regMoney.test(str) == false) return '请输入金额，比如：2355.00!';
    }
  },
  {
    type: 'email',
    isValid: function (str) {
      if (FormVerify.regEmail.test(str) == false) return '请输入电子邮件地址!';
    }
  },
  {
    type: 'idcard',
    isValid: isIdCard
  },
  {
    type: 'idcard18',
    isValid: isIdCard
  },
  {
    type: 'phone',
    isValid: function (str) {
      if (FormVerify.regPhone.test(str) == false) return '请输入电话号码!';
    }
  },
  {
    type: 'phones',
    isValid: function (str) {
      if (FormVerify.regPhones.test(str) == false) return '请输入电话号码，[,]分割!';
    }
  },
  {
    type: 'mobile',
    isValid: function (str) {
      if (FormVerify.regMobile.test(str) == false) return '请输入手机号码!';
    }
  },
  {
    type: 'zip',
    isValid: function (str) {
      if (FormVerify.regZip.test(str) == false) return '请输入六位数字的邮政编码!';
    }
  },
  {
    type: 'url',
    isValid: function (str) {
      if (FormVerify.regUrl.test(str.toLowerCase()) == false) return '请输入HTTP地址!';
    }
  },
  {
    type: 'classname',
    isValid: function (str) {
      if (FormVerify.className.test(str) == false) return '请输入有效的类名称!';
    }
  },
  {
    type: 'qq',
    isValid: function (str) {
      if (FormVerify.regQQ.test(str) == false) return '请输入QQ号!';
    }
  },
  {
    type: 'number',
    isValid: function (str) {
      if (FormVerify.regNumber.test(str) == false) return '请输入数字!';
    }
  },
  {
    type: '汉字',
    isValid: function (str) {
      if (FormVerify.regChinese.test(str) == false) return '请输入汉字!';
    }
  },
  {
    type: '字母',
    isValid: function (str) {
      if (FormVerify.regEnglish2.test(str) == false) return '请输入字母或空格!';
    }
  },
  {
    type: 'passwd',
    isValid: function (str) {
      if (FormVerify.regPsw.test(str) == false) return '请输入6~16位字母、数字二者组合!';
    }
  }
];

// 检查日期中年月日的合法性
function checkYearMonthDay(years, months, days) {
  var reg = /^\d+$/;
  
  //处理年
  if (years.length != 4 || years == 0) return false;
  if (!reg.test(years)) return false;
  
  var leapyear = ((parseInt(years) % 4 == 0 && parseInt(years) % 100 != 0) || parseInt(years) % 400 == 0);
  
  //处理月
  if (!months || months == 0) return false;
  if (!reg.test(months)) return false;
  var mon = parseInt(months, 10);
  if (mon > 12) return false;
  
  //处理日
  if (!days || days == 0) return false;
  if (!reg.test(days)) return false;
  
  var mdays = [29, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (mon == 2 && leapyear) mon = 0;
  if (days > mdays[mon]) return false;
  
  return true;
}

// 检查是否是合法日期格式
function isValidDate(str, dateType) {
  if (str.length != dateType.length) {
    return '请按格式【' + dateType + '】输入日期';
  }
  
  var y = '';
  var m = '';
  var d = '';
  var values = str.split('');
  var types = dateType.split('');
  var len = values.length;
  for (var i = 0; i < len; i++) {
    if (types[i] === 'y') {
      y = y + values[i];
    }
    else if (types[i] === 'm') {
      m = m + values[i];
    }
    else if (types[i] === 'd') {
      d = d + values[i];
    }
    else if (types[i] !== values[i]) {
      return '请按格式【' + dateType + '】输入日期';
    }
  }
  
  if (checkYearMonthDay(y, m, d) == false) {
    return '请输入正确的日期!';
  }
  
  return '';
}

// 检测身份证号码输入的合法性	15位或者18位的数字
function isIdCard(str) {
  var reg = (str.length == 18) ? FormVerify.regIdCard18 : FormVerify.regIdCard15;
  if (reg.test(str) == false) {
    return '请输入有效的身份证号码!';
  }
  
  // 日期
  var y = '';
  var m = '';
  var d = '';
  if (str.length == 18) {
    y = str.substr(6, 4);
    m = str.substr(10, 2);
    d = str.substr(12, 2);
  } else if (str.length == 15) {
    y = '19' + str.substr(6, 2);
    m = str.substr(8, 2);
    d = str.substr(10, 2);
  }
  
  if (checkYearMonthDay(y, m, d) == false) {
    return '日期的取值范围不正确!';
  }
  
  // 强制检查身份证的校验位
  var checkValue = strictCheckIdcard(str);
  if (checkValue != null) {
    return '请输入有效的身份证号码!';
  }
}

// 严格检查身份证的有效性
function strictCheckIdcard(id) {
  // 只检查18位身份证
  if (id.length != 18) {
    return null;
  }
  
  var checkValue = getIdCheckNumber(id);
  var iv = id.substring(17).toUpperCase();
  if (checkValue != iv) {
    return checkValue;
  }
  
  return null;
}

function getIdCheckNumber(id) {
  var arrVerifyCode = '1,0,X,9,8,7,6,5,4,3,2'.split(',');
  var wi = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2'.split(',');
  
  var checkNumber = 0;
  for (var i = 0; i < 17; i++) {
    checkNumber = checkNumber + parseInt(id.substring(i, i + 1)) * wi[i];
  }
  
  var modValue = checkNumber % 11;
  var checkValue = arrVerifyCode[modValue];
  
  return checkValue;
}

// 检查域的有效性
function _checkDataType(str, dataType) {
  // 检查日期
  if (dataType.length > 6) {
    var tt = dataType.substr(0, 5);
    if (tt === 'date:' || tt === 'date：') {
      var tt2 = dataType.substr(5);
      return isValidDate(str, tt2);
    }
  }
  
  if (dataType === 'idcard18') {
    if (str.length !== 18) {
      return '请输入18位身份证号码';
    }
  }
  else if (dataType === 'idcard') {
    if (str.length !== 18 && str.length !== 15) {
      return '请输入身份证号码';
    }
  }
  
  for (var x = _isValidMethod.length - 1; x >= 0; x--) {
    var c = _isValidMethod[x];
    if (c.type == dataType) {
      return c.isValid(str);
    }
  }
  
  return '未知的数据类型[' + dataType + ']';
}

// 农历
var lunarInfo = new Array(
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63);

//====================================== 传回农历 y年的总天数
function lYearDays(y) {
  var i, sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
  return (sum + leapDays(y));
}

//====================================== 传回农历 y年闰月的天数
function leapDays(y) {
  if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
  else return (0);
}

//====================================== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
  return (lunarInfo[y - 1900] & 0xf);
}

//====================================== 传回农历 y年m月的总天数
function monthDays(y, m) {
  return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

//====================================== 算出农历, 传入日期, 传回农历日期
//  .year .month .day .isLeap .yearCyl .dayCyl .monCyl
function Lunar(y, m, d) {
  var i, leap = 0, temp = 0;
  var offset = (Date.UTC(y, m, d) - Date.UTC(1900, 0, 31)) / 86400000;
  
  this.dayCyl = offset + 40;
  this.monCyl = 14;
  
  for (i = 1900; i < 2050 && offset > 0; i++) {
    temp = lYearDays(i);
    offset -= temp;
    this.monCyl += 12;
  }
  
  if (offset < 0) {
    offset += temp;
    i--;
    this.monCyl -= 12;
  }
  
  this.year = i;
  this.yearCyl = i - 1864;
  
  leap = leapMonth(i); //闰哪个月
  this.isLeap = false;
  
  for (i = 1; i < 13 && offset > 0; i++) {
    //闰月
    if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
      --i;
      this.isLeap = true;
      temp = leapDays(this.year);
    }
    else {
      temp = monthDays(this.year, i);
    }
    
    //解除闰月
    if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;
    
    offset -= temp;
    if (this.isLeap == false) this.monCyl++;
  }
  
  if (offset == 0 && leap > 0 && i == leap + 1)
    if (this.isLeap) {
      this.isLeap = false;
    }
    else {
      this.isLeap = true;
      --i;
      --this.monCyl;
    }
  
  if (offset < 0) {
    offset += temp;
    --i;
    --this.monCyl;
  }
  
  this.month = i;
  this.day = offset + 1;
}
