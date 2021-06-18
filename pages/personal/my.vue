<template>  
    <view class="container">  
		
		<view class="user-section">
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="'/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">Hi，请登录！</text>
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
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
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="课程记录"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="忘记密码" ></list-cell>
				<list-cell icon="icon-share" iconColor="#9789f7" title="设置" tips=""></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="退出登录" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
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
			}
		},
		onLoad(){
		},

        methods: {
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			// navTo(url){
			// 	if(!this.hasLogin){
			// 		url = '/pages/public/login';
			// 	}
			// 	uni.navigateTo({  
			// 		url
			// 	})  
			// }, 
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
	  border-radius: 10upx;
	}

	.user-section{
		height: 400upx;
		padding: 100upx 30upx 0;
		position:relative;
		background: #5083a8;
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
		height: 80upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			margin-left: 50upx;
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			padding-left: 50upx;
			font-size: 40upx;
			color: white;
			margin-left: 20upx;
		}
	}

	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>