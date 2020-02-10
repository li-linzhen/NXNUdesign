let $ = require('jquery');
import React from 'react';
import { withRouter, browserHistory } from 'react-router';
import { Form, Button, Input, Icon, Checkbox, Col, Row, Spin, message, Alert } from 'antd';
import './style/login-new.scss';
import LogActions from './action/LogActions';
import LogStores from './data/LogStores';
let Common = require('../public/script/common');
let LoginUtil = require('./LoginUtil');
let FormDef = require('./Components/LoginForm');

class LoginPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        account: '',
        psw: ''
      },
      loading: false,
      errMsg: '',
      action: 'login',
    };
    let loginData = window.sessionStorage.getItem('loginData');
    if (loginData !== null && typeof (loginData) !== 'undefined') {
      let skip = false;
      let loc = this.props.location;
      if (loc !== null && typeof (loc) !== 'undefined') {
        let path = loc.pathname;
        if (path !== '') {
          if (loc.search !== '') {
            skip = true;
          } else if (path !== '/' && path !== '/index.html' && path !== '/test.html' && path !== '/electron.html') {
            skip = true;
          }
        }
      }

      if (skip && LoginUtil.loadContext()) {
        let menus = Common.getMenuList() || [];
        if (!menus.length) {
          message.error('您没有权限登录！');
          window.sessionStorage.removeItem('loginData');
          return;
        }
        let search = this.props.location.search.substring(1);
        if (search.indexOf('href') > -1) {
          search = '/' + search.split('=')[1];//对应404页面的href
        }
        this.props.router.push({
          pathname: search,
          state: { from: 'login' }
        });
      } else {
        let href = window.location.href;
        if (href.indexOf('linkid=') < 0) {
          window.sessionStorage.removeItem('loginData');
        }
      }
    }
  }
  componentDidMount() {
    LoginUtil.downConfig(this).then((result) => { }, (value) => {
      Common.errMsg('加载配置文件错误');
    });
    //监听
    this.unsubscribe = LogStores.listen(this.onServiceChange);
    //绑定 enter
    $(document).on('keydown', (e) => {
      let theEvent = e || window.event;
      let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code === 13) {
        this.clickLogin();
      }
    });
  };
  onServiceChange = (data) => {
    this.loginSuccess(data.recordSet);
    // this.setState({loading: false});
    // if (!data.errMsg) {
    //   if (data.operation === 'login') {
    //     this.loginSuccess(data.recordSet);
    //   }
    // } else if (data.errMsg && data.operation === 'login') {
    //   this.setState({ errMsg:data.errMsg });
    // }
  };

  componentWillUnmount() {
    //解除页面内容绑定
    this.unsubscribe();
    $(document).off('keydown');
  };
  clickLogin = () => {
    let formData = this.state.formData;
    let account = formData.account,
      psw = formData.psw;
    if (!account) {
      this.setState({ errMsg: '账号不能为空' });
      return;
    } else if (!psw) {
      this.setState({ errMsg: '密码不能为空' });
      return;
    }
    let MD5Account = Common.calcMD5('icerno.com');
    let MD5Psw = Common.calcMD5(psw);
    let password = Common.calcMD5(MD5Account + MD5Psw);
    let loginData = {
      password: password,
      username: account,
    };
    this.setState({ loading: true });
    LogActions.login(loginData);
  };

  loginSuccess = (loginData) => {
    let corpUuid = '';
    LoginUtil.saveLoginData(loginData, corpUuid);
    //刷新界面  去到主页
    window.location.href = '/ZYC/TestManagePage';
  };

  handleOnChange = (e) => {
    let formData = this.state.formData;
    let value = e.target.value.replace(/^\s\s*/, '');
    formData[e.target.id] = value;
    this.setState({ formData, errMsg: '' });
  }

  render() {
    let loginPage = '';
    let { formData, loading, errMsg } = this.state;
    console.log(formData)
    let errShow = errMsg ? { visibility: 'visible' } : {};
    if (this.state.action === 'login') {
      loginPage = (
        <div className='login-box'>
          <div className='box-right'>
            <div className='login-content'>
              <div className='login-logo'>
                <div className='login-logo-icon' />
                <div className='login-logo-text'>C语言程序测试系统</div>
              </div>
              <div className='login-errmsg' style={errShow}>
                <Icon type="exclamation-circle" className='err-icon' />
                {errMsg}
              </div>
              <div className='login-form'>
                <div style={{ marginTop: 16 }}>
                  <Input
                    placeholder="账号"
                    name='ZYCuser'
                    className='login-input'
                    size='large'
                    id='account'
                    onChange={this.handleOnChange}
                    value={formData.account}
                    maxLength={15}
                    prefix={<Icon type="user" className='login-input-icon' />}
                  />
                </div>
                <div style={{ marginTop: 33 }}>
                  <Input
                    placeholder="密码"
                    name='ZYCpsw'
                    className='login-input'
                    size='large'
                    type='password'
                    id='psw'
                    onChange={this.handleOnChange}
                    value={formData.psw}
                    maxLength={15}
                    prefix={<Icon type="lock" className='login-input-icon' />}
                  />
                </div>
              </div>
              <Button type='primary'
                style={{ width: '100%', marginTop: 53 }}
                size='large'
                onClick={this.clickLogin}
                loading={loading}
              >登录</Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='login-wrap'>
        {loginPage}
      </div>
    );
  }
}

export default withRouter(LoginPage2);
