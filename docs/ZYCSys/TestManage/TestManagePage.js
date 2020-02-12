/*
 *   经营概括
 */
'use strict'

import React from 'react'
import { Divider, Upload, Icon, message, Button } from 'antd'
import ServiceMsg from '../../lib/Components/ServiceMsg'
import GoDetailUtil from '../../lib/Components/GoDetailUtil'
import TestManageStore from './store/TestManageStore'
import TestManageActions from './action/TestManageActions'
import './style/TestMange.css'
const { Dragger } = Upload

class RunManagePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '1',
      loading: false, //页面table加载状态
      filterValue: '',
      option: 'option1',
      filter: {},
      joke:'',
      operation: '',
      errMsg: '',


    }
  }


  onServiceComplete = data => {
    if (data.operation === 'fetchData') {
      if (data.errMsg === '') {
        console.log(data)

        this.state.joke=data.jokes[0];
      }
      this.setState({
        loading: false
      })
    }

  }
  //第一次加载
  componentDidMount () {
    TestManageActions.fetchData()
    this.unsubscribe = TestManageStore.listen(this.onServiceComplete)
  }
  //卸载组件
  componentWillUnmount () {
    this.unsubscribe()
  }
  //刷新
  handleQueryClick = () => {}
  //数据发生变化后更新option，由state管理
  getOptions (options) {
    this.setState({ option: options })
  }
  //点击确定
  enterLoading = () => {
    this.setState({ loading: true })
  }
  handleChange = info => {
    let fileList = [...info.fileList]
    fileList = fileList.slice(-122)
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })

    this.setState({ fileList })
  }

  //点击切换笑话内容
  switchingContent =()=>{
    const {joke} = this.state
    console.log(joke);
    TestManageActions.fetchData()

    this.setState({
      loading: false
    })
  }
  render () {

    const {joke} = this.state
    console.log(joke)

    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true
    }
    const pagheader = (
      <div className='component-title'>
        <Divider type='vertical' className='line' />
        <span className='text'>程序测试</span>
      </div>
    )
    const cardbox = (
      <div className='box-upload'>
      <div className="jokes-box" onClick={this.switchingContent.bind(this)}>
      {joke}
        </div>
        <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type='upload' /> 上传文件
          </Button>
        </Upload>
      </div>
    )
    return (
      <div>
        <ServiceMsg ref='mxgBox' svcList={[]} />
        {pagheader}
        {cardbox}
        
        <div className='test-ture'>
          <Button
            type='primary'
            loading={this.state.loading}
            onClick={GoDetailUtil.goTestDetail.bind(this)}
          >
            确定
          </Button>
        </div>


      </div>
    )
  }
}
module.exports = RunManagePage
