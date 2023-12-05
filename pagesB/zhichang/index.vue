<template>
    <div class="zhichang">
        <img :src="url" alt="" srcset="">
    </div>
</template>
<script>
export default {
    data() {
        return {
            url:''
        }
    },
    onLoad() {
        this.getzhichang()
    },
    onShow() {
    },
    methods:{
        getzhichang(){
            uniCloud
				  .callFunction({
				    name: "vvhan",
				    data: {url:'zhichang'},
				  }).then(res=>{
                     this.url=res.result.url
                  })
        }
    }
}
</script>
<style scoped>
.zhichang {
    padding: 30rpx;
    width: 100%;
    height: calc(100vh - 60rpx);
    background: #eee;
    display: flex;
    align-items: center;
}
img{
    width: 90%;
    height: 80%;
}
</style>