/**
 *   Create by Malson on 2019/2/18
 */
import React from 'react';
import { Layout, Menu, Icon, Dropdown,Breadcrumb  } from 'antd';
import '../style/layout.scss';
import { browserHistory } from 'react-router';
import LogActions from '../../login/action/LogActions';
import LogStores from '../../login/data/LogStores';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
let Utils = require('../../public/script/utils');
let Common = require('../../public/script/common');

class ProLayout extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed: false
    }
  }

    componentDidMount() {
        //监听
        this.unsubscribe = LogStores.listen(this.onServiceChange);
    };
    onServiceChange = (data) => {
        if (!data.errMsg || data.errMsg == '') {
            if (data.operation === 'logout') {
                window.sessionStorage.clear();
                window.location.href = '/index.html';
            }
        }
    };
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  
  // user下拉menu点击
  handleMenuClick = (e) =>{
    //修改密码
    if (e.key === '1') {
      browserHistory.push({
        pathname: '/main/passwd/'
      });
    }
    //退出登录
    else if (e.key === '2') {
       LogActions.logout({uuid:JSON.parse(window.sessionStorage.getItem('loginData')).uuid});
      // window.sessionStorage.clear();
      // window.location.href = '/index.html';
    }
  }
  
  //左侧menu点击
  onMenuClick = ({ item, key, keyPath })=>{
    let pathName = this.props.pathName;
    //相同地址不处理
    if(pathName === key){
      return;
    }
    browserHistory.push({
      pathname: key,
    });
  }
  
  
  render() {
    const menu = (
        <Menu onClick={this.handleMenuClick}>
          {/*<Menu.Item key="1" className='user-dropDown' disabled>*/}
            {/*<Icon type="user"/>*/}
          {/*<span className='user-text'>帅哥</span></Menu.Item>*/}
          <Menu.Item key="2" className='user-dropDown'>
            <Icon type="logout"/>
            <span className='user-text'>注销</span>
            </Menu.Item>
        </Menu>);
    const aNode = [this.props.activeNode];//当前选中的左侧
    let openKey = '';
    let breadArr = [];
    const userName = Common.getLoginData()?Common.getLoginData().username:'管理员';
    this.props.leftItems.map(item=>{
      if(this.props.activeNode.indexOf(item.to)!==-1){
        openKey = [item.to];
        breadArr.push(item.name);
        if(item.childItems.length){
          item.childItems.map(jtem=>{
            if(jtem.to === aNode[0]){
              breadArr.push(jtem.name);
            }
          })
        }
      }
    })
    let contentHtml = (
        <Content className='content-wrap'>
          { this.props.children }
        </Content>
    );
    if(this.props.selfContent){
      contentHtml = this.props.children;
    }
    return (
        <Layout className='whole-wrap'>
          <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              className='left-side'
          >
            <div className='logo-wrap'>
                {this.state.collapsed?<div className="logos" />:<div className="logo" />}
            </div>
            <Menu theme="light"
                  mode="inline"
                  defaultSelectedKeys={ aNode }
                  defaultOpenKeys = { openKey }
                  onClick={ this.onMenuClick }
            >
              {
                this.props.leftItems.map((item, i) => {
                  if (!item.childItems.length) {
                    let iconType = item.icon;
                    return <Menu.Item key={item.to}>
                              <span className='nav-text'>
                                  {iconType?<Icon type={iconType}/>:''}
                                  <span>{ item.name }</span>
                              </span>
                            </Menu.Item>;
                  }
                  else {
                    let iconType = item.icon;
                    let childNodes = [];
                    item.childItems.map((o, i) => {
                      let iconType2 = o.icon;
                      childNodes.push(
                          <Menu.Item key={o.to}>
                            <span className= 'nav-text'>
                                {iconType2?<Icon type={iconType2}/>:''}
                                <span>{o.name}</span>
                            </span>
                          </Menu.Item>
                      );
                    });
                    if (childNodes.length === 0) {
                      return null;
                    }
                    return (
                        <SubMenu key={item.to} title={
                          <span>
                            {iconType?<Icon type={iconType}/>:''}
                            <span>{ item.name }</span>
                          </span>}>
                          { childNodes }
                        </SubMenu>
                    )
                  }
                })
              }
            </Menu>
          </Sider>
          <Layout className='lz-content'>
            <Header style={{ background: '#fff', padding: 0 }} className="lz-header">
              <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
              />
              <div className='header-tools'>
                <Dropdown overlay={menu}>
                  <div className='user-box'>
                    <div className='icon-wrap'>
                      <Icon type="user" className='icon'/>
                    </div>
                    <span className='text-name'>{ userName }</span>
                  </div>
                </Dropdown>
              </div>
            </Header>
            {/*<div className='bread-box'>*/}
              {/*<Breadcrumb>*/}
                {/*{*/}
                  {/*breadArr.length?breadArr.map(item=><Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>):''*/}
                {/*}*/}
              {/*</Breadcrumb>*/}
            {/*</div>*/}
            { contentHtml }
          </Layout>
        </Layout>
    );
  }
}

export default ProLayout;