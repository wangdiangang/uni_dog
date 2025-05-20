<template>
  <view class="container">
    <!-- 分类标签栏 -->
    <scroll-view scroll-x class="tab-bar" :scroll-left="scrollLeft">
      <view 
        v-for="(item, index) in tabs" 
        :key="index" 
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{ item.name }}
      </view>
    </scroll-view>

    <!-- 厂商列表 -->
    <view class="vendor-list">
      <view 
        v-for="(vendor, idx) in filteredVendors" 
        :key="idx" 
        class="vendor-card"
        @click="toVendorDetail(vendor.id)"
      >
        <image crossorigin="anonymous" class="logo" :src="vendor.logo" mode="aspectFit"></image>
        <view class="info">
          <text class="name">{{ vendor.name }}</text>
          <text class="type">{{ vendor.type }}</text>
          <text class="desc">{{ vendor.desc }}</text>
        </view>
        <view class="tag" :style="{ backgroundColor: getTagColor(vendor.tag) }">
          {{ vendor.tag }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      scrollLeft: 0,
      tabs: [
        { name: '全部', type: 'all' },
        { name: '国内', type: 'domestic' },
        { name: '国际', type: 'international' },
        { name: '互联网', type: 'internet' },
        { name: '高校', type: 'university' },
        { name: '创业公司', type: 'startup' },
        { name: '云计算', type: 'cloud' },
        { name: '大模型', type: 'llm' },
        { name: 'AIGC', type: 'aigc' },
        { name: '芯片', type: 'chip' }
      ],
      vendors: [
        // 国内厂商
        {
          id: 1,
          name: '百度AI',
          logo: 'https://example-cdn.com/logos/baidu.png',
          type: '大模型/云计算',
          desc: '文心大模型、飞桨深度学习平台',
          tag: '国内',
          category: ['all', 'domestic', 'internet', 'llm', 'cloud']
        },
        {
          id: 2,
          name: '阿里云',
          logo: 'https://example-cdn.com/logos/alibaba.png',
          type: '云计算/AI平台',
          desc: '通义千问大模型、PAI平台',
          tag: '国内',
          category: ['all', 'domestic', 'internet', 'llm', 'cloud']
        },
        // 国际厂商
        {
          id: 3,
          name: 'OpenAI',
          logo: 'https://example-cdn.com/logos/openai.png',
          type: '大模型研究',
          desc: 'ChatGPT、GPT系列模型',
          tag: '国际',
          category: ['all', 'international', 'llm']
        },
        {
          id: 4,
          name: 'Google DeepMind',
          logo: 'https://example-cdn.com/logos/deepmind.png',
          type: 'AI研究',
          desc: 'AlphaGo、Gemini大模型',
          tag: '国际',
          category: ['all', 'international', 'llm']
        },
        // 高校机构
        {
          id: 5,
          name: '清华智谱',
          logo: 'https://example-cdn.com/logos/thu.png',
          type: '大模型研究',
          desc: 'ChatGLM系列大语言模型',
          tag: '高校',
          category: ['all', 'university', 'llm']
        },
        {
          id: 6,
          name: '中科院自动化所',
          logo: 'https://example-cdn.com/logos/cas.png',
          type: 'AI基础研究',
          desc: '紫东太初多模态大模型',
          tag: '高校',
          category: ['all', 'university']
        },
        // 创业公司
        {
          id: 7,
          name: '商汤科技',
          logo: 'https://example-cdn.com/logos/sensetime.png',
          type: '计算机视觉',
          desc: '日日新大模型、AI医疗',
          tag: '创业公司',
          category: ['all', 'startup', 'aigc']
        },
        {
          id: 8,
          name: 'MiniMax',
          logo: 'https://example-cdn.com/logos/minimax.png',
          type: '大模型应用',
          desc: 'ABAB大模型、AI对话',
          tag: '创业公司',
          category: ['all', 'startup', 'llm']
        },
        // 芯片厂商
        {
          id: 9,
          name: 'NVIDIA',
          logo: 'https://example-cdn.com/logos/nvidia.png',
          type: 'AI芯片',
          desc: 'GPU加速计算、CUDA生态',
          tag: '国际',
          category: ['all', 'international', 'chip']
        },
        {
          id: 10,
          name: '寒武纪',
          logo: 'https://example-cdn.com/logos/cambricon.png',
          type: 'AI芯片',
          desc: '云端/终端AI加速芯片',
          tag: '国内',
          category: ['all', 'domestic', 'chip']
        },
        // AIGC领域
        {
          id: 11,
          name: 'Midjourney',
          logo: 'https://example-cdn.com/logos/midjourney.png',
          type: 'AI绘画',
          desc: '文生图模型、艺术创作',
          tag: '国际',
          category: ['all', 'international', 'aigc']
        },
        {
          id: 12,
          name: 'Stability AI',
          logo: 'https://example-cdn.com/logos/stability.png',
          type: 'AI生成',
          desc: 'Stable Diffusion模型',
          tag: '国际',
          category: ['all', 'international', 'aigc']
        },
        // 更多厂商...
        {
          id: 13,
          name: '华为昇腾',
          logo: 'https://example-cdn.com/logos/ascend.png',
          type: 'AI计算',
          desc: '昇腾芯片、MindSpore框架',
          tag: '国内',
          category: ['all', 'domestic', 'chip', 'cloud']
        },
        {
          id: 14,
          name: '腾讯云',
          logo: 'https://example-cdn.com/logos/tencent.png',
          type: '云计算/AI',
          desc: '混元大模型、TI平台',
          tag: '国内',
          category: ['all', 'domestic', 'internet', 'cloud']
        }
      ]
    }
  },
  computed: {
    filteredVendors() {
      if (this.currentTab === 0) return this.vendors
      const type = this.tabs[this.currentTab].type
      return this.vendors.filter(v => v.category.includes(type))
    }
  },
  methods: {
    switchTab(index) {
      this.currentTab = index
      this.scrollLeft = (index - 2) * 60
    },
    toVendorDetail(id) {
      uni.navigateTo({
        url: `/pages/ai-vendor/detail?id=${id}`
      })
    },
    getTagColor(tag) {
      const colors = {
        '国内': '#f5222d',
        '国际': '#1890ff',
        '高校': '#722ed1',
        '创业公司': '#13c2c2'
      }
      return colors[tag] || '#fa8c16'
    }
  }
}
</script>

<style lang="scss">
/* 样式部分保持不变 */
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.tab-bar {
  white-space: nowrap;
  width: 100%;
  height: 80rpx;
  background: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  
  .tab-item {
    display: inline-block;
    padding: 0 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #666;
    
    &.active {
      color: #1890ff;
      font-weight: bold;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 4rpx;
        background-color: #1890ff;
        border-radius: 2rpx;
      }
    }
  }
}

.vendor-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  
  .vendor-card {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    position: relative;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
    
    .logo {
      width: 100rpx;
      height: 100rpx;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
    }
    
    .info {
      display: flex;
      flex-direction: column;
      
      .name {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
        color: #333;
      }
      
      .type {
        font-size: 24rpx;
        color: #666;
        margin-bottom: 8rpx;
      }
      
      .desc {
        font-size: 24rpx;
        color: #999;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    
    .tag {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      padding: 4rpx 12rpx;
      border-radius: 20rpx;
      font-size: 20rpx;
      color: white;
    }
  }
}
</style>
