import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Radio, Icon } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
var Common = require('../../public/script/common');
import FormUtil from './FormUtil';

/*
/*
self: 页面,
tableName: 表格名称,
primaryKey: 主键缺省[uuid],
## fixedTool: 固定按钮行
container: 固定按钮行的容器
buttons: 左上按钮,
btnPosition: 按钮位置：top,bottom,
rightButtons: 右上按钮,
bottomButtons: 下方按钮,
operCol: 表格行的操作按钮,
editCol: 允许选择列,
editTable: 允许修改表格属性,
tableForm: 表格配置信息,
defView: 缺省显示的视图，在tableForm里配置,
views: 缺省定义的多表格视图,
colAttrs: 列的属性
totalPage: 总页数,
currentPage: 当前页,
onRefresh: 修改当前页或每页记录数量时触发,func(current, pageRow)
enableExport: 允许导出,true/false
mustPage: 必须分页,true/false
renderCard: 显示卡片
size: large,middle,small
padding: '0 12px 8px 20px'
toolPadding: 工具条的padding
height: 高度
*/
class DictTable extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tableName: '',
      viewType: '',
      tables: [],
      tableConf: {},  // activeName,size,page,wrap,showLine,pageRow
    }
  }
    // mixins: [XlsTempFile()],

    // ????��???
    componentDidMount () {
        this.state.tableName = this.props.attrs.tableName;
        this.state.tableConf = FormUtil.getTableConf(this.state.tableName);
        this.state.tableConf.showLine = this.props.attrs.showLine;
        this.onTableChange();
    }

    onClickEditColumn = ()=> {
        var tableName = this.state.tableName;
        var attrs = this.props.attrs;
        this.refs.editTable.initPage(tableName, this.getColumns());
        this.refs.editTable.toggle();
    }
    onTableChange = ()=>{
        var viewType = '';
        var tables = [];
        var attrs = this.props.attrs;
        var views = attrs.views;
        if (views && views.length > 0) {
            for (var x = 0; x < views.length; x++) {
                var viewInfo = this.getTableView(views[x]);
                if (viewInfo) {
                    var table = { name: views[x], columns: viewInfo.cols };
                    tables.push(table);
                }
            }
        }
        else {
            var tableName = this.state.tableName;
            var str = window.localStorage[tableName];
            if (str) {
                var colConf = JSON.parse(str);
                tables = colConf.tables;
            }
        }

        var aName = this.state.tableConf.activeName;
        if (tables && aName) {
            var len = tables.length;
            for (var i = 0; i < len; i++) {
                if (tables[i].name === aName) {
                    viewType = aName;
                    break;
                }
            }
        }

        if (!viewType || viewType === '') {
            if (tables && tables.length > 0) {
                viewType = tables[0].name;
            }
        }

        this.setState({ viewType: viewType, tables: tables })
    }
    onClickEditTable = ()=> {
        var attrs = this.props.attrs;
        var tableName = this.state.tableName;
        this.refs.editTable2.initPage(tableName, attrs.mustPage, attrs.enableExport);
        this.refs.editTable2.toggle();
    }
    onTableConfChange = ()=> {
        var tableName = this.state.tableName;
        var conf = FormUtil.getTableConf(tableName);
        var isChange = (this.state.tableConf.page !== conf.page);
        this.setState({ tableConf: conf });

        if (isChange) {
            var attrs = this.props.attrs;
            if (attrs.onRefresh) {
                if (conf.page === true) {
                    attrs.onRefresh(attrs.currentPage, conf.pageRow);
                }
                else {
                    attrs.onRefresh(0, 0);
                }
            }
        }
    }
    onChangeView = (e)=> {
        this.state.tableConf.activeName = e.target.value;
        var tableName = this.state.tableName;
        FormUtil.saveTableConf(tableName, this.state.tableConf);

        this.setState({ viewType: e.target.value });
    }
    onChangePage = (pageNumber)=>{
        // console.log(pageNumber)
        var attrs = this.props.attrs;
        var conf = this.state.tableConf;
        if (attrs.onRefresh) {
            if (conf.page === true) {
                attrs.onRefresh(pageNumber, conf.pageRow);
            }
            else {
                attrs.onRefresh(0, 0);
            }
        }
    }
    onShowSizeChange = (current, pageSize)=> {
        var attrs = this.props.attrs;
        var conf = this.state.tableConf;
        conf.pageRow = pageSize;
        FormUtil.saveTableConf(attrs.tableName, conf);

        if (attrs.onRefresh) {
            if (conf.page === true) {
                attrs.onRefresh(attrs.currentPage, conf.pageRow);
            }
            else {
                attrs.onRefresh(0, 0);
            }
        }
    }
    getTableView = (viewType)=> {
        var attrs = this.props.attrs;
        var viewList = attrs.tableForm.tableViews;
        if (!viewList) {
            return null;
        }

        var len = viewList.length;
        for (var i = 0; i < len; i++) {
            if (viewList[i].name === viewType) {
                return viewList[i];
            }
        }

        return null;
    }
    getTableColumns = (viewType, operCol)=>  {
        var table = null;
        var tables = this.state.tables;
        for (var i = 0; i < tables.length; i++) {
            if (tables[i].name === viewType) {
                table = tables[i];
                break;
            }
        }

        if (!table) {
            table = tables[0];
            this.state.viewType = table.name;
        }

        return this.getColumns(table.columns, operCol);
    }
    getColumns = (viewType, operCol)=> {
        var emptyCols = [];
        if (viewType && operCol) {
            emptyCols.push(operCol);
        }

        var attrs = this.props.attrs;
        var tableView = this.getTableView(attrs.defView);
        if (!tableView) {
            // alert('����[' + attrs.defView+']');
            return emptyCols;
        }

        var func = attrs.tableForm[tableView.func];
        var columnList = func(attrs.self);
        if (!viewType) {
            // ???????
            return columnList;
        }

        if (typeof viewType === 'string') {
            tableView = this.getTableView(viewType);
            if (!tableView) {
                return emptyCols;
            }

            viewType = tableView.cols;
        }

        var columnMap = {};
        for (var i = columnList.length - 1; i >= 0; i--) {
            var c = columnList[i];
            columnMap[c.key] = c;
        }

        var columns = [];
        var cols = viewType;
        var len = cols.length;
        for (var i = 0; i < len; i++) {
            var col = cols[i];
            if (typeof col === 'string') {
                var c = columnMap[col];
                if (c) {
                    columns.push(c);
                }
            }
            else {
                var c = columnMap[col.name];
                if (c) {
                    if (col.width) c.width = col.width;
                    columns.push(c);
                }
            }
        }

        if (operCol) {
            columns.push(operCol);
        }
        
        // console.log(columns)
        return columns;
    }
    onExportFile = ()=> {
        var recordSet = this.getRecordSet();
        if (!recordSet) {
            return;
        }

        // ????
        var cols = this.refs.table.columns;
        var count = cols.length;
        var attrs = this.props.attrs;
        if (attrs.operCol) {
            count--;
        }

        var fields = [];
        for (var i = 0; i < count; i++) {
            var col = cols[i];
            var zm = String.fromCharCode(i + 65);
            var r = {id: zm, name: col.key, title: col.title};
            fields.push(r);
        }

        this.refs.editTable2.toggle();
        this.downXlsTempFile2(fields, recordSet, this.refs.xls);
    }
    getRecordSet = ()=> {
        const table = ReactDOM.findDOMNode(this.refs.table);
        if (!table) return;

        const tbodys = table.getElementsByTagName('tbody')
        if (!tbodys || tbodys.length === 0) return;

        const rows = tbodys[0].getElementsByTagName('tr')
        if (!rows || rows.length === 0) return;

        var cols = this.refs.table.columns;

        var recordSet = [];
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            var record = this.getRecord(cols, rows[i]);
            if (record) {
                recordSet.push(record);
            }
        }

        return recordSet;
    }
    getRecord = (cols, row)=> {
        const values = row.getElementsByTagName('td')
        if (!values || values.length === 0) {
            return null;
        }

        var record = {};
        var count = values.length;
        for (var i = 0; i < count; i++) {
            var name = cols[i].key;
            record[name] = values[i].innerText;
        }

        return record;
    }

    render = ()=> {
        const {
            attrs,
            ...attributes
        } = this.props;

        // activeName,size,page,wrap,showLine,pageRow
        var conf = this.state.tableConf;
        var tableSize = conf.size || 'large';
        var showLine =  !!conf.showLine;
        var wrap = (conf.wrap === true) ? true : false;

        // ??????
        var toolbar = [];
        var marginLeft = '0px';
        if (attrs.buttons && (attrs.btnPosition !== 'bottom' || attrs.bottomButtons)) {
            marginLeft = '16px';
            toolbar.push(
                <div style={{ float: 'left' }} key={Math.random()}>
                  {attrs.buttons}
                </div> );
        }

        // console.log(attrs, toolbar)
        var tables = this.state.tables;
        if (tables && tables.length > 1) {
            var btns = [];
            for (var i = 0; i < tables.length; i++) {
                var t = tables[i];
                btns.push(<RadioButton value={t.name}>{t.name}</RadioButton>);
            }

            var bars = <div style={{ float: 'left' }}>
                <RadioGroup value={this.state.viewType} style={{ marginLeft: marginLeft }} onChange={this.onChangeView}>{btns}</RadioGroup>
            </div>;

            toolbar.push(bars);
        }

        if (attrs.rightButtons) {
            toolbar.push(<div style={{ textAlign: 'right', width: '100%' }} key={Math.random().toFixed(10)}>{attrs.rightButtons}</div>);
        }

        // ??????
        var toolDiv = null;
        if (toolbar.length > 0) {
            toolDiv = <div className='toolbar-table'>{toolbar}</div>;
        }

        // ????��???
        var operCol = attrs.operCol;
        if (operCol) {
            var views = attrs.views;
            if (attrs.editCol === true && (!views || views.length === 0)) {
                if (attrs.editTable === true) {
                    attrs.operCol.title = <div>
                        <Icon type="edit" style={{ cursor: 'pointer' }} onClick={this.onClickEditColumn} />
                        <span className="ant-divider" />
                        <Icon type="bars" style={{ cursor: 'pointer' }} onClick={this.onClickEditTable} />
                    </div>;
                }
                else {
                    attrs.operCol.title = <div>
                        <Icon type="edit" style={{ cursor: 'pointer' }} onClick={this.onClickEditColumn} />
                    </div>;
                }
            }
            else if (attrs.editTable === true) {
                attrs.operCol.title = <div>
                    <Icon type="bars" style={{ cursor: 'pointer' }} onClick={this.onClickEditTable} />
                </div>;
            }
        }

        // ???
        var columns;
        var tables = this.state.tables;
        if (tables && tables.length > 1) {
            columns = this.getTableColumns(this.state.viewType, attrs.operCol);
        }
        else if (tables && tables.length === 1) {
            var viewType = tables[0].name;
            columns = this.getTableColumns(viewType, attrs.operCol);
        }
        else {
            columns = this.getColumns(attrs.defView, attrs.operCol);
        }

        var scrollX = 0;
        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            scrollX = col.width + scrollX;
        }

        // ???
        var pag = false;
        if (conf.page === true && attrs.onRefresh) {
            // ????????????????????
            var pageRow = Number(conf.pageRow);
            var recordSet = attributes.dataSource;
            if (recordSet && recordSet.length > pageRow) {
                pageRow = recordSet.length;
            }

            pag = { showTotal: total => `总共 ${total} 条`,showQuickJumper: true, total: attrs.totalPage, pageSize: pageRow, current: attrs.currentPage, size: 'large', showSizeChanger: true, onShowSizeChange: this.onShowSizeChange, onChange: this.onChangePage }
        }

        if (!attrs.onRefresh) {
            attrs.mustPage = true;
        }

        // ?��??????
        var bottomDiv = null;
        var bottomButtons = attrs.bottomButtons;
        if (!bottomButtons && attrs.btnPosition === 'bottom') {
            bottomButtons = attrs.buttons;
        }

        if (bottomButtons) {
            var recordSet = this.props.dataSource;
            var btnMargin = (recordSet.length === 0 || conf.page !== true) ? '8px 0 0 0' : '-44px 0 0 0';
            bottomDiv = <div style={{ margin: btnMargin, width: '100%' }} >
                <div style={{ float: 'left' }}>
                    {bottomButtons}
                </div>
            </div>;
        }
        var primaryKey = attrs.primaryKey;
        if (!primaryKey || primaryKey === '') {
            primaryKey = 'key';
        }

        // var pages = [
        //     <EditTable ref="editTable" onTableChange={this.onTableChange} key={Math.random().toFixed(10)} />,
        //     <EditTable2 ref="editTable2" onExportFile={this.onExportFile} onTableChange={this.onTableConfChange} key={Math.random().toFixed(10)}/>,
        //     <XlsDown ref='xls' key={3} />
        // ];
        let pages = [];
        //��ʱ����Ҫ�༭

        var sclX = {};
        if (scrollX > 1400) {
            sclX = { scroll: { x: scrollX + 100 } };
            if (operCol) {
                operCol.fixed = 'right';
            }
        }
        var table = null;
        if (attrs.fixedTool && toolDiv) {
            var cs = Common.getGridMargin(this);
            table = <div className='grid-page' style={{ padding: cs.padding }}>
                <div style={{ margin: cs.margin }}>
                    {toolDiv}
                </div>
                <div className='grid-body' style={{ overflowY: 'auto' }}>
                    <Table ref='table' onChange={attrs.onChange} columns={columns} rowKey={record => record[primaryKey]} pagination={pag} size={tableSize} bordered={showLine} {...sclX} {...attributes} />
                    {bottomDiv}
                </div>
                {pages}
            </div>
        }
        else {
            table = <div style={{ width: '100%' }}>
                {toolDiv}
                <div style={{width:'100%'}}>
                    <Table ref='table'
                           columns={columns}
                           pagination={pag}
                           size={tableSize}
                           bordered={showLine}
                           onChange={attrs.onChange}
                           {...sclX}
                           {...attributes}/>
                    {bottomDiv}
                </div>
                {pages}
            </div>
        }

        return table;
    }
}

export default DictTable;
