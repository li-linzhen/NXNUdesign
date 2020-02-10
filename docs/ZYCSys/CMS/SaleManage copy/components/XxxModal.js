/**
 *   Create by Malson on 2019/2/27
 */

import React from 'react'
import {Spin, Row, Col, Button, Divider} from 'antd'
import FormUtils from '@/lib/Components/FormUtils'
import FormDef from './XxxForm'

let Utils = require('@/public/script/utils')
let Common = require('@/public/script/common')


class DriverModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},    //每个form页面必传
      modalType: '',   //每个form页面必传  是否可以编辑
      visible: false,
      loading: false,
      flag: true,
    }
    //初始化数据信息
    FormDef.initCargoOwnerForm(this, this.state.formData)
    
    //使用公共input change必加
    this.handleOnChange = Utils.handleOnChange.bind(this, 'formData')
  }
  
  /**
   *  请求回调
   */
  onServiceChange = (data) => {
    this.setState({loading: false})
    if (data.errMsg) {
      this.setState({errMsg: data.errMsg})
      return
    }
    if (data.operation === 'retrieveInfo') {
    }
  }
  
  componentDidMount() {
    this.state.validRules = FormDef.getCargoOwnerFormRule(this)
    let {modalType, editData} = this.props
    if (modalType === 'detail') {
      this.setState({
        modalType: modalType,
        formData: editData
      })
    }
  }
  
  componentWillUnmount() {
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }
  
  /**
   *  点击确定，提交数据
   */
  onSubmit = () => {
    if (Common.validator(this, this.state.formData)) {
      console.log('成功')
    }
  }
  //获取块级
  /**
   *  list 为 [{}]
   *  对象内包括
   *      key   :  key
   *      label :  label
   */
  getComFormItem = (list = [], colpParam = {}) => {
    return list.map(item => {
      return FormUtils.getFormItem(this, {key: item.key, label: item.label, ...colpParam})
    })
  }
  //返回
  onClickBack = () => {
    this.props.onClickBack()
  }
  
  render() {
    let {formData} = this.state
    //个人信息
    let cargoInfo = this.getComFormItem([
      {key: 'name', label: '姓名'},
      {key: 'phone', label: '手机号'},
      {key: 'age', label: '年龄'},
    ])
    //公司信息
    let otherInfo = this.getComFormItem([
      {key: 'time', label: '时间'},
    ])
    let title = '新增',
        modalBtn = (
            <Row>
              <Col offset={9}>
                <Button type='primary' onClick={this.onSubmit} className='form-submit-btn'>确定</Button>
              </Col>
            </Row>
        )
    
    //详情页面  不显示输入框  不显示按钮
    if (this.props.modalType === 'detail') {
      title = '详情'
      modalBtn = ''
    }
    return (
        <div>
          <div className='modal-form-wrap'>
            <div className='modal-list-box'>
              <div className='modal-list-title'>个人信息</div>
              {cargoInfo}
            </div>
            <div className='modal-list-box'>
              <div className='modal-list-title'>公司信息</div>
              {otherInfo}
            </div>
            {modalBtn}
          </div>
        </div>
    )
  }
}

export default DriverModal