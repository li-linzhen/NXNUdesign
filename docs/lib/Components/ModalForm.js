import React from 'react';
import moment from 'moment';

var Validator = require('../../public/script/common');

module.exports = function (objName, isQueryForm) {
  return {
    toggle: function () {
      if (this.beforeClose && this.state.modal) {
        this.beforeClose();
      }
      
      this.setState({
        modal: !this.state.modal
      });
    },
    formatDate: function (date, format) {
      if (date !== null && date !== '' && typeof (date) !== 'undefined') {
        return moment(date, 'YYYYMMDD');
      }
      
      return '';
    },
    formatRangeDate: function (date, format) {
      if (date.length > 0) {
        return [moment(date[0], 'YYYYMMDD'), moment(date[1], 'YYYYMMDD')];
      }
      
      return '';
    },
    formatMonth: function (month, format) {
      if (month !== null && month !== '' && typeof (month) !== 'undefined') {
        return moment(month, 'YYYYMM');
      }
      
      return '';
    },
    handleOnChange: function (e) {
      var obj = this.state[objName];
      var val = e.target.value.replace(/(^\s*)/g, "");
      obj[e.target.id] = val;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, e.target.id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(e.target.id, e.target.value);
      }
      
      if (rc && this.afterChange) {
        this.afterChange(e.target.id, e.target.value);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    onEmailChange: function (value, id) {
      var obj = this.state[objName];
      obj[id] = value;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    onRadioChange: function (e) {
      var obj = this.state[objName];
      var value = '' + e.target.value;
      let id = e.target.id || e.target.name;
      obj[id] = value;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, value);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    onCheckChange: function (id, checkedValue) {
      var value = (checkedValue && checkedValue.length > 0) ? checkedValue.join(',') : '';
      var obj = this.state[objName];
      obj[id] = value;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, value);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    handleCheckBox: function (e) {
      var obj = this.state[objName];
      var value = e.target.checked ? '1' : '0';
      obj[e.target.id] = value;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, e.target.id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(e.target.id, value);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    handleOnSelected: function (id, value) {
      var obj = this.state[objName];
      obj[id] = value;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, value);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    handleOnSelDate: function (id, dateFormat, date, dateString) {
      // console.log(dateFormat, date);
      if (dateString == null || dateString.length == 0) {
        dateString = '';
      }
      else if (dateString.length != dateFormat.length) {
        return;
      }
      else {
        // 格式化
        var y = '';
        var m = '';
        var d = '';
        var values = dateString.split('');
        var types = dateFormat.split('');
        var len = values.length;
        for (var i = 0; i < len; i++) {
          if (types[i] === 'Y') {
            y = y + values[i];
          }
          else if (types[i] === 'M') {
            m = m + values[i];
          }
          else if (types[i] === 'D') {
            d = d + values[i];
          }
          else if (types[i] !== values[i]) {
            // console.log('日期错误', id, monthFormat, monthString);
            return;
          }
        }
        
        dateString = y + m + d;
      }
      
      var obj = this.state[objName];
      obj[id] = dateString;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, dateString);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    handleOnSelMonth: function (id, monthFormat, month, monthString) {
      if (monthString == null || monthString.length == 0) {
        monthString = '';
      }
      else if (monthString.length != monthFormat.length) {
        return;
      }
      else {
        // 格式化
        var y = '';
        var m = '';
        var values = monthString.split('');
        var types = monthFormat.split('');
        var len = values.length;
        for (var i = 0; i < len; i++) {
          if (types[i] === 'Y') {
            y = y + values[i];
          }
          else if (types[i] === 'M') {
            m = m + values[i];
          }
          else if (types[i] !== values[i]) {
            // console.log('日期错误', id, monthFormat, monthString);
            return;
          }
        }
        
        monthString = y + m;
      }
      
      var obj = this.state[objName];
      obj[id] = monthString;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, monthString);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
    
    handleOnSelTime: function (id, dateFormat, date, timeString) {
      // console.log(dateFormat, date);
      if (timeString == null || timeString.length == 0) {
        timeString = '';
      }
      else if (timeString.length != dateFormat.length) {
        return;
      }
      else {
        // 格式化
        var h = '';
        var m = '';
        var s = '';
        var values = timeString.split('');
        var types = dateFormat.split('');
        var len = values.length;
        for (var i = 0; i < len; i++) {
          if (types[i] === 'H') {
            h = h + values[i];
          }
          else if (types[i] === 'm') {
            m = m + values[i];
          }
          else if (types[i] === 's') {
            s = s + values[i];
          }
          else if (types[i] !== values[i]) {
            // console.log('日期错误', id, dateFormat, timeString);
            return;
          }
        }
        
        timeString = h + m + s;
      }
      
      var obj = this.state[objName];
      obj[id] = timeString;
      
      var rc = true;
      if (isQueryForm !== true) {
        rc = Validator.validator(this, obj, id);
      }
      
      if (rc && this.state.afterChange) {
        this.state.afterChange(id, timeString);
      }
      
      this.setState({
        loading: this.state.loading
      });
    },
  };
};
