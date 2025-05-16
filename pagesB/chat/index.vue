<template>
  <web-view :src="webUrl"></web-view>
</template>

<script>
export default {
  data() {
    return {
      webUrl: "https://static-mp-22b44e68-5ea8-44ac-a0fe-80212a7ad49e.next.bspapp.com/#/pages/chat/index" // 要加载的网页地址
    };
  },
};
</script>
