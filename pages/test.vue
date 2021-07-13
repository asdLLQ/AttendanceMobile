<template>
	<view>
		<button @click="doget()">获取</button>
		<view>address:
			<view>{{address}}</view>
			<view>{{address}}</view>
		</view>
		<view>result:
			<view>{{res}}</view>
		</view>
	</view>
</template>

<script>
	import {getMyLocation} from '../util/util.js'
	export default {
		data() {
			return {
				address: [],
				res:'',
			}
		},
		async onShow(){
			const that = this
			console.log("start")
			uni.getLocation({
				type: 'gcj02',
				geocode: true, //设置该参数为true可直接获取经纬度及城市信息
				success: function(res) {
					that.res = res
					//console.log(res)
					var data = [res.longitude, res.latitude]
					console.log("data",data)
					that.address = data
				},
				fail: function(err) {
					console.log("Location Fail",err)
					//console.log("Location Fail code",AMapLocation.getErrorCode())
					uni.showModal({
						title: '获取地址失败，将导致部分功能不可用',
						icon: 'none',
						duration:10000,
					});
					that.address = err
				},
			});
		},
		methods: {
			doget() {
				// this.address = await getMyLocation();
				uni.showModal({
					title: this.address,
					icon: 'none',
					duration:10000,
				});
				console.log(this.address)
			}
		}
	}
</script>

<style>

</style>
