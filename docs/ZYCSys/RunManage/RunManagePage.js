/*
 *   经营概括
 */
'use strict';

import React from 'react';
import { Divider} from 'antd'
let Common = require('../../public/script/common')
let iconfont = require('../../public/script/iconfont')
import echarts from 'echarts/lib/echarts'
import ServiceMsg from '../../lib/Components/ServiceMsg'
import ReactEcharts from './components/ChartData'
class RunManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleManageSet: {
                people: '2222',
                msg: '134412',
                momeny: '64646',
                tips: '342847',
                recordSet: [],
                currentPage: 1,
                pageSize: 10,
                totalNum: 10,
                operation: '',
                errMsg: '',
            },
            activeKey: '1',
            loading: false,//页面table加载状态
            filterValue: '',
            option: 'option1'
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
    //数据发生变化后更新option，由state管理
    getOptions(options) {
        this.setState({ option: options });
    }
    render() {
        const { saleManageSet,  option } = this.state;
        const pagheader = (
            <div className='component-title'>
                <Divider type='vertical' className='line' />
                <span className='text'>经营概括</span>
            </div>
        )
        const cardbox = (
            <div className='flex-wrap'>
                <div className='shaw_box'>
                    <div className='icon_boxa'>
                        <svg className="icon icon-size colora" aria-hidden="true">
                            <use xlinkHref="#icon-peoples"></use>
                        </svg>
                    </div>
                    <div className='right-box'>
                        <p>访客</p>
                        <p>{saleManageSet.people}</p>
                    </div>
                </div>
                <div className='shaw_box'>
                    <div className='icon_boxb'>
                        <svg className="icon icon-size colorb" aria-hidden="true">
                            <use xlinkHref="#icon-xiaoxi"></use>
                        </svg>
                    </div>
                    <div className='right-box'>
                        <p>消息</p>
                        <p>{saleManageSet.msg}</p>
                    </div>
                </div>
                <div className='shaw_box'>
                    <div className='icon_boxc'>
                        <svg className="icon icon-size colorc" aria-hidden="true">
                            <use xlinkHref="#icon-money"></use>
                        </svg>
                    </div>
                    <div className='right-box'>
                        <p>金额</p>
                        <p>{saleManageSet.momeny}</p>
                    </div>
                </div>
                <div className='shaw_box'>
                    <div className='icon_boxd'>
                        <svg className="icon icon-size colord " aria-hidden="true">
                            <use xlinkHref="#icon-gwc"></use>
                        </svg>
                    </div>
                    <div className='right-box'>
                        <p>订单</p>
                        <p>{saleManageSet.tips}</p>
                    </div>
                </div>
            </div>
        )
        return (
            <div className='grid-wrap'>
                <ServiceMsg ref='mxgBox' svcList={[]} />
                {pagheader}
                {cardbox}
                <div className='grid-page'>
                    <div className='table-box'>
                        <ReactEcharts option={option}></ReactEcharts>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = RunManagePage;