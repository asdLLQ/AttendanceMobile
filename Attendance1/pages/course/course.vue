<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索班课" confirm-type="search"></input>
			</view>
			<view class="action">
				<text class="cuIcon-add" @click="showModal" data-target="bottomModal"></text>				
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey  text-sm flex">工程实践</view>
					<view class="text-gray text-sm flex">任课老师：
						<text>池芝标 </text>
					</view>	
					<view class="choose text-gray  text-sm flex">
						<view><text class="icon-qiandao"></text>签到</view>
						<view><text class="icon-jushou"></text>举手</view>
						<view><text class="icon-xiaoxi"></text>抢答</view>
					</view>
				</view>
				<view class="action">
					<!-- <view class="text-grey text-xs">签到</view> -->
					<text class="cuIcon-jiantou"></text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-grey  text-sm flex">工程实践</view>
					<view class="text-gray text-sm flex">任课老师：
						<text>池芝标 </text>
					</view>	
					<view class="choose text-gray  text-sm flex">
						<view><text class="icon-qiandao"></text>签到</view>
						<view><text class="icon-jushou"></text>举手</view>
						<view><text class="icon-xiaoxi"></text>抢答</view>
					</view>
				</view>
				<view class="action">
					<!-- <view class="text-grey text-xs">签到</view> -->
					<text class="cuIcon-jiantou"></text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
			}
		},
		methods: {
			showModal(e) {
				uni.showActionSheet({
				    itemList: ['创建班课', '通过班课号加入班课', '扫码加入班课'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex === 0) {
							console.log("A");
						} else if(res.tapIndex === 1) {
							console.log("B");
						} else {
							console.log("B");
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style>
	@import "/checkui/main.css";
	@import "/checkui/icon.css";
	@import "/checkui/iconCourse.css";
	.choose{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>

