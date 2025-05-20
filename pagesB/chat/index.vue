
<template>
  <view class="chat-container">
    <scroll-view 
      class="message-list" 
      scroll-y 
      :scroll-top="scrollTop"
      scroll-with-animation
      :style="{paddingBottom: inputAreaHeight + 'px'}"
    >
      <view 
        v-for="(item, index) in messages" 
        :key="index"
        :class="['message-item', item.role]"
      >
        <view class="avatar">
          <text>{{ item.role === 'user' ? '我' : 'AI' }}</text>
        </view>
        <view class="message-content">
          {{ item.content }}
        </view>
      </view>
    </scroll-view>
	<view class="input-area-out">
    <view class="input-area" @touchstart="measureInputHeight">
      <input 
        class="input-box" 
        v-model="inputText" 
        placeholder="请输入消息..."
        @confirm="sendMessage"
      />
      <button class="send-btn" @click="sendMessage">发送</button>
    </view>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		loading:false,
      messages: [
        { role: 'assistant', content: '你好！我是AI助手' }
      ],
      inputText: '',
      scrollTop: 0,
      inputAreaHeight: 0
    }
  },
  mounted() {
    this.measureInputHeight()
  },
  methods: {
	  getChat(inputText){
		  console.log('执行');
		  this.loading=true
		 uniCloud
		 	  .callFunction({
		 	    name: "getchat",
		 	    data: {message:inputText},
				timeout: 50000
		 	  }).then(res=>{
		         // console.log('123',res);
				 this.messages.pop()
				 let content=res.result.content
				 this.messages.push({
					 content,
					 role:'assistant'
				 })
				 this.loading=false
				 this.$nextTick(() => {
				   this.scrollToBottom();
				 });
		       }).catch(err=>{
				   this.loading=false
				    this.messages.pop()
				   uni.showToast({
				   				 icon:'none',
				              title: "生成失败，重新生成",
				              });
			   })
	  },
    sendMessage() {
      if (!this.inputText.trim()) return;
		if(this.loading){
			 uni.showToast({
				 icon:'none',
			            title: "生成中。。。",
			            });
						return
		}
      this.messages.push({
        role: 'user',
        content: this.inputText
      });
	  this.messages.push({
	  	role:'assistant',
		content:'生成中。。。'
	  })
       this.getChat(this.inputText)
      this.inputText = '';

    },
    scrollToBottom() {
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this);
        query.select('.message-list').boundingClientRect(res => {
          this.scrollTop = res.height * 2;
        }).exec();
      });
    },
    measureInputHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.input-area').boundingClientRect(res => {
        this.inputAreaHeight = res.height;
      }).exec();
    }
  }
}
</script>

<style>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 100rpx;
}

.message-list {
  flex: 1;
  padding: 20rpx;
}

.message-item {
  display: flex;
  margin-bottom: 30rpx;
  align-items: flex-start;
}

.message-item.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #07c160;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin: 0 20rpx;
}

.user .avatar {
  background: #1989fa;
}

.message-content {
  max-width: 60%;
  padding: 20rpx;
  border-radius: 10rpx;
  word-break: break-word;
}

.assistant .message-content {
  background: #f1f1f1;
}

.user .message-content {
  background: #95ec69;
}
.input-area-out{
	position: fixed;
	bottom: 0;
	width: 100%;
}
.input-area {
  padding: 20rpx;
  border-top: 1px solid #eee;
  display: flex;
  background: white;
}

.input-box {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 40rpx;
  padding: 20rpx;
  margin-right: 20rpx;
}

.send-btn {
  background: #07c160;
  color: white;
  border-radius: 40rpx;
  padding: 0 30rpx;
}
</style>
