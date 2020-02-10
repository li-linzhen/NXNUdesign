/* eslint-disable */

'use strict';
var $ = require('jquery');

var Common = require('../public/script/common');
var Utils = require('../public/script/utils');

module.exports = {
  loadContext: function () {
    // session内转移
    let loginData = window.sessionStorage.getItem('loginData');
    let config = window.sessionStorage.getItem('config');
    if (loginData && config) {
      window.config = JSON.parse(config);
      window.loginData = JSON.parse(loginData);
      return true;
    }
    return false;
  },
  
  downConfig: function (loginPage) {
    var self = loginPage;
    var file = '/config.json';
    var promise = new Promise(function (resolve, reject) {
      self.setState({loading: true});
      let config = window.sessionStorage.config;
      if(config){resolve();}
      $.getJSON(file, function (response, status) {
        if (status === 'success') {
          window.config = response;
          window.sessionStorage.config = JSON.stringify(response)
          resolve(response);
          self.setState({loading: false});
        }
        else {
          reject(response);
        }
      })
    });
    return promise;
  },
  
  getHrefData: function () {
    var href = window.location.href;
    // console.log('href', href)
    var pos = href.indexOf('?href=');
    if (pos < 0) {
      return {linkid: null};
    }
    
    var page = href.substr(pos + 6);
    pos = page.indexOf('?linkid=');
    if (pos < 0) {
      return {linkid: null};
    }
    
    var param = page.substr(pos + 8);
    page = page.substr(0, pos);
    pos = param.indexOf('&');
    var linkid = null;
    
    if (pos >= 0) {
      linkid = param.substr(0, pos);
      param = param.substr(1 + pos);
    }
    else {
      linkid = param;
      param = null;
    }
    
    if (page.charAt(0) !== '/') {
      page = '/' + page;
    }
    
    return {page: page, linkid: linkid, param: param};
  },
  
  // 检查是否安全导航
  isSafetyLogin: function (loginPage) {
    var data = this.getHrefData();
    if (!data.linkid) {
      return false;
    }
    
    loginPage.onSafetyNavi(null);
    return true;
  },
  
  safeNavi: function (loginPage, loginData) {
    var data = this.getHrefData();
    if (!data.linkid) {
      return false;
    }
    
    // 导航
    // console.log('data', data)
    Common.isShowMenu = false;
    loginPage.props.router.push({
      pathname: '/safe' + data.page,
      state: {from: 'safe'}
    });
  },
  
  saveLoginData: function (loginData, corpUuid) {
    try {
      window.loginData = loginData;
      window.sessionStorage.setItem('loginData', JSON.stringify(loginData));
      window.sessionStorage.setItem('TOKEN',loginData.jwt);
    }
    catch (err) {
    }
  }
  
}
