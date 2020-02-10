/*
 *   仓库管理-新增调拨
 */
'use strict';

import React from 'react';
import { Button, Divider, Menu, Dropdown, Icon } from 'antd'
import ServiceMsg from '../../lib/Components/ServiceMsg'
import EditableTable from './components/EditableTable'
class StoreManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,//页面table加载状态
    }
  }
  //第一次加载
  componentDidMount() {
  }
  //卸载组件
  componentWillUnmount() {
  }
  //刷新
  handleQueryClick = () => {
  }
  render() {
    const pagheader = (
      <div className='component-title'>
        <Divider type='vertical' className='line' />
        <span className='text'>新增调拨</span>
      </div>
    )
    const menu = (
      <Menu>
          <Menu.Item>
              <a target="_blank" rel="noopener noreferrer">
                  滁州门店
          </a>
          </Menu.Item>
          <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" >
                  无锡分店
          </a>
          </Menu.Item>
          <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" >
                  芜湖分店
          </a>
          </Menu.Item>
      </Menu>
  );
    const pagetab = (
      <div className='table-box' style={{ borderBottom: '1px solid #eee' }}>
        调出店铺：
        <Dropdown overlay={menu}>
          <Button>
            全部分店<Icon type="down" />
          </Button>
        </Dropdown>
        调入店铺：
        <Dropdown overlay={menu}>
          <Button>
            全部分店<Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    )
    const pagetable = (
      <div className='table-box'>
        <EditableTable/>
      </div>
    )
    return (
      <div className='grid-wrap'>
        <ServiceMsg ref='mxgBox' svcList={[]} />
        {pagheader}
        <div className='grid-page'>
          {pagetab} {pagetable}
        </div>
      </div>
    )
  }
}
module.exports = StoreManagePage;