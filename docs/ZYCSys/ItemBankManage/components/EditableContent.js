'use strict'
import React from 'react'
import { Table, Input, Button, Popconfirm, Form ,Icon} from 'antd'
let Common = require('../../../public/script/common')
const EditableContext = React.createContext()
const { Search } = Input;

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = form => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render () {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

class EditableContent extends React.Component {
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: '题库名称',
        dataIndex: 'itemName',
        width: '25%',
        editable: true
      },
      {
        title: '描述',
        dataIndex: 'describe',
        width: '25%',
        editable: true
      },
      {
        title: '分类',
        dataIndex: 'classify',
        width: '15%',
      },
      {
        title: '创建时间',
        dataIndex: ' createTime',
        width: '15%',

      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title='确定删除吗?'
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a><Icon type="delete" title="删除"/></a>
            </Popconfirm>
          ) : null
      }
    ]

    this.state = {
      dataSource: [
        {
          key: '0',
          itemName: '超短裙',
          describe: '32',
          classify: 'London, Park Lane no. 0',
          createTime:'',
          render: text => <a>{text}</a>,
        },
        {
          key: '1',
          itemName: '小外套',
          describe: '32',
          classify: 'London, Park Lane no. 1',
          createTime:''
        }
      ],
      count: 2,
      filterValue:''
    }
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  // handleAdd = () => {
  //   this.refs.vipdetails.initPage(record);
  //   this.refs.vipdetails.toggle();

    // const { count, dataSource } = this.state
    // const newData = {
    //   key: count,
    //   itemName: `Edward King ${count}`,
    //   describe: 32,
    //   classify: `London, Park Lane no. ${count}`,
    //   createTime:'',
    // }
    // this.setState({
    //   dataSource: [...dataSource, newData],
    //   count: count + 1
    // })
  // }
  // handleSubmission = () => {
  //   Common.deskMessage('正在提交', 'info')
  //   Common.deskMessage('提交成功', 'success')
  // }

  // handleSave = row => {
  //   const newData = [...this.state.dataSource]
  //   const index = newData.findIndex(item => row.key === item.key)
  //   const item = newData[index]
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row
  //   })
  //   this.setState({ dataSource: newData })
  // }

//   onFilterRecord = e => {
//     let { filterValue } = this.state;
//     filterValue = e.target.value;
//     this.setState({ filterValue });
//     console.log(filterValue)
// }

  render () {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        )
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    }
    return (
      <div>
        {/* <Button
          onClick={this.handleAdd}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          <Icon type="plus" />创建题库
        </Button>
        <Search placeholder="请输入商品名称" value={this.state.filterValue} onChange={this.onFilterRecord} style={{ width: 200, margin: '0 20px' }} />

        <Button
          onClick={this.handleSubmission}
          type='primary'
          style={{ marginBottom: 16, float: 'right' }}
        >
          提交
        </Button> */}
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </div>
    )
  }
}
module.exports = EditableContent
