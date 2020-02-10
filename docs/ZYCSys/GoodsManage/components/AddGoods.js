/*
 *   商品管理-新增商品
 */
'use strict';
import React from 'react';
import ServiceMsg from '../../../lib/Components/ServiceMsg'
import { Button, Form, Input, Divider } from 'antd'
let Common = require('../../../public/script/common')
const FormItem = Form.Item;
const { TextArea } = Input;
class AddGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      loading: false,//页面table加载状态
    }
  }
  onServiceComplete = (data) => {
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
  //增加按钮
  handleAdd = () => {
    let { VipDetails } = this.state;
    Common.deskMessage('正在新增商品', 'info');
    Common.deskMessage('新增商品成功', 'success');

    console.log(1)
    // alert('新增成功！')
  }
  handleOnChange = (e) => {
    let obj = this.state.filter;
    const id = e.target.id;
    const value = e.target.value;
    obj[e.target.id] = e.target.value;

    let rc = true;
    // if (isQueryForm !== true) {
    //     rc = Validator.validator(this, obj, id);
    // }

    this.setState({
      loading: this.state.loading
    }, () => {
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, value);
      }
    });
  }
  render() {
    const layout = 'horizontal';
    const layoutItem = 'form-item-' + layout;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
    };
    const { filter } = this.state
    const pagheader = (
      <div className='component-title'>
        <Divider type='vertical' className='line' />
        <span className='text'>新增商品</span>
      </div>
    )
    let form = <div>
      <FormItem {...formItemLayout} label="商品名称" colon={true} className={layoutItem}  >
        <Input type="text" name="goodsname" id="goodsname" value={filter.goodsname} onChange={this.handleOnChange} />
      </FormItem>
      <FormItem {...formItemLayout} label="初始库存" colon={true} className={layoutItem}  >
        <Input type="text" name="stock" id="stock" value={filter.stock} onChange={this.handleOnChange} />
      </FormItem>
      <FormItem {...formItemLayout} label="售价" colon={true} >
        <Input type="text" name="sellprice" id="sellprice" value={filter.sellprice} onChange={this.handleOnChange} />
      </FormItem>
      <FormItem {...formItemLayout} label="进价" colon={true} className={layoutItem} >
        <Input type="text" name="price" id="price" value={filter.price} onChange={this.handleOnChange} />
      </FormItem>
      <FormItem {...formItemLayout} label="备注" colon={true} className={layoutItem}  >
        <TextArea rows={2} />
      </FormItem>
    </div>;

    return (
      <div className='grid-wrap'>
        <ServiceMsg ref='mxgBox' svcList={[]} />
        {pagheader}
        <div className='grid-page'>
          <div className='table-box'>
            {form}
            <Button onClick={this.handleAdd} type="primary" style={{ marginLeft: '16.4%' }}>新增商品</Button>
          </div>
        </div>
      </div>
    )
  }
}
module.exports = AddGoods;