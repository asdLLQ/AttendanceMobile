<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			uni.showActionSheet({
			    itemList: ['创建班课', '通过班课号加入班课', '扫码加入班课'],
			    success: function (res) {
			        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					if(res.tapIndex === 0) {
						console.log("A1");
						uni.navigateTo({
							url: './course/addCourse',
						})
					} else if(res.tapIndex === 1) {
						console.log("B1");
						uni.navigateTo({
							url: './course/join/input-id',
						})
					} else {
						console.log("C1");
						uni.scanCode({
							scanType: ['qrCode','barCode'],
							success: function (res) {
								const cno = JSON.stringify(res.result);
								console.log('条码类型：' + res.scanType);
								uni.navigateTo({
									url:'join-class?cno='+cno
								})
							}
						});
					}
			    },
			    fail: function (res) {
			        console.log(res.errMsg);
			    }
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
