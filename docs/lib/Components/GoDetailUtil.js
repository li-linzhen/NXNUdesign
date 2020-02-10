'use strict';;
import { browserHistory } from 'react-router'

module.exports = {
	goVipDetail: function (id) {
		browserHistory.push({
			pathname: '/ZYC/VipManagePage/VipDetail',
			state: { id: id }
		});
	},
	goTestDetail: function () {
		browserHistory.push({
			pathname: '/ZYC/TestManagePage/TestDetail',
		});
	},
};
