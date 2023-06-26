<template>
	<div>
		<button @click="start">开始</button>
				<button @tap="startRecord">开始录音</button>
		<button @tap="endRecord">停止录音</button>

	</div>
</template>

<script>
	const recorderManager = uni.getRecorderManager();

	export default{
		data(){
			return{
				
			}
		},
		onLoad(){
		recorderManager.onFrameRecorded(function (res) {
			console.log('recorder onFrameRecorded' ,res);
				});
	
		},
		methods:{
			start(){
				console.log('开始');
			},
			startRecord() {
						console.log('开始录音');
			
						recorderManager.start({
							duration: 10000,
							sampleRate: 44100,
							numberOfChannels: 1,
							encodeBitRate: 192000,
							format: 'mp3',
							frameSize: 5
						});
					},
					endRecord() {
						console.log('录音结束');
						recorderManager.stop();
					},
		}
	}
</script>

<style>
</style>