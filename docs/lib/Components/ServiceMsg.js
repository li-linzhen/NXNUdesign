import React from 'react';
class ServiceMsg extends React.Component {
  state = {
    svcMsg: {
      resName: '',
      operation: '',
      errMsg: ''
    },
    hints: []
  };
  // mixins: [Reflux.listenTo(MsgStore, 'onServiceComplete')],
  onServiceComplete = (data) => {
    if (data.errMsg.indexOf('[AUTH09]') >= 0) {
      // 超时，重新登入
      window.sessionStorage.removeItem('loginData');
    }
    
    // 为了计算错误组件的高度，原来在render里计算
    if (data.operation !== null && data.operation !== '') {
      var name = data.resName + '/' + data.operation;
      var len = this.props.svcList.length;
      for (var i = 0; i < len; i++) {
        if (this.props.svcList[i] === name) {
          this.state.hints[i] = data.errMsg;
          break;
        }
      }
    }
    // console.log(this.props.svcList, this.state.hints)
    this.setState({
      svcMsg: null
    });
  }
  
  componentDidMount() {
    this.clear();
  }
  
  clear = () => {
    this.state.hints = [];
    var len = this.props.svcList.length;
    for (var i = 0; i < len; i++) {
      this.state.hints.push('');
    }
  }
  showError = (errMsg) => {
    
    var hints = this.state.hints;
    var len = hints.length;
    if (len > 0) {
      hints[0] = errMsg;
    }
    
    this.setState({
      hints: hints
    });
  }
  onClose = () => {
    var hints = this.state.hints;
    var len = hints.length;
    for (var i = 0; i < len; i++) {
      hints[i] = '';
    }
    
    this.setState({
      hints: hints
    });
  }
  render() {
    var svcMsg = this.state.svcMsg;
    if (svcMsg != null && svcMsg.operation !== null && svcMsg.operation !== '') {
      var name = svcMsg.resName + '/' + svcMsg.operation;
      var len = this.props.svcList.length;
      for (var i = 0; i < len; i++) {
        if (this.props.svcList[i] === name) {
          this.state.hints[i] = svcMsg.errMsg;
          break;
        }
      }
      
      this.state.svcMsg = null;
    }
    
    var message = '';
    var len = this.state.hints.length;
    for (var i = 0; i < len; i++) {
      message = this.state.hints[i];
      if (message !== null && message !== '') {
        break;
      }
    }
    
    if (message === '') {
      return null;
    }
    
    return (
        <div data-show="true" className="ant-alert ant-alert-error" style={{textAlign: 'left'}}>
          <i className="anticon anticon-cross-circle ant-alert-icon"></i>
          <span className="ant-alert-message">{message}</span>
          <span className="ant-alert-description"></span>
          <a className="ant-alert-close-icon" onClick={this.onClose}><i className="anticon anticon-cross"></i></a>
        </div>
    );
  }
}

// ServiceMsg.propTypes = propTypes;
export default ServiceMsg

