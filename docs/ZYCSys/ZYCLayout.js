import React from 'react';
import ProLayout from '../lib/Components/ProLayout';
let Common = require('../public/script/common');
let ZYCMenu = require('./main/menus');
import utils from '../public/script/utils';

class ZYCLayout extends React.Component {
  state = {
    topItems: ZYCMenu.topMenus,
    leftItems: ZYCMenu.mainMenus
  }
  render() {
    //old  activeNode = Common.ZYCHome is set by config.js
    let pathname = this.props.location.pathname;
    let { topItems,leftItems } = this.state;
    //根据头部菜单筛选出左侧菜单
    let type = pathname.replace(/^(\/{1}\w+)(\/{1}\w+\/{1})([\s\S]*)/ig,"$1$2");
    let data = utils.deepCopyValue(topItems);
    data.map(item=>{
      if(item.path===type){
        type = item.to
      }
    });
    //可以自定义content内容的页面
    let selfContentArray = ['AppIndexPage'],
        selfContent = false;
    selfContentArray.map(item=>{
      if(pathname.includes(item)){
        selfContent = true
      }
    })
    return (
        <ProLayout
          topItems = { topItems }
          leftItems = { leftItems }
          activeNode = { pathname }
          selfContent = { selfContent }
          pathName = { pathname }
          home="@/index.html?from=ZYC"
          children={this.props.children}
        />)
  }
}

export default ZYCLayout;
