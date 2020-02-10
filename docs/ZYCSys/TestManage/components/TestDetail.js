import React from 'react'
import { Empty,Divider,Carousel ,Spin } from 'antd';
import '../style/TestMange.css'
import Imgone from '../../images/1.png'
import Imgtwo from '../../images/2.jpg'
class TestDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading:false,
     }
  }

 
  render() { 
    const {loading}=this.state;
    return (

      <div className='grid-wrap'>
      <div className='component-title'>
        <Divider type='vertical' className='line' />
        <span className='text'>代码扫描</span>
      </div>

      <div>
      <Spin size="large" spinning={loading}/>
      <Carousel autoplay>
    <div>
          <img src={Imgone}></img>
    </div>
    <div>
    <img src={Imgtwo}></img>
    </div>
    <div>
      <h3>3</h3>
    </div>
    <div>
      <h3>4</h3>
    </div>
  </Carousel>
      </div>

      </div>
      );
  }
}
 
export default TestDetail;