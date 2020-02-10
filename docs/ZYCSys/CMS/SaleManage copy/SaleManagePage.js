/**
 *   货主管理
 *   Create by Malson on 2018/4/19
 */
'use strict';

import React from 'react';
import { Button, Divider } from 'antd'
import FormModal from './components/XxxModal';
import DictTable from '../../../lib/Components/DictTable';
import CargoOwnerActions from './action/XxxActions';
import CargoOwnerStore from './store/XxxStore';
import Filter from './components/Filter';
import FormDef from './components/XxxForm';
import CommonAnimate from '@/public/script/CommonAnimate'
const tableName = 'XxxTable';

class SaleManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                recordSet: [],
                errMsg: '',
                startPage: 1,
                pageRow: 10,
                totalRow: 0,
            },
            loading: false,//页面table加载状态
            pageType: '',//页面类型，新增（''）的话显示table 其他显示表格页面
            editData: {},//编辑时数据

        }
    }
    onServiceChange = (data) => {
        if (data.errMsg) {
            this.setState({ errMsg: data.errMsg });
            return;
        }
        if (data.operation === 'retrieve') {
            let recordSet = data.recordSet.list;
            let cargoOwnerSet = { recordSet, errMsg: '', startPage: data.recordSet.startPage, pageRow: data.recordSet.pageRow, totalRow: data.recordSet.totalRow };
            this.setState({ cargoOwnerSet });
        }
    }

    //第一次加载
    componentDidMount() {
        this.unsubcribe = CargoOwnerStore.listen(this.onServiceChange);
        this.handleQueryClick();
    }
    //卸载组件
    componentWillUnmount() {
        this.unsubcribe();
    }

    handleQueryClick = () => {
        this.setState({ loading: true });
        let recordSet = [];
        for (let i = 0; i < 10; i++) {
            recordSet.push({
                name: '张胜男',
                age: 12,
                phone: '1233211231166',
                uuid: i,
                time: '2018-2-3'
            })
        }
        setTimeout(() => {
            this.state.tableData.recordSet = recordSet
            this.setState({ loading: false });
        }, 1000)
        // let tableData = this.state.tableData;
        // let obj =  this.Filter.getFilter() || {};
        // obj.orderByType = this.state.tableSort;
        // let {startPage,pageRow,totalRow} = tableData;
        // let filter = {
        //     startPage,
        //     pageRow,
        //     totalRow,
        //     object:obj
        // }
        // this.setState({loading:true});
        // CargoOwnerActions.retrieve(filter);
    }
    onSearch = () => {
        this.handleQueryClick();
    }
    //货主详情
    onClickUserCode = (record = {}) => {
        this.setState({ editData: record, pageType: 'detail' });
    }
    //关闭弹窗
    onClickBack = () => {
        this.setState({ pageType: '' });
        this.handleQueryClick();
    }
    onTableRefresh = (current, pageRow) => {
        this.state.cargoOwnerSet.startPage = current;
        this.state.cargoOwnerSet.pageRow = pageRow;
        this.handleQueryClick();
    }
    onTableChange = (pagination, filters, sorter) => {
        let sort = sorter.order === 'ascend' ? '1' : '0';
        let tableSort = this.state.tableSort;
        if (sort === tableSort) {
            return;
        } else {
            this.state.tableSort = sort;
            this.handleQueryClick();
        }
    }
    // add
    onFilterCreate = () => {
        this.setState({ pageType: 'add' });
    }

    render() {
        let { tableData, editData, pageType } = this.state;
        let { startPage, totalRow, recordSet } = tableData;
        let attrProps = {
            self: this,
            tableName: tableName,
            primaryKey: 'uuid',
            fixedTool: false,    // 固定按钮，不滚动
            btnPosition: 'top',
            tableForm: FormDef,
            editCol: false,
            editTable: false,
            defView: 'XxxTable',
            totalPage: totalRow,
            currentPage: startPage,
            onRefresh: this.onTableRefresh,
        };
        let modalProps = {
            editData,
            modalType: pageType,
            onClickBack: this.onClickBack
        };
        let filterProps = {
            onFilterCreate: this.onFilterCreate,
            onFilterSearch: this.onSearch,
            doHandleRetrieve: this.handleQueryClick
        }
        let tablePage = (
            <div className='table-box'>
                <Filter ref={ref => this.Filter = ref} {...filterProps} />
                <DictTable
                    dataSource={recordSet}
                    loading={this.state.loading}
                    attrs={attrProps}
                    onChange={this.onTableChange}
                />
            </div>
        );
        let formPage = (
            <CommonAnimate>
                <div key='1'>
                    <FormModal {...modalProps} />
                </div>
            </CommonAnimate>
        )
        let showPage = tablePage,
            showTitle = (
                <div className='component-title'>
                    <Divider type='vertical' className='line' />
                    <span className='text'>货主</span>
                </div>
            )

        if (pageType) {//进入表单
            showPage = formPage;
            showTitle = (
                <div className='component-title'>
                    <Divider type='vertical' className='line' />
                    <span className='text'>添加货主</span>
                    <Button type='default' onClick={this.onClickBack} className='ant-btn-back'>返回</Button>
                </div>
            )
        }

        return (
            <div className='grid-wrap'>
                {showTitle}
                <div className='grid-page'>
                    {showPage}
                </div>
            </div>
        );
    }
}

module.exports = SaleManagePage;