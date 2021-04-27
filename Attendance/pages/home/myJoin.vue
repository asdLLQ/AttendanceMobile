<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 2" :key="index" @tap="tabSelect" :data-id="index">
					Tab{{index}}
				</view>                                                                                                                                                                                                            
			</view>
		</scroll-view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索班课" confirm-type="search"></input>
			</view>
			<view class="action">
				<text class="cuIcon-close"></text>
				<text>取消</text>
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey">工程实践</view>
					<view class="text-gray text-sm flex">任课老师：
						<view class="text-cut">
							池芝标
						</view> 
					</view>
					<view class="text-gray text-sm flex">任课周期：
						<view class="text-cut">
							1-18周
						</view> 
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">签到</view>
				</view>
			</view>
			<view class="cu-item ">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-pink"><view class="text-cut">工程训练</view></view>
					<view class="text-gray text-sm flex">任课老师：
						<view class="text-cut">
							池芝标
						</view> 
					</view>
					<view class="text-gray text-sm flex">任课周期：
						<view class="text-cut">
							1-18周
						</view> 
					</view>
				</view>
				<view class="action">
					<!-- <image></image> -->
					<view class="text-grey text-xs">签到</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import "/checkui/main.css";
	@import "/checkui/icon.css";
</style>
