let $ = require('jquery');
import React from 'react';
import {withRouter,browserHistory} from 'react-router';
import {Form, Button, Input, Icon, Checkbox, Col, Row, Spin,message,Alert} from 'antd';
import './style/login_main.scss';
import LogActions from './action/LogActions';
import LogStores from './data/LogStores';
import logoImg from './style/logo-img.png';
let Common = require('../public/script/common');
let LoginUtil = require('./LoginUtil');
let FormDef = require('./Components/LoginForm');

class LoginPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: '',
        passwd: ''
      },
      loading: false,
      errMsg: '',
      hints: {},
      action: 'login',
      validRules: [],
      slideEnd: false,
      userEmpty: false,
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
          state: {from: 'login'}
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
    message.config({
      getContainer:()=>document.getElementById('lz-login-message'),
    });
    let attr = [
      {
        name: 'userName',
        validator:this.checkContent
      },
      {
        name: 'passwd',
        validator:this.checkContent
      }
    ];
    let self = this;
    LoginUtil.downConfig(this).then((result) => {}, (value) => {
      Common.errMsg('加载配置文件错误');
    });
    this.state.validRules = FormDef.getFormRule(this,attr);
    this.clear();
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

  checkContent=(value, rule, page)=>{
    var isEmpty = (value === '' || value === null || typeof (value) === "undefined");
    if(!isEmpty){
      if(rule.ownMin > 0){
        if(value.length<rule.ownMin){
          return `${rule.desc}至少输入${rule.ownMin}个字符`;
        }
      }
      if(rule.ownMax > 0){
        if(value.length>rule.ownMax){
          return `${rule.desc}最多输入${rule.ownMax}个字符`;
        }
      }
    }
  }

  clear=()=>{
    FormDef.initForm(this.state.user);
    this.state.hints = {};
    this.setState({loading:false});
  }
  onServiceChange = (data) => {
    console.log(data)
    this.setState({loading: false});
    if (!data.errMsg || data.errMsg == '') {
      if (data.operation === 'login') {
        this.loginSuccess(data.recordSet);
      }
    } else if (data.errMsg && data.operation === 'login') {
      this.setState({ errMsg:data.errMsg });
        this.messageToShowError(data.errMsg);
    }
  };
  
  componentWillUnmount() {
    //解除页面内容绑定
    this.unsubscribe();
    $(document).off('keydown');
  };
  
  showError = (msg) => {
    this.setState({
      errMsg: msg
    });
  };

  messageToShowError=(msg)=>{
    message.destroy()
    message.warning(msg,2);
  }
  
  clickLogin = () => {
    let passwd = this.state.user.passwd;
    let salt = 'icerno.com';
    this.state.errMsg = '';
    if (!Common.formValidator(this, this.state.user)) {
      return;
    }
    let MD5Salt = Common.calcMD5(salt);
    let MD5Passwd = Common.calcMD5(passwd);
    let password = Common.calcMD5(MD5Salt+MD5Passwd);
    let userName = this.state.user.userName;
    if(!this.check(passwd,userName)){
        let loginData = {
            password:password,
            username:userName,
        };
        this.setState({loading: true});
        LogActions.login(loginData);
    }
  };
  check = (passwd,userName) => {
    if(userName===''){
      if(passwd===''){
        this.setState({
          userEmpty:true,
          errMsg:'error'
        });
        this.messageToShowError('账号和密码不能为空');
        return true;
      }else{
        this.setState({
          userEmpty:true,
        });
        this.messageToShowError('账号不能为空');
        return true;
      }
    }else{
      if(passwd===''){
        this.setState({
          errMsg:'error'
        });
        this.messageToShowError('密码不能为空');
        return true;
      }else{
        return false;
      }
    }
  };
  
  loginSuccess = (loginData) => {
    let corpUuid = '';
    LoginUtil.saveLoginData(loginData, corpUuid);
    //刷新界面  去到主页
    window.location.href = '/ChachongManage/baseManage/AppIndexPage';
  };
  
  handleOnChange = (e) => {
    let user = this.state.user;
    let s = e.target.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    user[e.target.id]= s;
    if(!Common.validator(this, user, e.target.id)){
      if(s.length > 20){
        user[e.target.id]= s.substr(0, 20);
      }
    }
    this.setState({
      user: user,
      errMsg: '',
      userEmpty:false,
    });

    if (this.state.errMsg) {
      this.onDismiss();
    }
    if (this.state.userEmpty) {
      this.setState({
        userEmpty: ''
      });
    }
  }
  onDismiss = () => {
    this.setState({
      errMsg: ''
    });
  }
  reqPsd = () => {
    this.setState({action: 'resetpwd'});
  }
  onGoBack = () => {
    this.setState({action: 'login'});
  }
  onTickChange =(e)=> {
    console.log(`checked = ${e.target.checked}`);
  }
  
  render() {
    let layout = 'vertical';
    let items = FormDef.getForm(this, this.state.user, null,Common.modalForm, layout);
    let visible = (this.state.action === 'login') ? '' : 'none';
    let contactTable = '';
    if (this.state.action === 'login') {
      contactTable = (
          <div style={{width:"100%",height:"100%"}}>
            <div className='log-wrap-left'>
                <div className="lz-logo">
                  <div className="lz-logo-wrap">
                    <div className="lz-logo-inner">
                      <div className="lz-logo-img">
                        <img src={logoImg} className="img"/>
                      </div>
                      <div className="lz-logo-text"><span className="text-span">C语言程序测试系统</span></div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="log-wrap-right">
                <div className="inner-wrap">
                    <div className="input-wrap">
                      {/* logo */}
                      <div className="lz-logo-all" id="lz-login-message">
                          <div className="log-title">
                            <span className="title-text">登录</span>
                          </div>
                          <div className="title-bottom"></div>
                      </div>
                      
                      <div className="lz-login-input" style={{width: '100%', display: visible, position: 'relative'}}>
                        {/* 登录表单 */}
                        <Form layout={layout}>
                          {items}
                        </Form>
                        {/* 登录按钮 */}
                        <div  className='login-btn-wrap' onClick={this.clickLogin}>
                          <Button type="primary" size="large">登录</Button>
                        </div>
                      </div>
                    </div>
                    {/* 底部标签 */}
                    <div className="foot-wrap">
                       <span>Copyright <i style={{fontFamily:'arial'}}>&copy; </i>2019&nbsp;&nbsp;&nbsp;茶虫链能技术部出品</span>
                    </div>
                </div>
            </div>
          </div>
      )
      ;
    } else if (this.state.action === 'resetpwd') {
      // contactTable = (<ResetPwdPage onGoBack={this.onGoBack}/>);
    }
    
    return (
          <div className='log-wrap'>
            {contactTable}
          </div> 
    );
  }
}

export default withRouter(LoginPage2);
