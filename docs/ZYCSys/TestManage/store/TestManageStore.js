import Reflux from 'reflux';
import TestManageActions from '../action/TestManageActions'
import Utils from '../../../public/script/utils'
import Common from '../../../public/script/common'
import axios from 'axios';


const TestManageStore = Reflux.createStore({
  listenables: [TestManageActions],
  data: [],
  joke:[],



  getServiceUrl: function (action = '') {
    return `https://autumnfish.cn/api` + action
  },

  fireEvent: function (operation, errMsg,self) {
    self.trigger({
      jokes:self.jokes,
      data: self.data,
      operation: operation,
      errMsg: errMsg
    })

  },

  onFetchData: function () {
    axios.get('https://autumnfish.cn/api/joke/list?num=1')
    .then( response =>{
      console.log(response);
      this.jokes=response.data.jokes;

      this.fireEvent('fetchData','',this)

    })
    .catch(function (err) {
      this.fireEvent('fetchCustomerList', err.message, this)
    });
  }
})

export default TestManageStore
