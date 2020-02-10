let Reflux = require('reflux')
let XxxActions = require('../action/XxxActions')
let Utils = require('../../../public/script/utils')
import Common from '../../../public/script/common'
const webUrl = '/web_s/';

let XxxStore = Reflux.createStore({
  listenables: [XxxActions],
  filter: {},
  recordSet: [],
  startPage: 0,
  pageRow: 0,
  totalRow: 0,
  
  getServiceUrl: function (action) {
    return webUrl + action
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
  
  onLogin:function(filter) {

    let url = this.getServiceUrl('buildingmaterials_user/create');
    Utils.doAjaxService(url,filter).then((result) => {
      console.log(1)
      console.log(result)
      this.fireEvent('login', '', this)
    }, err => {
      this.fireEvent('login', err.message, this)
    })
  }
})

module.exports = XxxStore