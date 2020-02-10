/**
 *   Create by Malson on 2018/12/7
 */

/**
 *   Create by Malson on 2018/4/26
 */
import React from 'react'
import {Button, Input, Select} from 'antd'
import FormDef from './XxxForm'

let Common = require('../../../../public/script/common')
let Utils = require('../../../../public/script/utils')

const Search = Input.Search
const Option = Select.Option

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hints: {},
      validRules: [],
      filter: {},
      update: true
    }
    //初始化条件
    FormDef.initFilterForm(this.state.filter)
    this.state.validRules = FormDef.getFilterFormRule(this)
    //使用公共input change必加
    this.handleOnChange = Utils.handleOnChange.bind(this, 'filter')
  }
  
  getFilter = () => {
    //if(Common.validator(this,this.state.filter)){
    return this.state.filter
    // }
  }
  
  componentDidMount() {
  }
  
  updata = (callback) => {
    this.setState({updata: true})
  }
  onReset = () => {
    FormDef.initFilterForm(this.state.filter)
    this.updata()
    this.props.doHandleRetrieve()
  }
  //过滤条件按下回车
  filterBlur = () => {
    this.onSearch()
  }
  onSearch = () => {
    this.props.onFilterSearch()
  }
  onImport = () => {
    console.log('导入')
  }
  
  onCreate = () => {
    this.props.onFilterCreate()
  }
  onSelectFilter = (userType) => {
    let filter = {...this.state.filter, ...{userType}}
    this.setState({filter}, () => {
      this.onSearch()
    })
  }
  
  render() {
    let items = FormDef.getFilterForm(this, this.state.filter)
    return (
        <div className='filter-wrap'>
          {items}
        </div>
    )
  }
}

module.exports = Filter