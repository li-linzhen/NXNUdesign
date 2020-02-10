import React from 'react';
import {browserHistory} from 'react-router';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import '../style/layout.scss';
import PropTypes from 'prop-types';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;
var Utils = require('../../public/script/utils');
var Common = require('../../public/script/common');

class LeftMenu extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed: false,
      mode: 'inline',
    }
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  handleClick = (e) => {
    var len = this.props.navItems.length;
    for (var i = 0; i < len; i++) {
      var item = this.props.navItems[i];
      if (item.to === e.key) {
        if (item.onClick) {
          item.onClick();
          return;
        }
      }
    }
    var url = e.key;
    var param = '';
    var pos = url.indexOf('?');
    if (pos > 0) {
      param = url.substring(1 + pos);
      url = url.substring(0, pos);
    }
    var pr = {};
    if (param !== '') {
      var values = param.split('&');
      values.map((str, i) => {
        pos = str.indexOf('=');
        if (pos > 0) {
          var name = str.substring(0, pos);
          var value = str.substring(1 + pos);
          pr[name] = value;
        }
      });
    }
    browserHistory.push({
      pathname: url,
      query: pr
    });
  }
  
  render() {
    let openKeys = [];
    let aNode = this.props.activeNode;
    if (typeof (aNode) != 'undefined') {
      this.props.navItems.map((item, i) => {
        if (typeof (item.childItems) != 'undefined') {
          item.childItems.map((o, i) => {
            if (aNode === o.to) {
              openKeys.push(item.to);
            }
          });
        } else {
          openKeys.push(item.to);
        }
      });
    }
    let menuKey = window.location.href;
    return (
        <Layout className="lz-content-inner">
          <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              className='left-side'
              style={{position: 'relative'}}
          >
            {/*<div className='left-logo'>我是LOGO</div>*/}
            <Menu theme='light' mode={this.state.mode}
                  defaultOpenKeys={openKeys}
                  defaultSelectedKeys={[aNode]}
                  onClick={this.handleClick}
                  className='left-side'
                  key={menuKey}
            >
              {
                this.props.navItems.map((item, i) => {
                  // 检查权限
                  var itemColor = 'rgba(0,0,0,.65)';
                  if (typeof (item.childItems) === 'undefined') {
                    var iconType = 'file';
                    if (typeof (item.icon) !== 'undefined') {
                      iconType = item.icon;
                    }
                    return <Menu.Item key={item.to}>
                                        <span className={itemColor === 'red' ? 'errorHint' : 'nav-text'}>
                                            <Icon type={iconType}/>
                                            <span>{item.name}</span>
                                        </span>
                    </Menu.Item>;
                  }
                  else {
                    var iconType = 'setting';
                    if (typeof (item.icon) != 'undefined') {
                      iconType = item.icon;
                    }
                    
                    var childNodes = [];
                    item.childItems.map((o, i) => {
                      // 检查权限
                      var oColor = 'rgba(0,0,0,.65)';
                      var iconType2 = 'file';
                      if (typeof (o.icon) != 'undefined') {
                        iconType2 = o.icon;
                      }
                      childNodes.push(
                          <Menu.Item key={o.to}>
                                                <span className={oColor === 'red' ? 'errorHint' : 'nav-text'}>
                                                    <Icon type={iconType2}/>
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
                          <span style={{color: itemColor}}>
                            <Icon type={iconType}/>
                            <span>{item.name}</span>
                          </span>}>
                          {childNodes}
                        </SubMenu>
                    )
                  }
                })
              }
            </Menu>
          </Sider>
          <div className='right-side'>
            { this.props.children }
          </div>
        </Layout>
    );
  }
}
LeftMenu.propTypes = {
  children: PropTypes.node,
  navItems: PropTypes.array,
  activeNode: PropTypes.string
};

export default LeftMenu
