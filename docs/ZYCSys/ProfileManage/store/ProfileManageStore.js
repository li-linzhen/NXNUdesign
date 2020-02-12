let Reflux = require('reflux')
let ProfileManageActions = require('../action/ProfileManageActions')
let Utils = require('../../../public/script/utils')
import Common from '../../../public/script/common'

let XxxStore = Reflux.createStore({
  listenables: [ProfileManageActions],
  filter: {},
  recordSet: [],
  startPage: 0,
  pageRow: 0,
  totalRow: 0,
  
  getServiceUrl: function (action) {
    return Common.getOriginUrl() + action
  },
  
  fireEvent: function (operation, self, errMsg) {
    self.trigger({
      filter: self.filter,
      recordSet: self.recordSet,
      startPage: self.startPage,
      pageRow: self.pageRow,
      totalRow: self.totalRow,
      operation: operation,
      errMsg: errMsg,
    })
  },
  
  onRetrieveStatistics(filter) {
    let $this = this
    let url = this.getServiceUrl('user/shipperStatistics')
    Utils.doAjaxService(url, filter).then((result) => {
      //成功
      $this.recordSet = result.object || []
      $this.filter = filter
      //执行方法
      $this.fireEvent('retrieveStatistics', $this)
    }, (result = '') => {
      //上面最后一个参数传入true时需要，表明自己处理错误信息   其他时候不需要这个方法   错误公共处理
      // let errMsg = result.errDesc || "错误";
      // $this.fireEvent('retrieve',$this,errMsg);
    })
  },
  onRetrieve: function (filter) {
    let $this = this
    let url = this.getServiceUrl('user/queryShipperList')
    Utils.doRetrieveService(url, filter.object, filter.startPage, filter.pageRow, filter.totalRow).then((result) => {
      //成功
      $this.recordSet = result.object || []
      $this.filter = filter
      //执行方法
      $this.fireEvent('retrieve', $this)
    })
  },
})

module.exports = XxxStore