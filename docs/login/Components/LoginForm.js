'use strict';

import React from 'react';
import { Form, Input,Icon } from 'antd';
const FormItem = Form.Item;

let Common = require('../../public/script/common');
let Utils = require('../../public/script/utils');
import FormUtil from '../../lib/Components/FormUtil';
import '../Components/style.scss';


//components
module.exports = {
	layout: 'horizontal',
	colWidth: [6, 12, 18, 24],
 
	initForm(data){
		data.userName = '';
      	data.no = '';
	},

	getFormRule: function (form, attrList)
	{
		var attrMap = {};
		if (attrList) {
			var count = attrList.length;
			for (var x = 0; x < count; x++) {
				var {
					name,
					...attrs
				} = attrList[x];

				if (attrs) attrMap[name] = attrs;
			}
		}

		var rules = [
			{ id: 'userName', desc: '账号', ownMin: 5,ownMax: 15, ...attrMap.userName },
		  { id: 'passwd', desc: '密码', allowSpecialChar:true , ownMin: 5, ownMax: 15, ...attrMap.passwd },
		];

		return rules;
	},
	
	getForm: function (form, data, attrList, labelWidths, layout) {
		if (!labelWidths) {
			labelWidths = [16, 8, 6, 5];
		}
		
		var attr = FormUtil.getParam(form, attrList);
		var attrMap = attr.attrMap;

		if (!layout) {
			layout = this.layout;
		}

		var layoutItem = 'form-item-' + layout;
		var itemLayouts = FormUtil.getItemLayout(layout, labelWidths);
		
		var hints = form.state.hints;
		var items = [
			<FormItem {...itemLayouts[3] } key ="userName"  help={hints.userNameHint} validateStatus={hints.userNameStatus}  className={layoutItem} >
				<div className="lz-login">
					<span className="lz-login-span" style={form.state.userEmpty || hints.userNameStatus?{borderBottomColor:'red'}:{borderBottomColor:''}}>
						<span className="lz-login-prefix">账号</span>
						<input className="lz-login-lg" placeholder="" type="text" name="userNameLogin" id="userName"  {...attrMap.userName}
							value={data.userName} onChange={form.handleOnChange}/>
						<span>
							<i className="lz-input-icon user-icon"></i>
						</span>
					</span>
				</div>
			</FormItem>,
			<FormItem {...itemLayouts[3] } key ="passwd" help={hints.passwdHint} validateStatus={hints.passwdStatus}  className={layoutItem} >
				<div className="lz-login">
					<span className="lz-login-span" style={form.state.errMsg || hints.passwdStatus?{borderBottomColor:'red'}:{borderBottomColor:''}}>
						<span className="lz-login-prefix">密码</span>
						<input className="lz-login-lg"  name="passwd" id="passwd" type="password" placeholder="" {...attrMap.passwd} 
							value={data.passwd} onChange={form.handleOnChange}/>
						<span>
							<i className="lz-input-icon pwd-icon"></i>
						</span>
					</span>
				</div>
			</FormItem>,
		];
		
		return FormUtil.adjuestForm(items, attr.showMap, this.colWidth);
	},
};

