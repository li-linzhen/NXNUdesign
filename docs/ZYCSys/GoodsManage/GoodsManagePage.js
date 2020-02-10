/*
 *   商品管理-门店商品列表
 */
'use strict';

import React from 'react';
import { Button, Divider, Input, Table, Menu, Dropdown, Icon } from 'antd'
let Common = require('../../public/script/common')
import ServiceMsg from '../../lib/Components/ServiceMsg'
const { Search } = Input;
class SaleManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleManageSet: {
                recordSet: [
                    {
                        key: '1',
                        storename: '胡彦斌',
                        goodsclass: 32,
                        goodsname: '西湖区湖底公园1号',
                    },
                    {
                        key: '2',
                        storename: '胡彦祖',
                        goodsclass: 42,
                        goodsname: '西湖区湖底公园1号',
                    },
                ],
                currentPage: 1,
                pageSize: 10,
                totalNum: 10,
                operation: '',
                errMsg: '',
            },
            activeKey: '1',
            loading: false,//页面table加载状态
            filterValue: ''
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
    onShowSizeChange = (current, pageSize) => {
        let { saleManageSet } = this.state;
        saleManageSet.currentPage = Common.getStartPage1(pageSize, saleManageSet.totalNum, saleManageSet.currentPage);
        saleManageSet.pageSize = pageSize;
        this.handleQueryClick()
    }
    onChangePage = (pageNumber) => {
        let { saleManageSet } = this.state;
        saleManageSet.currentPage = pageNumber;
        this.handleQueryClick()
    }
    onFilterRecord = e => {
        let { filterValue } = this.state;
        filterValue = e.target.value;
        this.setState({ filterValue });
        console.log(filterValue)
    }
    handleAdd = () => {
        const w = window.open('about:blank');
        w.location.href = "./AddGoods"
    }
    render() {
        const { saleManageSet, loading, filterValue } = this.state;
        const columns = [
            {
                title: '门店名称',
                dataIndex: 'storename',
                key: 'storename',
                width: 100,

            },
            {
                title: '商品分类',
                dataIndex: 'goodsclass',
                key: 'goodsclass',
                width: 100,

            },
            {
                title: '商品名称',
                dataIndex: 'goodsname',
                key: 'goodsname',
                width: 100,

            },
            {
                title: '数量',
                dataIndex: 'number',
                key: 'number',
                width: 100,

            },
            {
                title: '销售金额',
                dataIndex: 'salesamount',
                key: 'salesamount',
                width: 100,

            },
            {
                title: '销售日期',
                dataIndex: 'salesdate',
                key: 'salesdate',
                width: 100,

            },
            {
                title: '支付方式',
                dataIndex: 'payment',
                key: 'payment',
                width: 100,

            },
        ];
        const pag = { showQuickJumper: true, total: saleManageSet.totalNum, pageSize: saleManageSet.pageSize, current: saleManageSet.currentPage, size: 'large', showSizeChanger: true, onShowSizeChange: this.onShowSizeChange, onChange: this.onChangePage };
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
        const pagheader = (
            <div className='component-title'>
                <Divider type='vertical' className='line' />
                <span className='text'>门店商品列表</span>
            </div>
        )
        const pagetab = (
            <div className='table-box marbott'>
                <Button onClick={this.handleAdd} type='primary btn-margin marrigt'>新增商品</Button>
                <Search placeholder="请输入商品名称" value={this.state.filterValue} onChange={this.onFilterRecord} style={{ width: 200, margin: '0 20px' }} />
                <Dropdown overlay={menu}>
                    <Button type='primary btn-margin'>
                        全部分店 <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
            

        )
        const pagetable = (
            <div className='table-box'>
                <div className='padding-top'>
                    <Table dataSource={saleManageSet.recordSet} columns={columns} pagination={pag} size="default" loading={loading} />
                </div>
            </div>
        )

        return (
            <div className='grid-wrap'>
                <ServiceMsg ref='mxgBox' svcList={[]} />
                {pagheader}
                <div className='grid-page'>
                    {pagetab}
                </div>
                <div className='grid-page'>
                    {pagetable}
                </div>
            </div>
        )
    }
}
module.exports = SaleManagePage;