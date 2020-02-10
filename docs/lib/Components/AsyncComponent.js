/*eslint-disable */
/**
 *   Create by Malson on 2018/10/8
 */
import React from "react";
import {Icon} from 'antd';
//异步加载文件！

export default function asyncComponent(importComponent) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }
    async componentDidMount() {
      const component = await importComponent();
      this.setState({
        component,
      });
    }
    render() {
      const Com = this.state.component;
      //loading 页面
      const loadwrap = {
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'#1890FF'
      };
      const Loading = <div style={loadwrap}><Icon
          type="loading"
          theme="outlined"
          style={{ fontSize:30 }}
      /></div>;
      return Com ? <Com {...this.props} /> : Loading;
    }
  }
}