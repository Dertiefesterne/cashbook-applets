<template>
	<view class="contaniner">
		<view class="top">
			<view class="image-box">
				<image src="@/static/img/avatar2.jpg" mode="aspectFill" />
			</view>
			<view class="name-box" @click="toEditName">{{ loginStore.info.nickname }}<u-icon name="edit-pen-fill"
					size="20"></u-icon></view>
			<view class="info-box">
				<view class="text">记账天数 {{ timestamp ? formattereTools.dataDays(timestamp.toString()) : 0 }}</view>
				<view class="gap">|</view>
				<view>记账笔数 {{ bill_count }}</view>
			</view>
		</view>
		<view class="content">
			<view class="menu-item" @click="toEditInfo">个人信息 <u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item" @click="toEditClassify">类别管理<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item" @click="toEditLabel">惯用词管理<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item">购物清单<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item">切换主题<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item">关于我们<u-icon name="arrow-right"></u-icon></view>
			<!-- <view @click="loginOut" v-if="loginStore.userID != -1" class="menu-item">退出登录<u-icon
					name="arrow-right"></u-icon>
			</view> -->
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userServer from '@/api/userApi'
import formattereTools from '@/utils/dataUtils'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()

// 用户注册时间
const timestamp = loginStore.info.register_timestamp
const bill_count = loginStore.info.bill_count || 0

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
}, toEditName = () => {
	uni.navigateTo({
		// url: `/pages/editInfo/editName?name=${loginStore.info.nickname}`
		url: '/pages/editInfo/editName'
	})
}, toEditLabel = () => {
	uni.navigateTo({
		url: '/pages/editInfo/editLabel'
	})
}, toEditInfo = () => {
	uni.navigateTo({
		url: '/pages/editInfo/editMyInfo'
	})
}, toEditClassify = () => {
	uni.navigateTo({
		url: '/pages/editInfo/editClassify'
	})
}


onMounted(() => {
	// console.log("homestorage", uni.getStorageSync("USER_INFORMATION"))
})

</script>

<style lang="less" scoped>
page {
	height: 100%
}

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

		.name-box {
			display: flex;
		}

		.info-box {
			display: flex;
			margin-top: 20rpx;

			.gap {
				margin: 0 30rpx;
			}

			text {
				text-align: center;
			}
		}
	}

	.content {
		background-color: #f8f8fa;
		padding: 20rpx 0;
		height: 100%;

		.menu-item {
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
		}
	}
}
</style>
