import React from 'react';
import {browserHistory} from 'react-router';
import {Layout, Menu, Icon, Dropdown, Button, Modal, Form, Input, Alert, message} from 'antd';
import LogActions from '../../login/action/LogActions';
import LogStores from '../../login/data/LogStores';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const {Header, Content} = Layout;

let LoginUtil = require('../../login/LoginUtil');
let Reflux = require('reflux');
let Utils = require('../../public/script/utils');
let Common = require('../../public/script/common');
let loginData = Common.getLoginData();


class TopBar extends React.Component {
  state = {
    activeNode: null,
    menuFile: null,
    accountVisible: false,
    changePsw: false,
    form: {
      oldPsw: '',
      newPsw: '',
      confirmPsw: ''
    },
    errorMsg: '',
    hints: {},
    validRules: [],
    selectPark: {
      uuid: '',
      parkName: ''
    }
  };
  onServiceComplete = (data)=> {
    if (data.operation === 'updatePwd') {
      if (data.errMsg) {
        this.setState({errorMsg: data.errMsg});
        return;
      } else {
        message.success('密码修改成功！');
        this.hideModalPsw();
        this.formClear();
        window.sessionStorage.removeItem('loginData');
        Utils.showPage('/index.html');
      }
    } else if (data.operation === 'logout') {
      if (data.errMsg) {
        this.setState({errorMsg: data.errMsg});
        return;
      } else {
        window.sessionStorage.removeItem('loginData');
        window.sessionStorage.removeItem('selectedParkUuid');
        window.sessionStorage.removeItem('selectParkData');
        Utils.showPage('/index.html');
      }
    }
  };
  componentDidMount() {
  };
  componentWillUnmount () {}
  goHome = (e)=> {
    let url = '/HBBManager/desk/';
    if (window.location.href !== url) {
      browserHistory.push({
        pathname: url
      });
    }
  };
  handleMenuClick = (e)=> {
    Common.activePage = null;
    
    if (e.key === '1') {
      // 改密
      browserHistory.push({
        pathname: '/main/passwd/'
      });
    } else if (e.key === '2') {
      // 签退
      //调用后台接口
      LogActions.logout('');
      window.sessionStorage.removeItem('loginData');
      Utils.showPage('/index.html');
    } else if (e.key === '103') {
      // 菜单文件
      let str = JSON.stringify(this.props.navItems, null, 4);
      this.setState({menuFile: str});
    } else if (e.key === '3') {
    } else if (e.key === '4') {
      let key = '/HBBManager/systemSetManage/OpenParkManagePage/', obj = {key};
      this.handleClick(obj);
    } else {
      // console.log('handleMenuClick', e);
    }
  };
  handleClick = (e)=> {
    this.setState({menuFile: null, activeNode: e.key});
    
    let len = this.props.navItems.length;
    for (let i = 0; i < len; i++) {
      let item = this.props.navItems[i];
      if (item.to === e.key) {
        if (item.onClick) {
          item.onClick();
          return;
        }
      }
    }
    
    let url = e.key;
    let param = '';
    let pos = url.indexOf('?');
    if (pos > 0) {
      param = url.substring(1 + pos);
      url = url.substring(0, pos);
    }
    
    let pr = {};
    if (param !== '') {
      let values = param.split('&');
      values.map((str, i) => {
        pos = str.indexOf('=');
        if (pos > 0) {
          let name = str.substring(0, pos);
          let value = str.substring(1 + pos);
          pr[name] = value;
        }
      });
    }
    browserHistory.push({
      pathname: url,
      query: pr
    });
  }
  hideModalPsw = ()=> {
    this.setState({changePsw: false, hints: {}});
  };
  handleChangePsw = ()=> {
    this.setState({accountVisible: false, changePsw: true,});
    this.formClear();
  };
  formClear = ()=> {
    let form = Object.assign({}, this.state.form, {oldPsw: '', newPsw: '', confirmPsw: ''});
    this.setState({form});
  };
  handleOnChange = (e)=>{
    let id = e.target.id, form = this.state.form,
        val = e.target.value.replace(/\s+/g, "");
    form[id] = val;
    Common.validator(this, form, e.target.id);
    this.setState({form, errorMsg: ''});
  };
  errorMsg = ()=>  {
    this.setState({errorMsg: ''});
  };
  changePswOk = ()=>{
    this.setState({errorMsg: ''});
    if (Common.validator(this, this.state.form)) {
      let obj = this.state.form;
      if (obj.confirmPsw !== obj.newPsw) {
        this.setState({errorMsg: '两次输入密码不一样'});
        return;
      }
      if (obj.newPsw === obj.oldPsw) {
        Common.infoMsg('建议新旧密码不一样！');
        return;
      }
      let sendObj = {
        type: "2",
        pwd: Common.calcMD5(obj.oldPsw),
        newPwd: Common.calcMD5(obj.newPsw),
        phone: loginData.staffInfo.phone
      };
      LogActions.forgetPsw(sendObj)
    }
  };
  getUserRole = ()=> {
    let userType = this.getUserType(), userRole = '';
    if (!userType) {
      userRole = '系统管理员';
    } else {
      userRole = '园区管理员';
    }
    return userRole;
  };
  getUserType = ()=> {
    let userType = window.loginData.userInfo && window.loginData.userInfo.parkUuid ? window.loginData.userInfo.parkUuid : '';
    return userType;
  }
  render() {
    if (window.loginData === null || typeof (window.loginData) === 'undefined') {
      if (!LoginUtil.loadContext()) {
        browserHistory.push({
          pathname: '/index.html'
        });
        return null;
      }
    }
    let menuStyle = {height: '36px', fontSize: '14px', textAlign: 'left'};
    const menu = (<Menu onClick={this.handleMenuClick}>
      <Menu.Item key="3" style={menuStyle} disabled><Icon type="user"/><span
          style={{marginLeft: '8px'}}>{this.getUserRole()}</span></Menu.Item>
      <Menu.Item key="2" style={menuStyle}><Icon type="logout"/><span
          style={{marginLeft: '8px'}}>退出登录</span></Menu.Item>
    </Menu>);
    let body = this.props.children;
    //解决浏览器回退头部组件不回退的问题
    this.state.activeNode = this.props.activeNode;
    let aNode = [this.state.activeNode];
    let parkUserName = window.loginData.userInfo && window.loginData.userInfo.accountName ? window.loginData.userInfo.accountName : '未获取到';
    return (<div className='whole-wrap'>
      <Header className="lz-header" style={{
        minWidth: '1200px',
        height:'56px',
        lineHeight:'56px',
        paddingRight:4
      }}>
        <div style={{float: 'left', color: '#EFEFEF', fontSize: '16px'}}>
          <span style={{cursor: 'pointer'}} onClick={this.goHome}>智慧门禁管理系统</span>
        </div>
        <Menu
            theme="dark" mode="horizontal" selectedKeys={aNode} onClick={this.handleClick}
            style={{lineHeight: '56px', float: 'left', paddingLeft: '160px'}}
        >
          {
            this.props.navItems.map((item) => {
              // 检查权限
              let itemColor = 'hsla(0, 0%, 100%, .67)';
              let iconType = 'file';
              if (typeof (item.icon) !== 'undefined') {
                iconType = item.icon;
              }
              return (<Menu.Item key={item.to}>
                            <span>
                              <span className={itemColor === 'red' ? 'errorHint' : 'nav-text'}>{item.name}</span>
                            </span>
              </Menu.Item>);
            })
          }
        </Menu>
        <div style={{float: 'right', color: '#EFEFEF'}}>
          <Dropdown overlay={menu}>
            <div style={{
              width: 130,
              cursor: 'pointer',
              lineHeight: '54px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}>
              <Icon type="user" style={{cursor: 'pointer', fontSize: '20px', color: '#08dbfb', verticalAlign: 'sub'}}/>
              <span style={{fontSize: 15, marginLeft: 6}}>{parkUserName}</span>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Content className='lz-content'>
          {body}
      </Content>
    </div>);
  }
}
TopBar.propTypes = {
  children: PropTypes.any,
  navItems: PropTypes.any,
  activeNode: PropTypes.any,
  home: PropTypes.string,
}
export default TopBar;
