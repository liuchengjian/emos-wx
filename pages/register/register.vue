<template>
	<view class="register-container">
		<image src="../../static/logo-2.png" class="logo" mode="widthFix"></image>
		<view class="register-container-box">
			<input type="text" placeholder="请输入你的邀请码" class="register-code" maxlength="6" v-model="registerCode" />
			<view class="register-desc">
				管理员创建员工证账号后，你可以在个人邮箱中获得注册邀请码
			</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">注册</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerCode: ""
			};
		},
		methods: {
			register() {
				let that = this;
				if (this.registerCode === null || this.registerCode.length === 0) {
					uni.showToast({
						icon: "none",
						title: "邀请码不能为空"
					})
					return;
				} else if (/^[0-9]{6}$/.test(this.registerCode) === false) {
					uni.showToast({
						icon: "none",
						title: "邀请码必须是6位数字"
					})
					return;
				}
				uni.login({
					provider: "weixin",
					success: (res) => {
						let code = res.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: (resp) => {
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl;
								this.getRegisterNet(code, nickName, avatarUrl);
							},
							fail: (e) => {
								console.log("getUserInfo", e)
							}
						})
					},
					fail: (e) => {
						console.log("login", e)
					}
				})
			},
			 getRegisterNet(code, nickName, photo) {
				 this.$api.getRegister({
					code: code,
					nickname: nickName,
					photo: photo,
					registerCode: this.registerCode
				}).then((res)=>{
					let permission = res.data.permission;
					uni.setStorageSync("permission",permission)
					console.log(res.data)
					uni.switchTab({
						url: "../index/index"
					});
					uni.showToast({
						icon: "success",
						title: res.data.msg
					})
				}).catch((e)=>{
					console.log(e)
					uni.showToast({
						icon: "error",
						title: e
					})
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.register-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.logo {
			width: 70%;
			margin-top: 10%;
		}

		.register-container-box {
			width: 70%;
			margin-top: 2%;

			.register-code {
				border: solid 1px $uni-border-color;
				font-size: 14px;
				color: $uni-font-size-base;
				text-align: center;
				background-color: #f5f5f5;
				border-radius: 10px;
				margin-bottom: 10px;
				height: 30px;
				padding: 0 22px;
			}

			.register-desc {
				color: #999999;
				font-size: 16px;
				line-height: 1.5;
			}
		}

		.register-btn {
			width: 60%;
			position: absolute;
			bottom: 20%;
			left: 20%;
			background-color: #3474ff;
			color: #fff;
			box-sizing: border-box;

			&:active {
				background-color: #0052ff;
			}
		}

	}
</style>
