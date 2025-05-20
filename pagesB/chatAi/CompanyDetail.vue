
<template>
  <div class="detail-overlay" @click.self="emit('close')">
    <div class="detail-container">
      <button class="close-btn" @click="emit('close')">×</button>
      <div class="detail-header">
        <img :src="company.logo" :alt="company.name" class="detail-logo">
        <h2>{{ company.name }}</h2>
      </div>
      <div class="detail-content">
        <p>{{ company.detail }}</p>
        <div class="feature-list">
          <div v-for="(feature, index) in company.features" :key="index" class="feature-item">
            <i class="feature-icon"></i>
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['company'])
const emit = defineEmits(['close'])
</script>

<style scoped>
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

/* 其他CSS样式... */
</style>
