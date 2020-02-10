import React from 'react';
import Common from '../../public/script/common';


class IndexPage extends React.Component {
  constructor(props){
    super(props);
    let path = '';
    let loading = false;
    let loc = this.props.location;
    if (loc !== null && typeof (loc) !== 'undefined') {
      path = loc.pathname;
      if (path !== null && typeof (path) !== 'undefined') {
        if(path.startsWith('/HBBManager/')){
          loading = true;
          let pathname = this.props.location.pathname;
          let search = window.localStorage.href;
          if(pathname.indexOf('href')>-1){
            pathname = '/'+search.split('=')[1];//对应404页面的href
          }
          pathname = pathname.substring(0,pathname.lastIndexOf('/')+1);
          let menus = Common.getMenuList();
          let url = '',urlFlag = false;
          menus.map(item=>{
            if(pathname===item.path){
              urlFlag = true;
            }
          });
          url = urlFlag?'/index.html?'+pathname:'/index.html';
          document.location.href = '/index.html';
        }
      }
    }
    this.state={
      loading,
      path,
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <div style={{width:'100%', height:'100%',backgroundColor:'#f1f1f1'}} />
      );
    }

    return (
      <div>
        <h1 style={{textAlign:'center'}}>404 - Not Found {this.state.path}</h1>
      </div>
    );
  }
}

export default IndexPage;
