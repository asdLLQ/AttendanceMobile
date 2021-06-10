<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<!-- @blur="InputBlur" :adjust-position="false" -->
				<input @focus="InputFocus" type="text" placeholder="搜索班课" confirm-type="search"></input>
			</view>
			<view class="action">
				<text class="cuIcon-add" @click="showModal" data-target="bottomModal"></text>				
			</view>
		</view>
		<view v-if="role === 0">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey text-lg flex">工程实践</view>
						<view class="text-gray text-df flex">任课老师：
							<text>池芝标 </text>
						</view>
					</view>
					<view class="action">
						<button class="text-grey text-sm">查看详情</button>
						<button class="text-grey text-sm">签到</button>
					</view>
				</view>
				<view class="cu-item margin-top">
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey  text-xsl flex">工程训练</view>
						<view class="text-gray text-df flex">任课老师：
							<text>池芝标 </text>
						</view>
					</view>
					<view class="action">
						<button class="text-grey text-sm">查看详情</button>
						<button class="text-grey text-sm">签到</button>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey text-lg flex">工程实践</view>
						<view class="text-gray text-df flex">任课老师：
							<text>池芝标 </text>
						</view>
					</view>
					<view class="action">
						<button class="text-grey text-sm">查看详情</button>
						<button class="text-grey text-sm">发起签到</button>
					</view>
				</view>
				<view class="cu-item margin-top">
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey  text-df flex">工程训练</view>
						<view class="text-gray text-df flex">任课老师：
							<text>池芝标 </text>
						</view>
					</view>
					<view class="action">
						<button class="text-grey text-sm">查看详情</button>
						<button class="text-grey text-sm" @click="showModal">发起签到</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 0代表学生，1代表教师
				role: 1,
				modalName: null,
				imageUrl:"../../static/course-default.png",
				
			}
		},
		// onLoad (options) {
		// 	role = option
		// },
		methods: {
			showModal(e) {
				uni.showActionSheet({
				    itemList: ['一键签到', '限时签到', '手势签到'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex === 0) {
							console.log("A1");
							uni.navigateTo({
								url: '../course/addCourse',
							})
						} else if(res.tapIndex === 1) {
							console.log("B1");
						} else {
							console.log("C1");
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style>
	image {
		width: 100upx;
		height: 100upx;
		border-radius: 20%;
	}
	
	button {
		width:160upx;
		height: 50upx;
		margin-top: 20upx;
	}
</style>

