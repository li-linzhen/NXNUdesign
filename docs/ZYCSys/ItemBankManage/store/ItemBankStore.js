let Reflux = require('reflux')
let ItemBankActions = require('../action/ItemBankActions')
let Utils = require('../../../public/script/utils')
import Common from '../../../public/script/common'

let ItemBankStore = Reflux.createStore({
  listenables: [ItemBankActions],
  filter: {},
  recordSet: [],
  startPage: 0,
  pageRow: 0,
  totalRow: 0,
  
  getServiceUrl: function (action) {
    let param = Common.getJsonParam();
    if(param){
      return param['ZYCIntegrationUrl']+action;
    }
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
  
  onRetrieve: function (filter) {
    let $this = this
    let url = this.getServiceUrl('demo/getDemoList')
    Utils.doRetrieveService(url, filter.object, filter.startPage, filter.pageRow, filter.totalRow).then((result) => {
      //成功
      $this.recordSet = result.object || []
      $this.filter = filter
      //执行方法
      $this.fireEvent('retrieve', $this)
    })
  },
})

module.exports = ItemBankStore