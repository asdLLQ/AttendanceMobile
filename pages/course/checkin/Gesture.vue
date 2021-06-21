/**
 * 手势签到页面:
 */
<template>
	<view class="my-page">
		<view class="my-descrip">
			<view v-if="role === 0">
				通过滑动创建一个签到手势并现场传达给学生，学生输入正确手势完成签到。
			</view>
			<view v-else>
				根据老师现场传达的手势，滑动输入正确手势完成签到。
			</view>
		</view>
		<gesture-password @change="gestureChange"></gesture-password>
		
		<view class="my-button flex">
			<button class="cu-btn bg-cyan lg">重设</button>
			<button class="cu-btn bg-cyan lg">开始</button>
		</view>
	</view>	
</template>

<script>
	import gesturePassword from '../../../components/gesture/gesture-password.vue';   
	    export default {
	        components: {
	            gesturePassword
	        },
	        data() {
	            return {
					//角色选择 0-教师   1-学生根据
					role: 0,
	            }
	        },
	        methods: {
	            gestureChange(points){
	                console.log(points)
	            },
	        },
	    }
</script>

<style>
	.my-page {
		margin-top: 200rpx;
	}
	.my-descrip {
		text-align: center;
	}
	.my-button {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
	}
</style>
