<template>
	<div class="haha">
		<h4 class="title">{{info.title}}</h4>
		<p class="content">{{info.joke}}</p>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				info:{
					title:'',
					joke:''
				}
			}
		},
		mounted(){
		this.getJoke()	
		},
		methods:{
			getJoke(){
				uniCloud
				  .callFunction({
				    name: "vvhan",
				    data: {url:'joke'},
				  }).then(res=>{
							console.log('joke',res.result)
							if(res.result.success){
								let data=res.result
								this.info=data
								
							}
						})
			}
		}
		}
</script>

<style scoped>
	.haha{
		padding: 60rpx 30rpx;
		height: 100vh;
		background-color: azure;
	}
	.title{
		font-size: 60rpx;
		text-align: center;
	}
	.content{
		margin-top: 30rpx;
		font-size: 40rpx;
		text-align: center;
	}
</style>