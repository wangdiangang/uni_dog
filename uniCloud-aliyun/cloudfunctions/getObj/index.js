'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})
	const quotes = await dbJQL.collection('quotes').limit(500).get() // 直接执行数据库操作
	//返回数据给客户端,体验版不能使用是因为要发行小程序  不是运行  是发行
	console.log('event 函数y: ',quotes.data.length,quotes, event)
	return quotes
	
};
