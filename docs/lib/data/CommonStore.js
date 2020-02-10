/**
 *   Create by Malson on 2018/5/3
 */
let Reflux = require('reflux');
let CommonActions = require('../action/CommonActions');
let Utils = require('../../public/script/utils');
let MsgActions = require('../action/MsgActions');
let CommonStore = Reflux.createStore({
  listenables: [CommonActions],
  recordSet: [],
  init: function () {
  },
  fireEvent: function (operation, errMsg, self) {
    self.trigger({
      filter: self.filter,
      recordSet: self.recordSet,
      startPage: self.startPage,
      pageRow: self.pageRow,
      totalRow: self.totalRow,
      operation: operation,
      errMsg: errMsg
    });
    
    MsgActions.showError('organization', operation, errMsg);
  },
  getServiceUrl: function (action) {
    return Utils.HBBManagerUrl + action;
  },
  //获取地址
  onGetAddress: function (organization) {
    var url = this.getServiceUrl('provinceCityRegion/getAllProvinceCityRegion');
    
    var self = this;
    Utils.doCreate(url, organization).then(function (result) {
      // 修改下面的程序
      self.recordSet = [];
      self.recordSet.push(result);
      self.fireEvent('getAddress', '', self);
    }, function (errMsg) {
      self.fireEvent('getAddress', errMsg, self);
    });
  },
});

module.exports = CommonStore;
