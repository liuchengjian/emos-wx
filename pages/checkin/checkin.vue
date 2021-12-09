<template>
	<view class="container">
		<view class="camera-box">
			<camera device-position="front" flash="off" @error="error" class="camera" v-if="showCamera"></camera>
			<image mode="widthFix" class="image" :src="photoPath" v-else></image>
		</view>
		<view class="operate-container">
			<button type="primary" class="btn" @tap="clickBtn" :disabled="!canCheckin">{{btnText}}</button>
			<button type="warn" class="btn" @tap="afresh" :disabled="!canCheckin">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事项</text>
			<text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				canCheckin: true,
				photoPath: '',
				btnText: '拍照',
				showCamera: true,
			};
		},
		onLoad() {
			qqmapsdk = new QQMapWX({
				key: 'UTOBZ-XZQCQ-L6E55-GVGDX-LDKMT-NEF2M'
			})
		},
		onShow() {
			this.$api.validCancheckIn().then((res) => {
				let msg = res.data.msg;
				if (msg !== "可以考勤") {
					this.canCheckin = true;
					setTimeout(() => {
						uni.showToast({
							title: msg,
							icon: "none"
						})
					}, 1000);
				}
			})
		},
		methods: {
			clickBtn() {
				let baseUrl = this.$api.getBaseUrl();
				if (this.btnText === "拍照") {
					uni.navigateTo({
						url:"../checkin_result/checkin_result"
					});
					return;
					//拍照
					const ctx = uni.createCameraContext();
					ctx.takePhoto({
						quality: 'high',
						success: (res) => {
							this.photoPath = res.tempImagePath
							console.log("photoPath", this.photoPath)
							this.showCamera = false;
							this.btnText = "签到"
						}
					});
				} else {
					//签到
					uni.showLoading({
						title: "签到中请稍等"
					});
					let path = this.photoPath;
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							let longitude = res.longitude;
							let latitude = res.latitude;
							// console.log('当前位置的经度：' + res.longitude);
							// console.log('当前位置的纬度：' + res.latitude);
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: latitude,
									longitude: longitude
								},
								success(resp) {
									console.log(resp.result);
									let address = resp.result.address;
									let addressComponent = resp.result.address_component;
									let nation = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let district = addressComponent.district;
									let data = {
										address: address,
										nation: nation,
										province: province,
										city: city,
										district: district
									}
									console.log(path);
									uni.uploadFile({
										url: baseUrl + "/checkin/checkin",
										filePath: path,
										name: "photo",
										header: {
											token: uni.getStorageSync("token")
										},
										formData: {
											address: data.address,
											country: data.nation,
											province: data.province,
											city: data.city,
											district: data.district
										},
										success(respp) {
											console.log(respp)
											if (respp.statusCode === 500 && respp.data ==
												"不存在人脸模型") {
												uni.hideLoading();
												//签到
												uni.showLoading({
													title: "创建人脸识别模型"
												});
												uni.showModal({
													title: "提示信息",
													content: "EMOS系统中不存在你的人脸识别模型，是否用当前这张照片作为人脸识别模型？",
													success(ress) {
														if (ress.confirm) {
															uni.uploadFile({
																url: baseUrl +
																	"/checkin/createFaceModel",
																filePath: path,
																name: 'photo',
																header: {
																	token: uni
																		.getStorageSync(
																			"token"
																		)
																},
																success(res) {
																	console
																		.log(
																			res
																		)
																	if(res.statusCode==500){
																		uni.showToast({
																			title:resp.data,
																			icon:"none"
																		})
																	}
																	else if(res.statusCode==200){
																		uni.showToast({
																			title:"人脸建模成功",
																			icon:"none"
																		})
																	}
																}
															});
														}
													}

												})
											} else if (respp.statusCode === 200) {
												let data = JSON.parse(respp.data);
												let code = data.code;
												let msg = data.msg;
												if (code === 200) {
													uni.hideLoading();
													uni.showToast({
														title: "签到成功",
														complete() {
															uni.navigateTo({
																url:"../checkin_result/checkin_result"
															})
														}
													})
												}
											} else if (respp.statusCode === 500) {
												uni.hideLoading();
												uni.showToast({
													title: "其他错误",
												})
											}
										},
										fail(e) {
											console.log(e)
										}
									});

								}
							})
						}
					});
					setTimeout(function() {
						this.showCamera = true;
						this.btnText = "拍照";
						uni.hideLoading();
					}, 30000);
				}
			},
			checkin(data) {
				console.log('checkin。。');

			},
			createFaceModel() {
				let path = this.photoPath;
				console.log('createFaceModel', path);

			},
			afresh() {
				this.showCamera = true;
				this.btnText = "拍照";
			},
			error(e) {
				this.showCamera = true;
				this.btnText = "拍照";
				console.log(e.detail);
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		.camera-box {
			width: 100%;
			height: 400px;

			.camera {
				width: 100%;
				height: 100%;
			}

			.image {
				width: 100%;
				height: 100%;
			}
		}

		.operate-container {
			display: flex;
			justify-content: center;
			margin-top: 50rpx;

			.btn {
				width: 40%;
				margin: 0;

				&:first-child {
					margin-right: 30rpx;
				}
			}
		}

		.notice-container {
			padding: 40rpx 60rpx;

			.notice {
				font-size: 40rpx;
				color: #333;
				font-weight: bold;
				display: block;
				margin-bottom: 15rpx;
			}

			.desc {
				display: block;
				font-size: 32rpx;
				color: #999;
				line-height: 1.6;
			}
		}
	}
</style>
