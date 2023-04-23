'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const {mm,access_token}=event
	console.log('event : ', event)
	console.log('openidopenid','000',event.value);
	let openid=mm?mm.slice(3,-3):''
	let getOpenid
	if(!openid){
		 getOpenid=await uniCloud.httpclient.request(
		    `https://api.weixin.qq.com/sns/jscode2session?appid=wxd081633943377400&secret=3f841e3ad297a1a4aaad3ca6729a7d9d&js_code=${event.code}&grant_type=authorization_code `, 
			{
				method:'get',
				data: {},
				dataType: "json",
			  })
	}
		  console.log('openid--------------',openid,JSON.stringify(getOpenid));
	//返回数据给客户端
	let getToken
	if(!access_token){
		 getToken=await uniCloud.httpclient.request(
	    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd081633943377400&secret=3f841e3ad297a1a4aaad3ca6729a7d9d`, 
		{
			method:'get',
			data: {},
	      dataType: "json",
		  })
	}
	
		  console.log('getToken----------',access_token,'------',JSON.stringify(getToken));
	const res = await uniCloud.httpclient.request(
	    "https://api.weixin.qq.com/wxa/msg_sec_check?access_token="+(access_token||getToken.data.access_token), 
		{
			method:'POST',
			data: {
			      "content": event.value,
				  "version":2,
				  "scene":1,
				  "openid":openid||getOpenid.data.openid
			    },
	      dataType: "json",
		  contentType: 'json',
		  }
	)
	console.log('res-------',res.data.result);
	let result=res.data.result
	//混淆
	let strS='abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ_';
	let strE='gklmnopqrstuvwxyzabcdefhiPQRSTUVWXYZ_ABCDEFGHIGKLMNO';
	let start='',end='';
	for (let i=0;i<3;i++){
		let m=Math.floor(Math.random()*53)
		start+=strS[m]
		end+=strE[m]
	}
	console.log('start,endstart,end',start,end);
	return {
		label:result.label,
		openid:start+(openid||getOpenid.data.openid)+end,
		access_token:access_token||getToken.data.access_token
		}
};
