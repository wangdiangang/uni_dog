<template>
	<view class="flip">
		<view class="wraper">
			<view class="column" :style="{transform: `translateY(${-lineHeight*index6}px)`}">
				<view class="num" v-for="(item, index) in arr6" :key="index">{{ item }}</view>
			</view>
			
			<view class="column" :style="{transform: `translateY(${-lineHeight*index5}px)`}">
				<view class="num" v-for="(item, index) in arr5" :key="index">{{ item }}</view>
			</view>
			
			<view class="dian">:</view>
			
			<view class="column" :style="{transform: `translateY(${-lineHeight*index4}px)`}">
				<view class="num" v-for="(item, index) in arr4" :key="index">{{ item }}</view>
			</view>
			
			<view class="column" :style="{transform: `translateY(${-lineHeight*index3}px)`}">
				<view class="num" v-for="(item, index) in arr3" :key="index">{{ item }}</view>
			</view>
			
			<view class="dian">:</view>
			
			<view class="column" :style="{transform: `translateY(${-lineHeight*index2}px)`}">
				<view class="num" v-for="(item, index) in arr2" :key="index">{{ item }}</view>
			</view>
			
			<view class="column" :style="{transform: `translateY(${-lineHeight*index1}px)`}">
				<view class="num" v-for="(item, index) in arr1" :key="index">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineHeight: 64, //跟字体大小和wraper的高度相关！
				// 秒
				arr1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				index1: 0, //就是获取真实时间后的起始数字
				arr2: [0, 1, 2, 3, 4, 5],
				index2: 0,
				// 分
				arr3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				index3: 0,
				arr4: [0, 1, 2, 3, 4, 5],
				index4: 0,
				// 时
				arr5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				index5: 0,
				arr6: [0, 1, 2],
				index6: 0,
			}
		},
		created() {
			this.getTime()
		},
		watch: {
			index5(newVal) {
				// 超过24小时
				if (this.index6 === 2 && newVal===4) {
					console.log('out')
					for (let i=1; i<7; i++) {
						this[`index${i}`] = 0
					}
				}
			}
		},
		methods: {
			getTime() {
				const date = new Date()
				let hour = this.bu0(date.getHours()) 
				let minute = this.bu0(date.getMinutes()) 
				let second = this.bu0(date.getSeconds()) 
				
				// 测试用
				// let hour = ['1', '9']
				// let minute = ['5', '9']
				// let second = ['5', '5']
				
				// 秒
				this.index1 = parseInt(second[1])
				this.index2 = parseInt(second[0])
				// 分
				this.index3 = parseInt(minute[1])
				this.index4 = parseInt(minute[0])
				// 时
				this.index5 = parseInt(hour[1])
				this.index6 = parseInt(hour[0])
				
				this.turnSecond(this.arr1.length)
			},
			bu0(num) {
				let str
				if (num < 10) str = `0${num}`
				else str = `${num}`
				return str.split('')
			},
			turnSecond (length) {
				setInterval(()=> {
					if (this.index1 === length-1) {
						// console.log(1)
						// 通知前一位移动
						this.turnOther( 2, this.arr2.length)
						this.index1 = -1
					}
					this.index1++
				}, 1000)
			},
			turnOther(type, length) {
				// type代表第几组数列，例如2，就是从右往左第二列
				if (this[`index${type}`] === length-1) {
					// console.log(type)
					// 通知前一位移动
					let next = type+1
					this.turnOther( next, this[`arr${next}`].length)
					
					this[`index${type}`] = -1
				}
				this[`index${type}`]++
			}
 		}
	}
</script>

<style lang="scss" scoped>
	:root {
	  --bai-bg-color: #fff;
	}
	.dian{
		color: var(--bai-bg-color);
	}
	.flip{
		padding-top:160rpx;
	}
	.wraper {
		text-align: center;
		// background-color: #ffffff;
		height: 64px;
		font-family: "Microsoft YaHei";
		font-size: 48px;
		font-weight: bolder;
		letter-spacing: 7px;
		// margin-top: 7px;
		display: flex;
		justify-content: center;
		overflow: hidden;
		.column {
			transition: transform 300ms;
			// background-color: #fff;
			color: var(--bai-bg-color);
			.num {
				// background-color: #fff;
				height: 64px;
			}
		}
	}
</style>
