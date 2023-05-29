<template>
  <div>
    <Ywatermark info="仅供娱乐使用" v-show="watermark"></Ywatermark>

    <div class="bg_money">￥</div>
    <div class="money">
      <span>我的零钱</span>
      <span>
        <span>￥</span>
        {{ money }}.00
      </span>
    </div>
    <div class="line">
      <div class="left">
        <img src="./zuanshi.png" alt="" />
      </div>
      <div class="mid">
        <span>转入零钱通，能赚又能花</span>
        <span>零钱通七日年化2.15%，资金不闲置</span>
      </div>
      <div class="right">
        <img src="./right.png" alt="" />
      </div>
    </div>
    <div class="btn">
      <button @click="chongzhi">充值</button>
      <button @click='tixian'>提现</button>
    </div>
    <div class="problem">
      <span>常见问题</span>
      <span>本服务由财付通提供</span>
    </div>
	<input v-model.trim="showVal" class="uni-input" password type="text" placeholder="密码" v-if="showpas==20"/>
  </div>
</template>

<script>
import Ywatermark from "@/components/Ywatermark"; //引入组件

export default {
  components: {
    Ywatermark, //注册组件
  },
  data() {
    return {
		showpas:0,
		showVal:'',
		watermark:true,
		isCharging:false,
      money: 163,
	  timer:null,
	  setVal:null
    };
  },
  onLoad() {
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    }); //可分享
	this.setInter()
  },
  watch:{
	  "isCharging":{
		  handler(val){
			  if(val){
				  this.begin()
			  }else{
				 clearInterval(this.timer)
			  }
		  }
		  
	  }
  },
  methods: {
	  setInter(){
		 this.setVal=setInterval(()=>{
		  	this.getBatteryInfo();
		  },1000)
	  },
    getBatteryInfo() {
      uni.getBatteryInfo({
        success: (res) => {
			// console.log('电量',res)
			this.isCharging=res.isCharging
        },
      });
    },
    begin() {
      this.timer=setInterval(()=>{
		  if(this.money>8897987576){
			  clearInterval(this.timer)
		  }else{
			  this.money+=26
		  }
	  },20)
    },
	chongzhi(){
		this.showpas++
	},
	tixian(){
		if(this.showVal=='cptbtptpbcptdtptp'){
			this.watermark=false
			this.showpas=0
		}
		
	}
  },
};
</script>

<style scoped>
.bg_money {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160rpx;
  height: 160rpx;
  font-size: 100rpx;
  border-radius: 50%;
  color: #fff;
  background-color: #f6c444;
  margin: 100rpx auto 0;
}
.money {
  display: flex;
  justify-content: center;

  flex-direction: column;
  align-items: center;
}
.money span:nth-of-type(1) {
  margin-top: 60rpx;
  font-size: 40rpx;
}
.money span:nth-of-type(2) {
  margin-top: 20rpx;
  font-size: 80rpx;
  font-weight: 500;
}
.money span:nth-of-type(2) span {
  font-size: 50rpx;
  margin-top: 0px;
  position: relative;
  top: -20rpx;
}
.line {
  height: 160rpx;
  border-bottom: 1rpx solid #e6e6e6;
  border-top: 1rpx solid #e6e6e6;
  width: 90%;
  margin: 60rpx auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.line .left {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background-color: #f7f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.line .left img {
  width: 80rpx;
  height: 80rpx;
}
.line .mid {
  display: flex;
  flex-direction: column;
}
.line .mid span:nth-of-type(1) {
  font-size: 32rpx;
}
.line .mid span:nth-of-type(2) {
  font-size: 24rpx;
}
.line .right img {
  width: 40rpx;
  height: 50rpx;
}
.btn {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 200rpx;
}
.btn button {
  width: 350rpx;
  height: 90rpx;
  background-color: #57bd6d;
  border-radius: 20rpx;
  color: #fff;
  font-size: 36rpx;
}
.btn button:nth-of-type(2) {
  background-color: #f2f2f2;
  color: #57bd6d;
  margin-top: 30rpx;
}
.problem {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170rpx;
}
.problem span:nth-of-type(1) {
  font-size: 30rpx;
  color: #606a83;
}
.problem span:nth-of-type(2) {
  font-size: 24rpx;
}
.uni-input{
	padding-left: 40rpx;
	opacity: 0.1;
}
</style>