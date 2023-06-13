<template>
	<div class="ticket">
		<div class="two">
			<h3>双色球</h3>
			<div class="qiu" v-if="show">
				<span  class="span" v-for="i in 6" :key="i">
					<span class="q_span"  :style="[transform]">
						<span v-for="item in (32)" class="item" :key="item">
							<span v-if="item!=0&&item>9">{{item}}</span>
							<span v-if="item!=0&&item<9">0{{item}}</span>
						</span>
					</span>
				</span>
				<span  class="span">
					<span class="q_span blue"  :style="[transform]">
						<span v-for="item in 16" class="item" :key="item">
							<span v-if="item!=0&&item>9">{{item}}</span>
							<span v-if="item!=0&&item<9">0{{item}}</span>
						</span>
					</span>
				</span>
			</div>
			<div class="qiu" v-else>
				<span class="span" v-for="i in winArr" :key="i">
					{{i}}
				</span>
				<span class="blue span">{{winBlue}}</span>
			</div>
			<div class="btn">
				<button @click="begin">start</button>
				<button @click="stop">stop</button>
			</div>
		</div>
		<div class="line"></div>
		<div class="big">
			<h3>大乐透</h3>
			<div class="qiu" v-if='bigShow'>
				<span  class="span" v-for="i in winBigArr" :key="i">
					<span class="q_span"  :style="[bigTransform]">
						<span v-for="item in 35" class="item" :key="item">
							<span v-if="item!=0&&item>9">{{item}}</span>
							<span v-if="item!=0&&item<9">0{{item}}</span>
						</span>
					</span>
				</span>
				
				<span class="span">
					<span class="q_span blue"  :style="[bigTransform]">
						<span v-for="item in 12" class="item" :key="item">
							<span v-if="item!=0&&item>9">{{item}}</span>
							<span v-if="item!=0&&item<9">0{{item}}</span>
						</span>
					</span>
				</span>
				<span class="span">
					<span class="q_span blue"  :style="[bigTransform]">
						<span v-for="item in 12" class="item" :key="item">
							<span v-if="item!=0&&item>9">{{item}}</span>
							<span v-if="item!=0&&item<9">0{{item}}</span>
						</span>
					</span>
				</span>
			</div>
			<div class="qiu" v-else>
				<span  class="span" v-for="i in winBigArr" :key="i">
					{{i}}
				</span>
				<span class="span">
					<span class="q_span blue" >
						<span class="item" >
						{{winBigBlueArr[0]}}
						</span>
					</span>
				</span>
				<span class="span">
					<span class="q_span blue" >
						<span class="item" >
						{{winBigBlueArr[1]}}
						</span>
					</span>
				</span>
			</div>
			<div class="btn">
				<button @click="bigBegin">start</button>
				<button @click="bigStop">stop</button>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
				winArr:['01','02','03','04','05','06'],
				winBigArr:['01','02','03','04','05'],
				winBigBlueArr:['05','08'],
				winBlue:'06',
				startFlag:false,
				bigStartFlag:false,
				show:false,
				bigShow:false,
				timer:null,
				bigTimer:null,
				bigty:0,
				ty:0,
				transform:{
					transform:"translateY(0)"
				},
				bigTransform:{
					transform:"translateY(0)"
				}
			}
		},
		onload(){
		uni.showShareMenu({
		  menus: ["shareAppMessage", "shareTimeline"],
		}); //可分享	
		},
		methods:{
			random(n,arr=[]){
				if(n==15&&arr.length>=5){					
					this.winBigArr=arr.sort((a,b)=>a-b).map(item=>item=item<10?'0'+item:item+'')
					return
				}
				if(n==31&&arr.length>=6){
					this.winArr=arr.sort((a,b)=>a-b).map(item=>item=item<10?'0'+item:item+'')
					return 
				}else{
				let number=Math.round(Math.random()*n+1)
				if(!arr.includes(number)){
					arr.push(number)
				}
				this.random(n,arr)
				}
				
			},
			bigBegin(){
				
				this.random(15)
				let one =Math.round(Math.random()*12+1)
				let two=Math.round(Math.random()*12+1)
				if(two==one){
					two=Math.round(Math.random()*12+1)
					if(two==one){
						two=Math.round(Math.random()*12+1)
					}
				}
				one=one>9?one+'':'0'+one
				two=two>9?two+'':'0'+two
				this.winBigBlueArr=[one,two].sort((a,b)=>a-b)
				this.bigShow=true
				this.bigEach()
			},
			bigEach(){
				if(this.bigStartFlag){
					return
				}
				this.bigStartFlag=true
				this.bigTimer=setInterval(()=>{
					let bigty=this.bigty=this.bigty+=40
					if(bigty>15*80){
						bigty=this.bigty=0
					}
					this.bigTransform.transform=`translateY(-${bigty}rpx)`
				},80)
			},
			bigStop(){
				console.log('停止');
				this.bigShow=false
				this.bigStartFlag=false
				clearInterval(this.bigTimer)
				
			},
			begin(){
				console.log('开始');
				
				 this.random(31)
				 let winBlue=Math.round(Math.random()*15+1)
				 this.winBlue=winBlue>9?winBlue+'':'0'+winBlue
				if(this.startFlag){
					return
				}
				this.startFlag=true
				this.show=true
				this.each()
			},
			each(){
				this.timer=setInterval(()=>{
					let ty=this.ty=this.ty+=40
					if(ty>31*80){
						ty=this.ty=0
					}
					this.transform.transform=`translateY(-${ty}rpx)`
				},80)
			},
			stop(){
				clearInterval(this.timer)
				this.show=false
				this.startFlag=false
			}
		}
	}
</script>

<style scoped>
	.ticket{
		padding: 40rpx;
	}
	.two{
		
	}
	h3{
		    margin: 40rpx 0;
		    font-size: 60rpx;
	}
	.qiu{
		display: flex;
		    justify-content: space-evenly;
	}
	.qiu .span,.big .span{
		    width: 80rpx;
		    height: 80rpx;
		    display: inline-block;
		    background: #e6525c;
		    border-radius: 50%;
		    color: #f1f2e5;
		    font-size: 40rpx;
		    line-height: 80rpx;
		    text-align: center;
			overflow: hidden;
	}
	.q_span{
		display: flex;
		flex-direction: column;
		/* transform: translateY(-80rpx); */
	}
	.qiu .blue{
		background: #4e7ae8;
	}
	.btn{
		display: flex;
		margin-top: 100rpx;
	}
	.btn button{
		    width: 200rpx;
		    height: 200rpx;
		    border-radius: 50%;
		    color: #fff;
			background: #029d94;
			text-align: center;
			line-height: 200rpx;
			font-size: 60rpx;
			box-shadow: 0px 0px 10px #101010;
	}
	.btn button:nth-of-type(2){
		background: #e6525c;
	}
	.line{
		width: 100%;
		height: 0;
		border:1rpx solid #e4e1e1;
		margin:  60rpx 0;
	}
</style>