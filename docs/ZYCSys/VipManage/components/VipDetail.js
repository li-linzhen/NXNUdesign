import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import ServiceMsg from '../../../lib/Components/ServiceMsg';
const FormItem = Form.Item;
let Common = require('../../../public/script/common')
class VipDetail extends React.Component {
  constructor(proprs) {
    super(proprs);
    this.state = {
      VipDetails: {},
      validRules: [],
      modal: false,
      formloading: false,
      loading: false
    }
  }

  onServiceComplete = data => {
  };

  // 第一次加载
  componentDidMount() {
    // this.unsubscribe = OrgManageStore.listen(this.onServiceComplete);
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  initPage = (record) => {
    this.setState({
      formloading: true,
      VipDetails: record
    })
  }
  toggle = () => {
    if (this.beforeClose && this.state.modal) {
      this.beforeClose();
    }

    this.setState({
      modal: !this.state.modal
    });
  }
  //修改保存
  onClickSave = () => {
    let { VipDetails } = this.state;
    this.state.validRules = [
      { id: 'vipname', desc: '会员姓名', required: true, max: 64 }
    ];
    if (Common.formValidator(this, VipDetails)) {
      Common.deskMessage('正在修改基本信息', 'info');
      Common.deskMessage('修改基本信息成功', 'success');
    }
    console.log(1)
  }
  handleOnChange = (e) => {
    let obj = this.state.VipDetails;
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
      wrapperCol: { span: 20 }
    };
    const { modal, VipDetails } = this.state;
    const form = <Form layout='horizontal'>
      <FormItem {...formItemLayout} label="会员姓名" required={false} colon={true} className={layoutItem}>
        <span className='cloud-readonly-message'>
          <Input type="text" name="vipname" id="vipname" placeholder='必填' value={VipDetails.vipname || '-'} onChange={this.handleOnChange} />
        </span>
      </FormItem>
      <FormItem {...formItemLayout} label="性别" colon={true} className={layoutItem}>
        <span className='cloud-readonly-message'>
          <Input type="text" name="sex" id="sex" value={VipDetails.sex || '-'} onChange={this.handleOnChange} />
        </span>
      </FormItem>
      <FormItem {...formItemLayout} label="出生年月" colon={true} className={layoutItem}>
        <span className='cloud-readonly-message'>
          <Input type="text" name="age" id="age" defaultValue={VipDetails.age || '-'} onChange={this.handleOnChange} />
          </span>
      </FormItem>
      <FormItem {...formItemLayout} label="联系方式" required={false} colon={true} className={layoutItem}>
        <span className='cloud-readonly-message'>
          <Input type="text" name="number" id="number" defaultValue={VipDetails.number || '-'} onChange={this.handleOnChange} />
          </span>
      </FormItem>
      <FormItem {...formItemLayout} label="注册时间" required={false} colon={true} className={layoutItem}>
        <span className='cloud-readonly-message'>{VipDetails.createAt || '-'}</span>
      </FormItem>
      <FormItem {...formItemLayout} label="注册门店" required={false} colon={true} className={layoutItem}>
        <span className='cloud-readonly-message'>{VipDetails.salesdate || '-'}</span>
      </FormItem>
    </Form>;
    return <Modal
      title='修改该会员基本信息'
      visible={modal}
      onCancel={this.toggle}
      footer={[
        <div key="footerDiv">
          <ServiceMsg ref='mxgBox' svcList={[]} />
          <Button onClick={this.onClickSave}>
            修改
              </Button>
          <Button key="submit" onClick={this.toggle}>
            关闭
              </Button>
        </div>
      ]}>
      {form}
    </Modal>
  }
}

export default VipDetail;