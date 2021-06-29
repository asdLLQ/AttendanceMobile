<template>  
    <view class="container">  
		
		<view class="user-section">
			<view class="user-info-box">
				<view class="portrait-box" @click="onReplaceImg()">
					<image class="portrait" :src="user.avatar==null?'/static/missing-face.png':BASE_HOST+user.avatar"></image>
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
				user: '',
			}
		},
		onLoad(){
			this.getUserInfo()
			
		},
        methods: {
			getUserInfo() {
				let uid = uni.getStorageSync('uid')
				let url = '/users/' + uid
				this.http.get(url,null).then((data) => {
					this.user = data.data
					console.log("用户信息：", this.user)
				})	
			},
			onLogout() {
				uni.removeStorageSync("token")
				uni.navigateTo({
					url: '../passport/login/Login'
				})
			},
			onForgotPwd() {
				uni.navigateTo({
					url:"../passport/password/Reset"
				})
			},
			onReplaceImg() {
				const that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: async function (res) {
				        console.log(res.tempFilePaths[0]);
						let url = '/users/me/avatar'
						const r = await that.http.upload(url,res.tempFilePaths[0],'avatar')
						console.log(r)
						that.user.avatar =r.data
						// that.http.put(url,res.tempFilePaths[0]).then((res) => {
						// 	console.log("修改头像返回结果：", res.data)
						// 	that.user = res.data
						// })
				    }
				});
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
	}
	
</style>