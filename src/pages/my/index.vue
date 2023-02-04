<template>
	<view class="contaniner">
		<view class="top">
			<view class="image-box">
				<image src="@/static/img/avatar2.jpg" mode="aspectFill" />
			</view>
			<p>-狮几猫</p>
			<view class="info-box">
				<view>记账天数</view>
				|
				<view>记账笔数</view>
			</view>
		</view>
		<view class="content">
			<view @tap="loginOut" v-if="loginStore.userID != -1">退出登录</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userServer from '@/api/userApi'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()

const loginOut = () => {
	uni.showModal({
		title: '提示',
		content: '是否确认退出登录',
		success: function (res) {
			if (res.confirm) {
				loginStore.logout()
				uni.navigateTo({
					url: '/pages/login/index'
				})
			} else if (res.cancel) {
				return
			}
		}
	});

}


onMounted(() => {
	console.log("homestorage", uni.getStorageSync("USER_INFORMATION"))
})

</script>

<style lang="less" scoped>
.contaniner {
	width: 100%;
	height: 100%;

	.top {
		width: 100%;
		padding: 150rpx 0 20rpx;
		background-color: #aed0ee;
		display: flex;
		flex-direction: column;
		align-items: center;

		.image-box {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.info-box {
			display: flex;
			margin-top: 20rpx;
		}
	}

	.content {
		padding: 0 40rpx;
	}
}
</style>
