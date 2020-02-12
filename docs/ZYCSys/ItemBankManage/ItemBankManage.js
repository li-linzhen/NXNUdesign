/*
 *   仓库管理-新增调拨
 */
'use strict'

import React from 'react'
import { Button, Divider, Menu, Dropdown, Icon, Input } from 'antd'
import ServiceMsg from '../../lib/Components/ServiceMsg'
import EditableContent from './components/EditableContent'
import VipDetail from './components/VipDetail'

let Common = require('../../public/script/common')
const { Search } = Input

class ItemBankManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false //页面table加载状态
    }
  }
  //第一次加载
  componentDidMount () {}
  //卸载组件
  componentWillUnmount () {}
  //刷新
  handleQueryClick = () => {}

  handleSubmission = () => {
    Common.deskMessage('正在提交', 'info')
    Common.deskMessage('提交成功', 'success')
  }

  onFilterRecord = e => {
    let { filterValue } = this.state
    filterValue = e.target.value
    this.setState({ filterValue })
    console.log(filterValue)
  }

  handleAdd = () => {
    this.refs.vipdetails.initPage()
    this.refs.vipdetails.toggle()
  }

  render () {
    const pagheader = (
      <div className='component-title'>
        <Divider type='vertical' className='line' />
        <span className='text'>题库管理</span>
      </div>
    )

    const pagetable = (
      <div className='table-box'>
        <EditableContent />
        <VipDetail ref='vipdetails'/>
      </div>
    )
    return (
      <div className='grid-wrap'>
        <ServiceMsg ref='mxgBox' svcList={[]} />
        {pagheader}
         
          <div className='grid-page'>
          <div className='table-box'>
          <Button
            onClick={this.handleAdd}
            type='primary'
            style={{ marginBottom: 16 }}
          >
            <Icon type='plus' />
            创建题库
          </Button>
          <Search
            placeholder='请输入商品名称'
            value={this.state.filterValue}
            onChange={this.onFilterRecord}
            style={{ width: 200, margin: '0 20px' }}
          />

          <Button
            onClick={this.handleSubmission}
            type='primary'
            style={{ marginBottom: 16, float: 'right' }}
          >
            提交
          </Button>
          {pagetable}
          </div>
          </div>
        </div>
    )
  }
}
module.exports = ItemBankManage
