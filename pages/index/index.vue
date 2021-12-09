<template>
	<view class="container">
		<swiper circular="true" interval="8000" duration="1000" class="swiper">
			<swiper-item>
				<image mode="widthFix"
					src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-1.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-2.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-3.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-4.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-5.jpg"></image>
			</swiper-item>
		</swiper>
		<view class="notify-container">
			<view class="notify-title">
				<image src="../../static/icon-1.png" mode="widthFix" class="notify-icon"></image>
				<view>消息提醒</view>
			</view>
			<view class="notify-content">你有{{unreadRows}}条未读消息</view>
			<image src="../../static/icon-2.png" mode="widthFix" class="more-icon"></image>
		</view>
		<view class="nav-container">
			<view class="nav-row">
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-1.png" class="icon"
					@tap="toPage('在线签到','../checkin/checkin')"
					></image>
					<text class="name">在线签到</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-2.png" class="icon"></image>
					<text class="name">员工健康</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-3.png" class="icon"></image>
					<text class="name">在线请假</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-4.png" class="icon"></image>
					<text class="name">公务出差</text>
				</view>
			</view>
			<view class="nav-row">
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-5.png" class="icon"></image>
					<text class="name">员工日报</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-6.png" class="icon"></image>
					<text class="name">我的加班</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-7.png" class="icon"></image>
					<text class="name">付款申请</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-8.png" class="icon"></image>
					<text class="name">费用报销</text>
				</view>
			</view>
			<view class="nav-row">
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-9.png" class="icon"></image>
					<text class="name">公告通知</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-10.png" class="icon"></image>
					<text class="name">在线审批</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-11.png" class="icon"></image>
					<text class="name">物品领用</text>
				</view>
				<view class="nav">
					<image mode="widthFix" src="../../static/nav-12.png" class="icon"></image>
					<text class="name">采购申请</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unreadRows: 0
			}
		},
		onLoad() {

		},
		methods: {
			toPage(name, url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeeef4;
	}

	.container {
		.swiper {
			height: 200px;

			image {
				width: 100%;
			}
		}

		.notify-container {
			padding: 5px;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-bottom: 10px;

			.notify-title {
				display: flex;
				align-items: center;
				flex-direction: row;

				.notify-icon {
					margin-right: 5px;
					width: 14px;
				}
			}

			.notify-content {
				font-size: $uni-font-size-base;
				color: $uni-text-color;

				&:before {
					display: inline-block;
					content: "";
					width: 12rpx;
					height: 12rpx;
					border: 6rpx;
					background-color: red;
					margin-left: 18px;
					margin-right: 7px;
					vertical-align: 3rpx;
				}
			}

			.more-icon {
				position: absolute;
				top: 215px;
				right: 0px;
				width: 30px;
			}
		}

		.nav-container {
			background-color: #fff;
			margin-bottom: 10px;
			padding: $uni-spacing-col-base $uni-spacing-row-base;

			.nav-row {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;

				.nav {
					text-align: center;

					.icon {
						width: 40px;
					}

					.name {
						display: block;
						font-size: $uni-font-size-base;
						color: $uni-text-color;
					}
				}
			}
		}
	}
</style>
