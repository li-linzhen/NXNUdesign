import DictTable from "./DictTable"

﻿'use strict';

import React from 'react';
import {Row, Col,Form, Input} from 'antd';
const FormItem = Form.Item;

export default {
  getItemLayout: function (layout, labelWidths) {
    return [
      {
        itemWidth: 1,
        labelCol: ((layout == 'vertical') ? null : {span: labelWidths[0]}),
        wrapperCol: ((layout == 'vertical') ? null : {span: 24 - labelWidths[0]}),
      },
      {
        itemWidth: 2,
        labelCol: ((layout == 'vertical') ? null : {span: labelWidths[1]}),
        wrapperCol: ((layout == 'vertical') ? null : {span: 24 - labelWidths[1]}),
      },
      {
        itemWidth: 3,
        labelCol: ((layout == 'vertical') ? null : {span: labelWidths[2]}),
        wrapperCol: ((layout == 'vertical') ? null : {span: 24 - labelWidths[2]}),
      },
      {
        itemWidth: 4,
        labelCol: ((layout == 'vertical') ? null : {span: labelWidths[3]}),
        wrapperCol: ((layout == 'vertical') ? null : {span: 24 - labelWidths[3]}),
      },
      {
        itemWidth: 4,
        labelCol: {span: 7},
        wrapperCol: {span: 10},
      },
      {
        itemWidth: 2,
        labelCol: null,
        wrapperCol: null,
      },
      {
        itemWidth: 3,
        labelCol: null,
        wrapperCol: null,
      },
      {
        itemWidth: 4,
        labelCol: null,
        wrapperCol: null,
      }
    ];
  },
  getParam: function (form, attrList) {
    var attrMap = {};
    var showMap = {};
    var childMap = {};
    var objMap = {};
    form.state.checkMap = {};
    if (attrList) {
      var count = attrList.length;
      for (var x = 0; x < count; x++) {
        var {
          name,
          visible,
          check,
          children,
          object,
          ...attrs
        } = attrList[x];
        
        if (visible) showMap[name] = visible;
        if (check) form.state.checkMap[name] = check;
        if (children) childMap[name] = children;
        if (object) objMap[name] = object;
        if (attrs) attrMap[name] = attrs;
      }
    }
    
    if (!form.state.hints) {
      form.state.hints = {};
    }
    
    return {attrMap: attrMap, showMap: showMap, childMap: childMap, objMap: objMap};
  },
  appendObjects: function (showList, line, colWidth) {
    if (line.length === 0) {
      return;
    }
    var list = [];
    
    var len = line.length;
    for (var i = 0; i < len; i++) {
      var field = line[i];
      var w = field.props.itemWidth;
      w = colWidth[w - 1];
      
      list.push(<Col span={w} className='lz-filter-input' key={field.key}>{field}</Col>);
    }
    let noUseKye = line[0].key;
    showList.push(<Row key={noUseKye}>{list}</Row>);
  },
  adjuestForm: function (items, showMap, colWidth) {
    // 隐藏对象，调整格式
    var lineWidth = 0;
    var line = [];
    var showList = [];
    
    var cols = colWidth.length;
    var len = items.length;
    for (var i = 0; i < len; i++) {
      var field = items[i];
      if (field.props.children.props) {
        var id = field.props.children.props.id;
        var attr = showMap[id];
        if (attr === 'hidden' || attr === false) {
          continue;
        }
      }
      
      var itemWidth = field.props.itemWidth;
      var newLine = field.props.newLine;
      // 计算行
      if (itemWidth >= cols || newLine) {
        this.appendObjects(showList, line, colWidth);
        line = [];
        lineWidth = 0;
        if (itemWidth >= cols) {
          showList.push(field);
        }
        else {
          lineWidth = itemWidth;
          line.push(field);
        }
      }
      else {
        if (lineWidth + itemWidth > cols) {
          this.appendObjects(showList, line, colWidth);
          line = [];
          lineWidth = itemWidth;
          line.push(field);
        }
        else if (lineWidth + itemWidth == cols) {
          line.push(field);
          this.appendObjects(showList, line, colWidth);
          line = [];
          lineWidth = 0;
        }
        else {
          line.push(field);
          lineWidth += itemWidth;
        }
      }
    }
    
    // 最后一行
    this.appendObjects(showList, line, colWidth);
    return showList;
  },
  getFromSpan: function () {
    return [
      {
        itemWidth: 4,
        labelCol: {span: 7},
        wrapperCol: {span: 10},
      },
      {
        itemWidth: 1,
        // labelCol: {span: 8},
        // wrapperCol: {span: 16},
      }
    ]
  },
  getTableConf: function (tableName) {
    var conf = {};
    var str = window.localStorage[tableName + 'Conf'];
    if (str) {
      conf = JSON.parse(str);
    }
    
    if (!conf.size) {
      conf.size = 'large';
    }
    
    if (conf.page !== false) {
      conf.page = true;
    }
    
    if (conf.wrap !== true) {
      conf.wrap = false;
    }
    
    if (conf.showLine !== true) {
      conf.showLine = false;
    }
    
    if (!conf.pageRow) {
      conf.pageRow = '10';
    }
    
    return conf;
  },
  saveTableConf: function (tableName, conf) {
    window.localStorage[tableName + 'Conf'] = JSON.stringify(conf);
  },
  getFilterItems(props={}, listArray = []) {
    let {
      $this,
      data,
      hints,
      itemLayouts,
      attrMap
    } = props;
    let onKeyDown = (e)=>{
      if(e.keyCode === 13 && $this.filterBlur){
         $this.filterBlur()
      }
    }
    
    return listArray.map((item, i) => {
      let component;
      if (item.component) {
        component = item.component;
      } else {
        component = <Input type='text'
                           key={item.key}
                           name={item.key}
                           id={item.key}
                           value={data[item.key]}
                           onChange={$this.handleOnChange}
                           placeholder={`请输入${item.label}`}
                           onKeyDown={onKeyDown}
                           {...attrMap[item.key]}
        />;
      }
      let formItem = item.other?<div key={item.key}>{item.other}</div>:(
          <span>
            <div className='filter-list filter-text'>{item.label}：</div>
            <div className='filter-list filter-component'>{component}</div>
            {/*<FormItem {...itemLayouts}*/}
                      {/*key={item.key}*/}
                      {/*label={item.label}*/}
                      {/*help={hints[item.key + 'Hint']}*/}
                      {/*validateStatus={hints[item.key + 'Status']}*/}
                      {/*className='form-item-horizontal'>*/}
              {/*{component}*/}
            {/*</FormItem>*/}
          </span>
      );
      return formItem;
    });
  },
  getItems(props={}, listArray = [],formType) {
    let {
      $this,
      data,
      hints,
      itemLayouts,
      attrMap
    } = props;
    return listArray.map((item, i) => {
      let component,className = "form-item-horizontal";
      if(formType === 'check'){  //纯查看
        component = <span>{data[item.key]}</span>
        className += " only-text";
      }else{  //可编辑
        if (item.component) {
          component = item.component;
        } else {
          component = <Input type='text'
                             key={item.key}
                             name={item.key}
                             id={item.key}
                             value={data[item.key]}
                             onChange={$this.handleOnChange}
                             placeholder={`请输入${item.label}`}
                             {...attrMap[item.key]}
          />;
        }
      }
      itemLayouts = {...itemLayouts,...item.layout};
      let formItem = item.other?<div key={item.key}>{item.other}</div>:(
          <FormItem {...itemLayouts}
                    key={item.key}
                    label={item.label}
                    help={hints[item.key + 'Hint']}
                    validateStatus={hints[item.key + 'Status']}
                    className={className}
                    newLine = {item.newLine}
          >
            {component}
          </FormItem>
      );
      return formItem;
      
    });
  },
  getRuleObj(attrList=[]){
    let obj = {};
    if (attrList.length) {
      let count = attrList.length;
      for (let x = 0; x < count; x++) {
        let {
          name,
          ...attrs
        } = attrList[x];
      
        if (attrs) obj[name] = attrs;
      }
    }
    return obj;
  }
};



