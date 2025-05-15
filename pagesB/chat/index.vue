
<template>
  <view class="chat-container">
    <!-- 消息列表区域 -->
    <scroll-view 
      class="message-list" 
      scroll-y 
      :scroll-top="scrollTop"
      scroll-with-animation
    >
      <view 
        v-for="(item, index) in messages" 
        :key="index"
        :class="['message-item', item.role]"
      >
        <view class="message-content">
          {{ item.content }}
        </view>
      </view>
    </scroll-view>

    <!-- 输入框区域 -->
    <view class="input-area">
      <input 
        class="input-box" 
        v-model="inputText" 
        placeholder="请输入消息..."
        @confirm="sendMessage"
      />
      <button class="send-btn" @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { role: 'assistant', content: '你好！我是AI助手，有什么可以帮您？' }
      ],
      inputText: '',
      scrollTop: 0
    }
  },
  methods: {
    sendMessage() {
      if (!this.inputText.trim()) return;
      
      // 添加用户消息
      this.messages.push({
        role: 'user',
        content: this.inputText
      });
      
      // 模拟AI回复（实际应调用API）
      setTimeout(() => {
        this.messages.push({
          role: 'assistant',
          content: '这是AI的回复内容'
        });
        this.scrollToBottom();
      }, 800);
      
      this.inputText = '';
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.scrollTop = 99999; // 足够大的值确保滚动到底部
      });
    }
  }
}
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10rpx;
  box-sizing: border-box;
}

.message-list {
  flex: 1;
  overflow: auto;
  padding: 20rpx;
}

.message-item {
  margin-bottom: 30rpx;
  display: flex;
}

.message-item.user {
  justify-content: flex-end;
}

.message-item.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 20rpx;
  border-radius: 10rpx;
  word-break: break-word;
}

.user .message-content {
  background-color: #95ec69;
  color: #000;
}

.assistant .message-content {
  background-color: #f1f1f1;
  color: #333;
}

.input-area {
  display: flex;
  padding: 20rpx;
  border-top: 1rpx solid #eee;
}

.input-box {
  flex: 1;
  border: 1rpx solid #ddd;
  border-radius: 40rpx;
  padding: 20rpx;
  margin-right: 20rpx;
}

.send-btn {
  background-color: #07c160;
  color: white;
  border-radius: 40rpx;
  padding: 0 40rpx;
}
</style>
