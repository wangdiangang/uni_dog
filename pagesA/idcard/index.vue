<template>
	<div class="idcard">
		<div class="title">身份证号码归属地查询</div>
		<div class="query">
			<input type="text" v-model.trim="idNumber" :placeholder="placeholder">
			<i v-show='error'>*身份证号码输入不正确</i>
			<button @click="query" class="btn">查询</button>
		</div>
		<div v-if='errorContent' class="error_content">查询不到归属地</div>
		<div class="conten" v-show='address&&!errorContent'>
			<div>
				<span>归属地：</span>
				<span>{{address}}</span>
			</div>
			<div>
				<span>生日:</span>
				<span>{{birth}}</span>
			</div>
			<div>
				<span>性别:</span>
				<span>{{gender}}</span>
			</div>
			<div>
				<span>年龄:</span>
				<span>{{nianling}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import citysJson from './citys.json'
	export default{
		data(){
			return{
				errorContent:false,
				idNumber:'',
				placeholder:'请输入身份证号',
				error:false,
				address:'',
				birth:'',
				gender:'',
				nianling:""
			}
		},
		methods:{
			query(){
				    let arg=/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
					if(!arg.test(this.idNumber)){
						console.log('不符合')
						this.error=true
						return
					}
				
				
				this.error=false
				let data=citysJson
				console.log(citysJson);
				let idNumber=this.idNumber
						let provincialCode=idNumber.slice(0,2)
				        let cityCode =idNumber.slice(2,4)
				        let countyCode=idNumber.slice(4,6)
				        let birthCode=idNumber.slice(6,14)
				        let genderCode=idNumber.slice(16,17)
				
				       let provincial= data.find(item=>{
				            return item.code==provincialCode
				        })
						if(!provincial){
							this.errorContent=true
							return false
						}
				        let provincialName=provincial.val
				        let city=provincial.citys.find(item=>item.code==cityCode)
						if(!city){
							this.errorContent=true
							return false
						}
				        let cityName=city.val
				        let countyName
				        if(city.citys){
				        let county=city.citys.find(item=>item.code==countyCode)
						if(!county){
							this.errorContent=true
							return false
						}
				        countyName=county.val 
				        }else{
				            countyName=''
				        }
						let date=new Date().getFullYear()
				        console.log(provincialName,cityName,countyName,birthCode,genderCode);
						this.errorContent=false
						this.address=provincialName+'-'+cityName+(countyName?'-'+countyName:countyName)
						this.birth=birthCode.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
						this.gender=genderCode%2?"男":"女"
						this.nianling=date-(birthCode.slice(0,4))
			}
		}
	}
</script>

<style>
	.title{
		font-size: 50rpx;
		margin: 60rpx;
		    color: lightseagreen;
		    break-after: avoid;
	}
	.idcard{
			height: calc(100vh - 40rpx);
		    margin: 20rpx;
		    background: #fdfdfd;
		    /* opacity: 0.4; */
	}
	.query{
		position: relative;
	}
	.query input{
		height: 100rpx;
		border:1rpx solid rgb(64, 192, 87);
		border-radius: 20rpx;
		font-size: 40rpx;
		color:rgb(64, 192, 87);
		padding-left: 20rpx;
		width: 550rpx;
		margin-left: 66rpx;
	}
	i{
		position: absolute;
		    color: red;
		    font-size: 24rpx;
			margin-left: 80rpx;
	}
	
	.btn {
	  width: 300rpx;
	  height: 100rpx;
	  background: rgb(64, 192, 87);
	  color: #fff;
	  border-radius: 33rpx;
	  line-height: 100rpx;
	  font-size: 50rpx;
	  margin-top: 40rpx;
	}
	.conten {
		padding: 60rpx;
	}
	.conten div{
		margin-top: 30rpx;
	}
	.conten div:nth-of-type(1){
		display: flex;
		flex-direction: column;
		min-height: 150rpx;
	}
	.conten div span{
			display: inline-block;
			font-size: 46rpx;
			margin-top: 20rpx;
			color: #0ad1f3;
	}
	
	.conten div span:nth-of-type(1){
			width: 110rpx;
			color: greenyellow;
	}
	.conten div:nth-of-type(1) span:nth-of-type(1){
			width: 200rpx;
	}
	.conten div span:nth-of-type(2){
			margin-left: 30rpx;
			
	}
	.conten div:nth-of-type(1) span:nth-of-type(2){
			margin-left: 0;
	}
	.error_content{
		text-align: center;
		color: red;
		font-size: 80rpx;
		    margin-top: 80rpx;
	}
</style>