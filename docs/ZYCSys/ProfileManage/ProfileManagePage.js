/*
 *   商品管理-新增商品
 */
'use strict';
import React from 'react';
import ServiceMsg from '../../lib/Components/ServiceMsg'
import { Button, Form, Input, Divider,Upload, Icon, message } from 'antd'
let Common = require('../../public/script/common')
const FormItem = Form.Item;
const { TextArea } = Input;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
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

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    const layout = 'horizontal';
    const layoutItem = 'form-item-' + layout;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
    };
    const { filter } = this.state
    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { imageUrl } = this.state;
    const pagheader = (
      <div className='component-title'>
        <Divider type='vertical' className='line' />
        <span className='text'>个人资料</span>
      </div>
    )

    let form = <div>
      <FormItem {...formItemLayout} label="头像" colon={true} className={layoutItem}  >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>

      </FormItem>
      <FormItem {...formItemLayout} label="姓名" colon={true} className={layoutItem}  >
        <Input type="text" name="stock" id="stock" value={filter.stock} onChange={this.handleOnChange} />
      </FormItem>
      <FormItem {...formItemLayout} label="手机号" colon={true} >
        <Input type="text" name="sellprice" id="sellprice" value={filter.sellprice} onChange={this.handleOnChange} />
      </FormItem>
      <FormItem {...formItemLayout} label="密码" colon={true} className={layoutItem} >
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
            <Button onClick={this.handleAdd} type="primary" style={{ marginLeft: '16.4%' }}>确定</Button>
          </div>
        </div>
      </div>
    )
  }
}
module.exports = AddGoods;