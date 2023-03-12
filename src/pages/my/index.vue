<template>
	<view class="contaniner">
		<view class="top">
			<view class="image-box">
				<image :src="avaSrc" mode="aspectFill" @click="previewImg" />
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
			<view class="menu">
				<view class="item" @click="toEditInfo">
					<svg-icon iconName="icon-gerenxinxi" className="big-size"></svg-icon>
					<p>个人信息</p>
				</view>
				<view class="item" @click="toEditClassify"> <svg-icon iconName="icon-fenlei"
						className="big-size"></svg-icon>
					<p>类别管理</p>
				</view>
				<view class="item" @click="toEditLabel"> <svg-icon iconName="icon-biaoqian" className="big-size"></svg-icon>
					<p>惯用词管理</p>
				</view>
				<view class="item"> <svg-icon iconName="icon-qingdan" className="big-size"></svg-icon>
					<p>购物清单</p>
				</view>
				<view class="item"> <svg-icon iconName="icon-zhuti" className="big-size"></svg-icon>
					<p>切换主题</p>
				</view>
				<view class="item" @click="toEditCode"> <svg-icon iconName="icon-drxx04" className="big-size"></svg-icon>
					<p>修改密码</p>
				</view>
			</view>
			<view class="menu-item">使用手册<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item">建议反馈<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item">关于我们<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item">导出账单<u-icon name="arrow-right"></u-icon></view>
			<view class="cancellation" @click="loginOut">退出登录</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userServer from '@/api/userApi'
import formattereTools from '@/utils/dataUtils'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()

const avaSrc = loginStore.avatar ? loginStore.avatar : '/static/img/defaultAvatar.png'
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
}, toEditCode = () => {
	uni.navigateTo({
		url: '/pages/editInfo/editCode'
	})
}, previewImg = () => {
	let imgsArray = [];
	imgsArray[0] = loginStore.avatar;
	uni.previewImage({
		current: 0,
		urls: imgsArray
	});
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
			border: 4px solid rgba(101, 101, 101, 0.4);

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
		height: 86%;
		// overflow-y: auto;

		.menu {
			margin-bottom: 20rpx;
			padding: 40rpx 0 10rpx;
			background-color: #fff;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;
			}
		}

		.menu-item {
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
		}

		.cancellation {
			margin: 0 auto;
			margin-top: 40rpx;
			width: 75%;
			line-height: 90rpx;
			text-align: center;
			height: 90rpx;
			background: rgba(174, 208, 238, 0.5);
			border-radius: 6rem;
			font-weight: bold;
			font-size: 30rpx;
		}
	}


}
</style>
