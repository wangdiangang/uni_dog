<template>
	<div class="yanbian">
<h3>知识搅拌机</h3>
	<div  v-if="!msgData"></div>
	<div v-else>
		<p>{{msgData}}</p>
		
		<button class="btn" @click="next">下一个</button>
	</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				msgIndex:0,
				total:0,
				msgData: '',
				yanbianData:[]
			}
		},
		onLoad(){
			this.getYanbian()
		},
		methods:{
			getYanbian(){
				uniCloud.callFunction({
					name:'getYanbian'
				}).then(res=>{
					console.log('hello 延边',res);
					this.yanbianData=res.result.data
					this.msgData=this.yanbianData[0].content
					this.total=res.result.data.length
				})
			},
			next(){
				
				this.msgIndex+=1
				if(this.msgIndex>=this.total){
					this.msgIndex=0
				}
				this.msgData=this.yanbianData[this.msgIndex].content
			}
		},

	}
</script>

<style>
	.yanbian{
		height: 100vh;
		background-color: #eae9e9;
		/* padding: 40rpx; */
	}
	.yanbian p{
		    height: 900rpx;

		    border: 1rpx solid #ccc;
		    padding: 20rpx;
		    overflow: auto;
			font-size: 40rpx;
	}
	h3{
		text-align: center;
		    font-size: 60rpx;
			margin-bottom:80rpx;
			padding-top: 40rpx;
	}
	.btn {
	  width: 300rpx;
	  height: 100rpx;
	  background: rgb(64, 192, 87);
	  color: #fff;
	  border-radius: 33rpx;
	  line-height: 100rpx;
	  font-size: 50rpx;
	  margin-top: 70rpx;
	}
</style>