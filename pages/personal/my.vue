<template>  
    <view class="container">  
		
		<view class="user-section">
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="'/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="username">{{user.realName}}</view>
					<view class="academicId">{{user.academicId}}</view>
				</view>
			</view>
		</view>
		
		<view class="cover-container">
			<image class="arc" src="/static/arc.png"></image>
			
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">128</text>
					<text>经验值</text>
				</view>
				<view class="tj-item">
					<text class="num">1</text>
					<text>开课中班课</text>
				</view>
				<view class="tj-item">
					<text class="num">2</text>
					<text>已结束班课</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item"   >
					<text class="yticon icon-shouye"></text>
					<text>我的空间</text>
				</view>
				<view class="order-item" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>我的收藏</text>
				</view>
				<view class="order-item" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>心意卡片</text>
				</view>
			</view>
			
			<view class="history-section icon">
				<view @click="onForgotPwd()"><list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="忘记密码"></list-cell></view>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="课程记录" ></list-cell>
				<list-cell icon="icon-share" iconColor="#9789f7" title="设置" tips=""></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell>
				<view  @click="onLogout()"><list-cell icon="icon-shezhi1" iconColor="#e07472" title="退出登录" border=""></list-cell></view>
			</view>
		</view>	
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';

    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				user: '',
			}
		},
		onLoad(){
			this.getUserInfo()
		},
        methods: {
			getUserInfo() {
				let that = this
				let uid = uni.getStorageSync('uid')
				let url = '/users/' + uid
				that.$myRequest.requestWithToken(url, 
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("用户信息：", res.data)
						that.user = res.data.data
					} 
				})
			},
			onLogout() {
				uni.removeStorageSync("token")
				uni.navigateTo({
					url: '../passport/login/Login'
				})
			},
			onForgotPwd() {
				
			}
        }  
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10rpx;
	}

	.user-section{
		height: 400rpx;
		padding: 100rpx 30rpx 0;
		position:relative;
		background: #4aa7a8;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 80rpx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		color: #FFFFFF;
		.portrait{
			margin-left: 50rpx;
			width: 130rpx;
			height: 130rpx;
			border:5rpx solid #fff;
			border-radius: 50%;
		}
		.username{
			padding-left: 40rpx;
			font-size: 40rpx;
		}
		.academicId{font-size: 30rpx;padding:20rpx 40rpx;}
	}

	.cover-container{
		background: $page-color-base;
		margin-top: -150rpx;
		padding: 0 30rpx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20rpx;
		.arc{
			position:absolute;
			left: 0;
			top: -34rpx;
			width: 100%;
			height: 36rpx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140rpx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8rpx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28rpx 0;
		margin-top: 20rpx;
		.order-item{
			@extend %flex-center;
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48rpx;
			margin-bottom: 18rpx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44rpx;
		}
	}
	.history-section{
		padding: 30rpx 0 0;
		margin-top: 20rpx;
		background: #fff;
		border-radius:10rpx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40rpx;
			margin-left: 30rpx;
			.yticon{
				font-size: 44rpx;
				color: #5eba8f;
				margin-right: 16rpx;
				line-height: 40rpx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30rpx 30rpx 0;
			image{
				display:inline-block;
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
	
</style>