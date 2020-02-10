import React, { Component } from 'react'

/**
 * 第一个import echarts是必须的
 * 第二个是引入的具体的一个图表类型 （可选）
 * 第三个是表的title(可选)
 * 第四个是表的工具栏组件相关的行为（可选，
   内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具）
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

class ReactEcharts extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        //初始化图表
        this.initChart();
    }
    componentWillReceiveProps(nextProps) {
        //更新图表
        this.initChart(nextProps);
    }
    /*生成图表，做了判断，如果不去判断dom有没有生成，
      每次更新图表都要生成一个dom节点*/
    initChart(props) {
        let option = props === undefined ? this.props.option : props.option;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.getInstanceByDom(document.getElementById('main'));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById('main'));
        }
        // 绘制图表，option设置图表格式及源数据
        myChart.setOption({
            title: {
                text: '分店流水统计',
                subtext: '虚构数据',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['芜湖', '无锡', '滁州', '上海', '苏州']
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: [
                        { value: 1548, name: '苏州' },
                        { value: 535, name: '上海' },
                        { value: 510, name: '滁州' },
                        { value: 634, name: '无锡' },
                        { value: 735, name: '芜湖' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }

    render() {
        return (
            //width和height可由属性值传入
            <div id="main" style={{ width: 800, height: 500 }}></div>
        );
    }
};

export { ReactEcharts as default };