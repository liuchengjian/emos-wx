<template>
	<view class="login-container">
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="login-title"> EMOS在线办公系统</view>
		<view class="login-subtitle">Ver 2050.2</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登录系统</button>
		<view class="register-container">
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			login() {
				uni.login({
					provider: "weixin",
					success: (res) => {
						let code = res.code;
						this.getLoginNet(code);
					},
					fail: (e) => {
						console.log("login", e)
					}
				})
			},
			getLoginNet(code) {
				this.$api.getLogin({
					code: code,
				}).then((res) => {
					let permission = res.data.permission;
					uni.setStorageSync("permission", permission)
					console.log(res.data)
					uni.switchTab({
						url: "../index/index"
					});
					uni.showToast({
						icon: "success",
						title: res.data.msg
					})
				}).catch((e) => {
					console.log(e)
					uni.showToast({
						icon: "error",
						title: e
					})
				})
			},
			toRegister() {
				uni.navigateTo({
					url: "../register/register"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("login.less");
</style>
