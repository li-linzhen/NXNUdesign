'use strict'
import React from 'react'
import {Radio, Icon, Button, Row, Col, Badge, Select} from 'antd'
import FormUtil from '../../../../lib/Components/FormUtil'

const RadioGroup = Radio.Group
const Option = Select.Option

let colWidth = [6, 12, 18, 24]

export default {
  /**
   *  filter
   *  不做数据筛选
   */
  
  initFilterForm(data) {
    data.userCode = '初始值1'
    data.userType = ''
  },
  
  getFilterFormRule: function (form) {
    return [
      {id: 'userCode', desc: 'xxx',},
      {id: 'userType', desc: 'xx',},
    ]
  },
  
  getFilterForm(form, data, attrList) {
    
    let attr = FormUtil.getParam(form, attrList)
    let attrMap = attr.attrMap
    let itemLayouts = FormUtil.getFromSpan()[1]
    let hints = form.state.hints
    let props = {
      $this: form,
      data,
      hints,
      itemLayouts,
      attrMap
    }
    const operaCom = [
      <div className='table-operation' key='operation'>
        <span className='filter-reset'><a onClick={form.onReset}>重置</a></span>
        <Button type='primary btn-margin' onClick={form.onSearch}>查询</Button>
        <Button type='primary btn-margin' onClick={form.onCreate}>新增</Button>
      </div>
    ]
    let selectCom = (
        <Select onChange={form.onSelectFilter} value={data.userType}>
          <Option value="">-请选择-</Option>
          <Option value="10">未审核</Option>
          <Option value="11">审核中</Option>
          <Option value="12">审核通过</Option>
          <Option value="14">不通过</Option>
        </Select>
    )
    /**
     *  filter样式展示
     */
    let listArray = [
      {key: 'userCode', label: '过滤条件1',},
      {key: 'userType', label: '过滤条件2', component: selectCom},
    ]
    let formItems = FormUtil.getFilterItems(props, listArray)
    return [...formItems, ...operaCom]
  },
  
  
  /**
   *  table
   */
  tableViews: [
    {
      name: 'XxxTable',
      cols: ['name', 'phone', 'age', 'time'],
      func: 'getCargoOwnerTableColumns'
    }
  ],
  getCargoOwnerTableColumns($this) {
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render(text, record) {
          return <a onClick={() => $this.onClickUserCode(record)}>{text}</a>
        }
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 200
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 200,
      },
    ]
  },
  /**
   *  form
   */
  // 初始化数据
  initCargoOwnerForm($this, data) {
    //传入string为初始化值为"",传入数组初始值为第二项
    $this.state.hints = {}
    let fieldList = [
      'name',
      'phone',
      'age',
      ['time', '2018-1-2'],
    ]
    fieldList.map(item => {
      if (typeof item === "string") {
        data[item] = ''
      } else {
        data[item[0]] = item[1]
      }
    })
  },
  /**
   *  获取校验规则
   */
  getCargoOwnerFormRule($this) {
    return [
      {id: 'phone', desc: '我要显示的名称', required: true},
      {id: 'trueName', desc: '我要显示的名称', required: true},
    ]
  }
}

