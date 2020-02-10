/**
 *   Create by Malson on 2019/2/19
 */

import React from 'react';
class Authority extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginFlag:false
    }
    let loginData = window.sessionStorage.loginData;
    if(loginData){
      this.state.loginFlag = true;
      try {
        window.loginData = JSON.parse(window.sessionStorage.loginData);
      }catch (err){}
    }else{
      this.props.router.push({
        pathname: '/index.html',
      })
    }
  }
  render(){
    // 应对没有登录却有路由信息的
    let loginFlag = this.state.loginFlag;
    let loginPage = this.props.location.pathname === '/' || this.props.location.pathname === '/index.html';
    return !loginFlag && !loginPage?'':this.props.children
  }
}
export default Authority;