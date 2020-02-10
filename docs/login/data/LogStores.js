let Reflux = require('reflux');
let LogActions = require('../action/LogActions');
import Utils from '../../public/script/utils';
import common from '../../public/script/common';

let LogStore = Reflux.createStore({
  listenables: [LogActions],
  init: function () {
  },
  recordSet: [],
  checkVercode: null,
  getServiceUrl: function (action) {
    let param = common.getJsonParam();
    // let a=common.getOriginUrl()+action;
    let a2 = param['ChaChongAutherUrl'] + action;
    return a2;
  },
  onLogin(data) {
    let $this = this,
      url = this.getServiceUrl('auth/manager-login');
    Utils.loginService(url, data).then(
      (result) => {
        if ($this.resuleReturn(result.errCode)) {
          $this.recordSet = result.object;
          $this.fireEvent('login', '', $this);
        }
        else {
          $this.fireEvent('login', result.errDesc, $this);
        }
      },
      () => {
        $this.fireEvent('login', '调用服务错误', $this);
      }
    );
  },

  onLogout(data) {
    let $this = this,
      url = this.getServiceUrl('auth/logout');
    Utils.doAjaxService(url).then((result) => {
      if ($this.resuleReturn(result.errCode)) {
        $this.fireEvent('logout', '', $this);
      }
      else {
        $this.fireEvent('logout', `${result.errDesc}`, $this);
      }
    },
      (err) => {
        $this.fireEvent('logout', '调用服务错误', $this);
      }
    );
  },
  fireEvent: function (operation, errMsg, $this) {
    $this.trigger({
      operation: operation,
      recordSet: $this.recordSet,
      errMsg: errMsg,
      checkVercode: $this.checkVercode
    });
  },
  resuleReturn(errCode) {
    if (errCode === null || errCode === '' || errCode === '000000') {
      return true;
    } else {
      return false;
    }
  }
});

module.exports = LogStore;
