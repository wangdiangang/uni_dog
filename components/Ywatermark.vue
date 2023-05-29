<template>
    <view class="make">
        <view class="list">
            <view class="item" v-for="i in 500">
                <text>{{info}}</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "watermark",
        props: {
            info: {
                type: String,
                default: '全局水印'
            }
        },
        data() {
            return {

            };
        }
    }
</script>

<style lang="scss" scoped>
    .make {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0);
        pointer-events: none;

        .list {
            width: 500%;
            height: 400%;
            position: absolute;
            top: -50%;
            left: -50%;
            transform: rotate(-45deg);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            pointer-events: none;

            .item {
                font-size: 28px;
                color: rgba(220, 220, 220, 0.3);
                font-weight: bold;
                padding: 30rpx;
                pointer-events: none;
            }
        }
    }
</style>