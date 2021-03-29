<template>
	<view>
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
		我加入的
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
