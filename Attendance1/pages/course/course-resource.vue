<template>
	<view>
		资源
		<textarea v-model="data">
		
		</textarea>
		<view>
			<view-tabbar tabIndex=1></view-tabbar>
		</view>
		
	</view>
</template>

<script>
	import Tabbar from '@/components/tab-course.vue'
	export default {
		components: {
			'view-tabbar': Tabbar
		}, 
		data() {
			return {
				data:[],
				test:[],
			}
		},
		onLoad(options) {
			this.data = options.data;
			//this.test = options.test;
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
