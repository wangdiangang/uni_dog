<template>
  <view class="content cc-wrap">
    <view class="text-orange">{{ scripture.count }}</view>

    <view class="cc-btn-wrap">
      <view
        @tap="toggleBgSound"
        :class="['btn-ico', 'btn-sound', bgSound.active ? 'active' : '']"
        >声音</view
      >
      <view
        @tap="toggleVibrate"
        :class="['btn-ico', 'btn-vibrate', vibrate.active ? 'active' : '']"
        >振动</view
      >
      <view
        @tap="
          parseEventDynamicCode(
            autoKnocked.enable ? 'autoKnocked' : 'preAutoKnock'
          )
        "
        :class="['btn-ico', 'btn-auto', autoKnocked.enable ? 'active' : '']"
      >
        自动
      </view>
    </view>

    <view
      @tap="knock"
      :class="['muyu-wrap', knocked ? 'active' : '']"
      v-if="settings"
    >
      <view :animation="muyuAnimationData" class="muyu">
        <view>
          <image :src="settings.muyu"></image>
        </view>
      </view>
      <view :animation="stickAnimationData" class="stick">
        <view>
          <image :src="settings.gu"></image>
        </view>
      </view>
      <view class="content">
        <view class="fly" v-for="(item, i) in knockContent.data" :key="i">{{
          item
        }}</view>
      </view>
    </view>
    <!-- <view :class="['pop-wrap', 'exit-pop', videoConfirm.active ? 'active' : '']">
            <view class="content">
                <view class="mt">观看视频广告开启自动敲击？</view>
                <view class="st">一天内无需再次观看广告</view>
                <view @tap="stayPage" class="btn wait">放弃</view>
                <view @tap="autoKnock" class="btn leave">开启</view>
            </view>
        </view> -->
  </view>
</template>

<script>
// index.js
// 获取应用实例
const app = getApp();
let interstitialAd = null;
let rewardedVideoAd = null;
export default {
  data() {
    return {
       
      popHint: {
        active: false,
        model: 0,
        type: 0,
      },

      knocked: true,

      bgSound: {
        active: true,
      },

      vibrate: {
        active: true,
      },

      scripture: {
        playing: true,
        id: 0,
        count: 0,
        lyric: [],
        speed: 100,
        current: -1,
        max: 0,
        timer: null,
        animation: null,
        dataOfAni: null,
      },

      muyuAnimation: null,
      muyuAnimationData: null,
      stickAnimation: null,
      stickAnimationData: null,

      settings: {
        muyu: "",
        gu: "",
      },

      knockContent: {
        timer: 0,
        data: [],
      },

      autoKnocked: {
        enable: false,
        timer: null,
        speed: 800,
        times: 666,
        unlimited: true,
        current: 0,
      },

      videoConfirm: {
        active: false,
      },

      i: "",
    };
  },
  onLoad() {
    this.saveKnock();
    
    this.onLoadClone3389();
     
  },
  onShow() {
    this.initAnimation();
    this.reset();
  },
  onShareAppMessage() {
    return {
      title: "解压电子木鱼，净化心灵！快来试一试吧！",
      path: "/pagesA/muyu/index",
      imageUrl: "/static/images/share.jpg",
    };
  },
  onShareTimeline: function () {
    return {
      title: "解压电子木鱼，净化心灵！快来试一试吧！",
      path: "/pagesA/muyu/index",
      imageUrl: "/static/img/share.jpg",
    };
  },

  onHide(e) {
    this.reset();
  },
  methods: {
    onLoadClone3389() {
      let that = this;
      let a = {
        muyu: "/static/images/muyu.png",
        gu: "/static/images/gu.png",
        knockContent: ["功德 +1"],

        audio: {
          url: "/static/images/muyu-2.mp3",
        },

        godImg: "/static/images/god.png",

        autoKnocked: {
          enable: false,
          timer: null,
          speed: 800,
          times: 666,
          unlimited: true,
        },

        adIsOpen: true,
        chaPingAdId: "adunit-7460a7510882280a",
        videoAdId: "adunit-fe4c25747c87555f",
      };

      that.settings = a;
      that.autoKnocked = a.autoKnocked;
    },

    initAnimation: function () {
      var e = uni.createAnimation({
        duration: 100,
        timingFunction: "ease",
      });
      var n = uni.createAnimation({
        transformOrigin: "100% 50%",
        duration: 100,
        timingFunction: "ease",
      });
      var x = uni.createAnimation({
        duration: 300,
        timingFunction: "linear",
      });
 
      this.muyuAnimation = e;
      this.stickAnimation = n;
      this.scripture.animation = x;
    },

    // 事件处理函数
    toggleBgSound: function () {

      this.bgSound.active = !this.bgSound.active;
    },

    toggleVibrate: function () {
      this.vibrate.active = !this.vibrate.active;
    },
    parseEventDynamicCode(fn){
        this.autoKnocked.enable ? this.autoKnockedFun() : this.autoKnockHandle()
    },
    saveKnock(){
         uni.getStorage({
            key: 'knock',
            success:  (res)=> {
                console.log('获取了不',res.data);
                this.scripture.count=res.data
            },
            fail:()=>{
                console.log('获取不到');
                this.scripture.count=0
            }
        });
    },

    knock: function () {
      this.autoKnocked.enable || this.knockDown();
    },

    knockDown: function () {
      let that = this;
      if (that.bgSound.active) {
        that.audioFn();
      }

      that.muyuAnimationData = {};
      that.stickAnimationData = {};
      that.scripture.dataOfAni = {};

      that.muyuAnimation = that.muyuAnimation.scale(0.94).step({
        duration: 50,
      });
      that.stickAnimation = that.stickAnimation.rotate(-30).step({
        duration: 50,
      });

      (that.muyuAnimation = that.muyuAnimation.scale(1).step({
        duration: 50,
      })),
        (that.stickAnimation = that.stickAnimation.rotate(0).step({
          duration: 50,
        }));

      that.muyuAnimationData = that.muyuAnimation.export();
      that.stickAnimationData = that.stickAnimation.export();
      that.scripture.count = that.scripture.count + 1;
       uni.setStorage({
            key: 'knock',
            data:  that.scripture.count,
            success: function () {
                // console.log('success');
            }
        });
      if (that.vibrate.active) {
        uni.vibrateShort();
      }
      if (that.settings.knockContent.length > 0) {
        let knockContentData = that.knockContent.data;
        knockContentData.push(
          that.settings.knockContent[
            (Math.random() * (that.settings.knockContent.length - 1)).toFixed(0)
          ]
        );

        that.knockContent.data = knockContentData;
      }
      if (that.knockContent.data.length >= 30) {
        setTimeout(function () {
          that.knockContent.data = [];
        }, 800);
      }
      this.$nextTick(() => {
        that.muyuAnimationData = {};
        that.stickAnimationData = {};
      });
    },



    reset: function () {
   
      this.scripture.count = 0;
      (this.scripture.current = -1),
        (this.knockContent.data = []),
        (this.scripture.animation = this.scripture.animation
          .translateY(0)
          .step()),
        (this.autoKnocked.enable = false);

      this.scripture.dataOfAni = this.scripture.animation.export();

      if (this.autoKnocked && this.autoKnocked.timer) {
        clearInterval(this.autoKnocked.timer);
      }
      if (this.scripture && this.scripture.timer) {
        clearInterval(this.scripture.timer);
      }
    },

    audioFn: function () {
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = false; // 是否自动开始播放，默认为 false
      innerAudioContext.loop = false; // 是否循环播放，默认为 false
      uni.setInnerAudioOption({
        // ios在静音状态下能够正常播放音效
        obeyMuteSwitch: false,
        // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
        success: function (e) {},
        fail: function (e) {},
      });
      innerAudioContext.src = this.settings.audio.url;
      innerAudioContext.play();
    },

    videoConfirmShow: function () {
      this.videoConfirm.active = true;
    },

    stayPage: function () {
      this.videoConfirm.active = false;
    },

    preAutoKnock: function () {
      if (this.settings.adIsOpen && this.settings.videoAdId) {
        if (
          !uni.getStorageSync("lastAdTime") ||
          (uni.getStorageSync("lastAdTime") &&
            new Date().getTime() -
              (uni.getStorageSync("lastAdTime") > 43200000))
        ) {
          this.videoConfirmShow();
        } else {
          this.autoKnockHandle();
        }
      } else {
        this.autoKnockHandle();
      }
    },

    autoKnock: function () {
      this.videoConfirm.active = false;
      if (uni.createRewardedVideoAd) {
        rewardedVideoAd = uni.createRewardedVideoAd({
          adUnitId: this.settings.videoAdId,
        });
        rewardedVideoAd.onLoad(() => {
          console.log("onLoad event emit");
        });
        rewardedVideoAd.show().catch(() => {
          rewardedVideoAd
            .load()
            .then(() => rewardedVideoAd.show())
            .catch((err) => {
              this.autoKnockHandle();
            });
        });
        rewardedVideoAd.onClose((res) => {
          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖励
            uni.setStorageSync("lastAdTime", new Date().getTime());
            this.autoKnockHandle();
          } else {
            uni.showToast({
              title: "未观看结束，无法自动",
            });
            // 播放中途退出，不下发游戏奖励
          }
        });

        rewardedVideoAd.onError((err) => {
          console.log(err);
        });
      }
    },

    autoKnockedFun: function () {
      this.autoKnocked.enable = false;
      this.autoKnocked.current = 0;
      clearInterval(this.autoKnocked.timer);
    },

    autoKnockHandle: function () {
      let that = this;

      this.autoKnocked.enable = true;
      let e = function () {
        if (that.autoKnocked.unlimited) {
          that.knockDown();
        } else {
          if (that.scripture.count >= that.autoKnocked.times) {
            this.autoKnocked.enable = false;
            this.autoKnocked.current = 0;
            return clearInterval(that.autoKnocked.timer);
          } else {
            that.knockDown();
          }
        }
      };
      that.autoKnocked.timer = setInterval(e, that.autoKnocked.speed);
    },
  },
};
</script>
<style scope>
page {
  background: #000;
  color: #a8a8a8;
}
.btn-ico {
  font-size: 20rpx;
  padding-top: 50rpx;
  text-align: center;
}

.btn-setting {
  background: 50% 0 url("https://muyu.xiaolinwl.com/static/img/ico-setting.png")
    no-repeat;
  height: 40rpx;
  left: 30rpx;
  position: fixed;
  top: 40rpx;
}

.btn-setting,
.btn-setting.active {
  background-size: 40rpx 40rpx;
  width: 50rpx;
}

.btn-setting.active {
  background-image: url("https://muyu.xiaolinwl.com/static/img/ico-setting-active.png");
}

.btn-bgm {
  background: 50% 0
    url("https://muyu.xiaolinwl.com/static/img/ico-bgm-stop.png") no-repeat;
  height: 40rpx;
  position: fixed;
  right: 30rpx;
  top: 40rpx;
}

.btn-bgm,
.btn-bgm.active {
  background-size: 42rpx 40rpx;
  width: 50rpx;
}

.btn-bgm.active {
  background-image: url("https://muyu.xiaolinwl.com/static/img/ico-bgm-play.png");
}

.btn-sound {
  background: 50% 0
    url("https://muyu.xiaolinwl.com/static/img/ico-audio-stop.png") no-repeat;
  background-size: 20rpx 30rpx;
  height: 30rpx;
  position: fixed;
  right: 30rpx;
  top: 150rpx;
  width: 50rpx;
}

.btn-sound.active {
  background-image: url("https://muyu.xiaolinwl.com/static/img/ico-audio-play.png");
  background-size: 35rpx 30rpx;
  width: 50rpx;
}

.btn-vibrate {
  background: 50% 0
    url("https://muyu.xiaolinwl.com/static/img/ico-vibrate-stop.png") no-repeat;
  height: 40rpx;
  position: fixed;
  right: 30rpx;
  top: 260rpx;
  z-index: 9;
}

.btn-vibrate,
.btn-vibrate.active {
  background-size: 42rpx 40rpx;
  width: 50rpx;
}

.btn-vibrate.active {
  background-image: url("https://muyu.xiaolinwl.com/static/img/ico-vibrate-active.png");
}

.btn-auto {
  background: 50% 0
    url("https://muyu.xiaolinwl.com/static/img/ico-auto-unable.png") no-repeat;
  height: 40rpx;
  position: fixed;
  right: 30rpx;
  top: 370rpx;
}

.btn-auto,
.btn-auto.active {
  background-size: 42rpx 40rpx;
  width: 50rpx;
}

.btn-auto.active {
  background-image: url("https://muyu.xiaolinwl.com/static/img/ico-auto.png");
}

.speed {
  display: none;
  font-size: 26rpx;
  left: 90rpx;
  position: absolute;
  top: 44rpx;
}

.speed.active {
  display: block;
}

.god-img {
  height: 500rpx;
  overflow: hidden;
  position: absolute;
  top: 140rpx;
  width: 100%;
  z-index: -1;
  text-align: center;
}

.lyric .inner view {
  font-size: 36rpx;
  line-height: 60rpx;
  text-align: center;
}

.lyric .inner view.active {
  color: #fff;
}

.muyu-wrap {
  bottom: 100rpx;
  height: 364rpx;
  position: fixed;
  width: 100%;
}

.muyu-wrap.active .muyu {
  animation: ani_muyu_knock 0.06s linear alternate;
}

.muyu-wrap.active .stick {
  animation: ani_stick 0.06s linear alternate;
}

.muyu-wrap .muyu {
  margin: auto;
}

.muyu-wrap .muyu > view {
  height: 450rpx;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 450rpx;
}

.muyu-wrap .muyu > view image {
  height: 460rpx;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 460rpx;
}

.muyu-wrap .stick {
  height: 350rpx;
  position: absolute;
  right: 50rpx;
  top: -60rpx;
  width: 350rpx;
}

.muyu-wrap .stick > view {
  height: 350rpx;
  overflow: hidden;
  position: relative;
  width: 350rpx;
}

.muyu-wrap .stick > view image {
  height: 360rpx;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 360rpx;
}

.muyu-wrap .content {
  position: absolute;
  text-align: center;
  top: -100rpx;
  width: 100%;
}

.muyu-wrap .content .fly {
  animation: ani_fly 1s forwards;
  font-size: 40rpx;
  position: absolute;
  top: 0;
  width: 100%;
}

@-webkit-keyframes ani_fly {
  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -200rpx, 0);
  }
}

@keyframes ani_fly {
  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -200rpx, 0);
  }
}

@media (min-height: 680px) and (max-height: 808px) {
  .muyu {
    bottom: 210rpx;
  }
}

/* me */
.cc-wrap {
  position: relative;
  padding-top: 120rpx;
}
.text-orange {
  color: #ecd358;
  font-size: 80rpx;
  text-align: center;
  width: 100%;
}
</style>
