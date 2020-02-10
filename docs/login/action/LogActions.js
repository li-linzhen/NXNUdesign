/**
 *   Create by Malson on 2018/3/12
 */
let Reflux = require('reflux');

let LogActions = Reflux.createActions([
  'login',
  // 'forgetPsw',
  // 'forgetPswSendMail',
  // 'checkVerCode',
  'logout',
  'testlogin'
]);

module.exports = LogActions;
