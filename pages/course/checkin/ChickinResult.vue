<template>
	<view>
		<view>
			<view>未签到</view>
			<stu-list name="张三" number="200327062" descrip="缺勤"></stu-list>
		</view>
		<view>
			<view>已签到</view>
			<stu-list name="张三" number="200327062" descrip="已签到"></stu-list>
		</view>
		<view class="footer">
			<button class="cu-btn bg-cyan lg">返回班课页</button>
		</view>
	</view>
</template>

<script>
	import StuList from '@/components/stu-list/Stu-list.vue'
	export default {
		components: {
			'stu-list': StuList
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.footer {
		position: absolute;
		bottom: 10rpx;
		left: 290rpx
	}
</style>
