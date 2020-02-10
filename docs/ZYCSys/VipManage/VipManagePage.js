/*
 *   会员管理
 */
'use strict';

import React from 'react';
import { Button, Divider, Input, Table, Menu, Dropdown, Icon ,Switch} from 'antd'
let Common = require('../../public/script/common')
import ServiceMsg from '../../lib/Components/ServiceMsg'
const { Search } = Input;
import VipDetail from './components/VipDetail'
class VipManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleManageSet: {
                recordSet: [
                    {
                        key: '1',
                        vipname: '胡彦斌',
                        sex: 32,
                        age: '西湖区湖底公园1号',
                    },
                    {
                        key: '2',
                        vipname: '胡彦祖',
                        sex: 42,
                        age: '西湖区湖底公园1号',
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
    }
    //是否启用
    handleSwitchChange=()=>{

    }
    //修改弹框
  handleOnCheckClick = (record) => {
    this.refs.vipdetails.initPage(record);
    this.refs.vipdetails.toggle();
  }
    render() {
        const { saleManageSet, loading, filterValue } = this.state;
        const columns = [
            {
                title: '会员名称',
                dataIndex: 'vipname',
                key: 'vipname',
                width: 100,
                render: (text, record) => <span className='table_opts' ><a href="javascript:;" onClick={this.handleOnCheckClick.bind(this, record)}>{text}</a></span>
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 100,

            },
            {
                title: '出生年月',
                dataIndex: 'age',
                key: 'age',
                width: 100,

            },
            {
                title: '联系方式',
                dataIndex: 'number',
                key: 'number',
                width: 100,

            },
            {
                title: '注册时间',
                dataIndex: 'createAt',
                key: 'createAt',
                width: 100,
                sorter: (a, b) => Common.handleTimeSort('createAt', a, b),
            },
            {
                title: '注册门店',
                dataIndex: 'salesdate',
                key: 'salesdate',
                width: 100,
            },
            {
                title: '是否启用',
                dataIndex: 'action',
                key: 'action',
                width: 100,
                render: (text, record) => {
                    return(
                      <Switch checkedChildren="启用" unCheckedChildren="停用" onChange={this.handleSwitchChange.bind(this, record)} loading={loading} />
                    )
                  }
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
                <span className='text'>会员管理</span>
            </div>
        )
        const pagetab = (
            <div className='table-box marbott'>
                <Search placeholder="请输入会员名称、卡号和电话号码" onSearch={value => console.log(value)} style={{ width: 300, margin: '0 20px' }} />
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
                    <VipDetail ref='vipdetails'/>
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
module.exports = VipManagePage;