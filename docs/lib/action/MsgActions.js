var Reflux = require('reflux');

var MsgActions = Reflux.createActions([
    {
        showError: {
            sync: true
        }
    }
]);

module.exports = MsgActions;
