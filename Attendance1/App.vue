<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// tabbar中间按钮点击事件
			uni.onTabBarMidButtonTap(()=>{
				uni.showActionSheet({
				    itemList: ['创建班课', '通过班课号加入班课', '扫码加入班课'],
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
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "./static/iconfont.css";
	/*每个页面公共css */
	.page {
		background: #007AFF;
	}
	
	
	.rong-icon {
	  width: 64upx;
	  height: 64upx;
	  border-radius: 50%;
	  background-size: cover;
	}
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yiguoqi1:before {
		content: "\e700";
	}

	.icon-iconfontshanchu1:before {
		content: "\e619";
	}

	.icon-iconfontweixin:before {
		content: "\e611";
	}

	.icon-alipay:before {
		content: "\e636";
	}

	.icon-shang:before {
		content: "\e624";
	}

	.icon-shouye:before {
		content: "\e626";
	}

	.icon-shanchu4:before {
		content: "\e622";
	}

	.icon-xiaoxi:before {
		content: "\e618";
	}

	.icon-jiantour-copy:before {
		content: "\e600";
	}

	.icon-fenxiang2:before {
		content: "\e61e";
	}

	.icon-pingjia:before {
		content: "\e67b";
	}

	.icon-daifukuan:before {
		content: "\e68f";
	}

	.icon-pinglun-copy:before {
		content: "\e612";
	}

	.icon-dianhua-copy:before {
		content: "\e621";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-xuanzhong2:before {
		content: "\e62f";
	}

	.icon-gouwuche_:before {
		content: "\e630";
	}

	.icon-icon-test:before {
		content: "\e60c";
	}

	.icon-icon-test1:before {
		content: "\e632";
	}

	.icon-bianji:before {
		content: "\e646";
	}

	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}

	.icon-zuoshang:before {
		content: "\e613";
	}

	.icon-jia2:before {
		content: "\e60a";
	}

	.icon-huifu:before {
		content: "\e68b";
	}

	.icon-sousuo:before {
		content: "\e7ce";
	}

	.icon-arrow-fine-up:before {
		content: "\e601";
	}

	.icon-hot:before {
		content: "\e60e";
	}

	.icon-lishijilu:before {
		content: "\e6b9";
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}

	.icon-naozhong:before {
		content: "\e64a";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}

	.icon-jia1:before {
		content: "\e61c";
	}

	.icon-bangzhu1:before {
		content: "\e63d";
	}

	.icon-arrow-left-bottom:before {
		content: "\e602";
	}

	.icon-arrow-right-bottom:before {
		content: "\e603";
	}

	.icon-arrow-left-top:before {
		content: "\e604";
	}

	.icon-icon--:before {
		content: "\e744";
	}

	.icon-zuojiantou-up:before {
		content: "\e605";
	}

	.icon-xia:before {
		content: "\e62d";
	}

	.icon--jianhao:before {
		content: "\e60b";
	}

	.icon-weixinzhifu:before {
		content: "\e61a";
	}

	.icon-comment:before {
		content: "\e64f";
	}

	.icon-weixin:before {
		content: "\e61f";
	}

	.icon-fenlei1:before {
		content: "\e620";
	}

	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}

	.icon-Group-:before {
		content: "\e688";
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-forward:before {
		content: "\e607";
	}

	.icon-tuijian:before {
		content: "\e610";
	}

	.icon-bangzhu:before {
		content: "\e679";
	}

	.icon-share:before {
		content: "\e656";
	}

	.icon-yiguoqi:before {
		content: "\e997";
	}

	.icon-shezhi1:before {
		content: "\e61d";
	}

	.icon-fork:before {
		content: "\e61b";
	}

	.icon-kafei:before {
		content: "\e66a";
	}

	.icon-iLinkapp-:before {
		content: "\e654";
	}

	.icon-saomiao:before {
		content: "\e60d";
	}

	.icon-shezhi:before {
		content: "\e60f";
	}

	.icon-shouhoutuikuan:before {
		content: "\e631";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-dizhi:before {
		content: "\e614";
	}

	.icon-fenlei:before {
		content: "\e706";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-tuandui:before {
		content: "\e633";
	}

	.icon-zuanshi:before {
		content: "\e615";
	}

	.icon-zuo:before {
		content: "\e63c";
	}

	.icon-shoucang2:before {
		content: "\e62e";
	}

	.icon-shouhuodizhi:before {
		content: "\e712";
	}

	.icon-yishouhuo:before {
		content: "\e71a";
	}

	.icon-dianzan-ash:before {
		content: "\e617";
	}





	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}
	.border-all{
		position: relative;
	}
	.border-all:after{
		position: absolute;
			top: 0;
			left: 0;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			width: 200%;
			height: 200%;
			border: 1px solid #E5EAF0;
			border-radius: inherit;
			content: " ";
			-webkit-transform: scale(.5);
			-ms-transform: scale(.5);
			transform: scale(.5);
			-webkit-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			transform-origin: 0 0;
			pointer-events: none;
			border-radius: 50%;
	}
	.border-bootom{
		position: relative;
	}
	.border-bootom:after{
		position: absolute;
			top: 0;
			left: 0;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			width: 200%;
			height: 200%;
			border-bottom: 1px solid #E5EAF0;
			border-radius: inherit;
			content: " ";
			-webkit-transform: scale(.5);
			-ms-transform: scale(.5);
			transform: scale(.5);
			-webkit-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			transform-origin: 0 0;
			pointer-events: none;
	}
	.border-top{
		position: relative;
	}
	.border-top:after{
		position: absolute;
			top: 0;
			left: 0;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			width: 200%;
			height: 200%;
			border-top: 1px solid  #E5EAF0;
			border-radius: inherit;
			content: " ";
			-webkit-transform: scale(.5);
			-ms-transform: scale(.5);
			transform: scale(.5);
			-webkit-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			transform-origin: 0 0;
			pointer-events: none;
	}
	.border-info{
		position: relative;
	}
	.border-info:after{
		position: absolute;
			top: 0;
			left: 0;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			width: 200%;
			height: 200%;
			border-radius: 20rpx;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			border: 1px solid  #E5EAF0;
			border-top: 0;
			content: " ";
			-webkit-transform: scale(.5);
			-ms-transform: scale(.5);
			transform: scale(.5);
			-webkit-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			transform-origin: 0 0;
			pointer-events: none;
	}
	
</style>
