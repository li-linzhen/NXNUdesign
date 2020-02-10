/*
 *   账号管理
 */
'use strict';
import React from 'react';
import ServiceMsg from '../../lib/Components/ServiceMsg'
import { Button, Form, Input, Divider } from 'antd'
let Common = require('../../public/script/common')
const FormItem = Form.Item;
const { TextArea } = Input;
import XxxStore from './store/XxxStore'
import XxxActions from './action/XxxActions'
class AddGoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            loading: false,//页面table加载状态
        }
    }
    onServiceComplete = (data) => {
        this.setState({
            loading: false,
        })
    }

    //第一次加载
    componentDidMount() {
        this.unsubscribe = XxxStore.listen(this.onServiceComplete);
    }

    //卸载组件
    componentWillUnmount() {
        this.unsubscribe()
    }
    //刷新
    handleQueryClick = () => {
    }
    //增加按钮
    handleAdd = () => {
        let { filter } = this.state;
        XxxActions.login(filter)
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
        const pagheader = (
            <div className='component-title'>
                <Divider type='vertical' className='line' />
                <span className='text'>新增商品</span>
            </div>
        )
        const { filter } = this.state;
        let form = <div>
            <FormItem {...formItemLayout} label="账号" colon={true} className={layoutItem}  >
                <Input type="text" name="username" id="username" value={filter.username} onChange={this.handleOnChange} />

                {/* <Input value={filter.username} /> */}
            </FormItem>
            <FormItem {...formItemLayout} label="密码" colon={true} className={layoutItem}  >
                <Input type="text" name="password" id="password" value={filter.password} onChange={this.handleOnChange} />
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