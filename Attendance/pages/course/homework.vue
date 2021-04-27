<template>
	<view>
		作业
		<textarea v-model="data">
		
		</textarea>
	</view>
</template>

<script>
	export default {
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
