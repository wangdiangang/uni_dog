// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const { promises } = require("fs");
const { get } = require("https");

// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	sum(){
		const db = uniCloud.database() //代码块为cdb
		const rs= db.collection('resume').get();
		return new Promise((resolve,reject)=>rs.then(res=>{
			 console.log('这是啥',res);
			 resolve(res.data)
		}).catch(err=>{
			reject(err)
			console.log(err);
		}))
		
	},
	async getQuotes(){
		const db = uniCloud.database() //代码块为cdb		
		const rs= db.collection('quotes').limit(500).get();
		return new Promise((resolve,reject)=>rs.then(res=>{
			 console.log('这是啥',res);
			 resolve(res.data)
		}).catch(err=>{
			reject(err)
			console.log(err);
		}))
	}
	// 新增 add()
	// 引用 doc()
	// 获取 get()
	// 计数 count()
	// 条件 where()
	// 设置起始位置 skip()
	// 数据返回排序 orderBy()
	// 设置查询数量 limit()
	// 返回指定字段 field()
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	/* 
	method1(param1) {
		// 参数校验，如无参数则不需要
		if (!param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	}
	*/
}
