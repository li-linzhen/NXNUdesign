/**
 *   Create by Malson on 2018/5/3
 */
var Reflux = require('reflux');

var MsgActions = Reflux.createActions([
    'getAddress',
    'retrieveOperateLogPage',
    'getBuildingByPark',
    'getFloorByBuilding',
    'getCellByFloor'
]);

module.exports = MsgActions;
