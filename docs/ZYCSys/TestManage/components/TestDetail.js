import React from 'react'
import { Divider, Spin, Button } from 'antd'
import '../style/TestMange.css'

import Imgone from '../../images/1.png'
import Imgtwo from '../../images/2.jpg'
class TestDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      filter:{}
    }
  }

  onServiceComplete = data => {
  }

    //第一次加载
    componentDidMount () {
      // TestManageActions.fetchData()
      // this.unsubscribe = TestManageStore.listen(this.onServiceComplete)
    }
    //卸载组件
    componentWillUnmount () {
      this.unsubscribe()
    }

    handleOnChange=(e)=>{
      console.log(e.target.value)
      let filter = this.state.filter;
      filter[e.target.id] = e.target.value;
      console.log(filter)

    }

  render () {
    const { loading } = this.state
    return (
      <div className='grid-wrap'>
        <div className='component-title'>
          <Divider type='vertical' className='line' />
          <span className='text'>代码扫描</span>
        </div>

        <div className='grid-page1'>
          <Spin size='large' spinning={loading} />
          <div className='grid-box'>
            <div className='grid-divider'>
              <Button type='primary' style={{ marginRight: '64%' }}>
                源代码：
              </Button>
              <Button type='primary' icon='yuque'>
                运行
              </Button>
            </div>
            <textarea
            id="content"
            onChange={this.handleOnChange}
              style={{
                width: '98%',
                height: '87%',
                borderRadius: '0 0 10px 10px'
              }}
            ></textarea>
          </div>
          <div className='grid-box'>
            <div className='grid-divider'>
              <Button>运行结果</Button>
            </div>
            <p
              className='rusult'
              style={{
                width: '98%',
                height: '87%',
                borderRadius: '0 0 10px 10px'
              }}
            ></p>
          </div>
        </div>
      </div>
    )
  }
}

export default TestDetail
