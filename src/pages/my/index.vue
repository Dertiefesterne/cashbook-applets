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
					<!-- <i class="iconfont icon-gerenxinxi"></i> -->
					<p>个人信息</p>
				</view>
				<view class="item" @click="toEditClassify">
					<svg-icon iconName="icon-fenlei" className="big-size"></svg-icon>
					<!-- <i class="iconfont icon-fenlei"></i> -->
					<p>类别管理</p>
				</view>
				<view class="item" @click="toEditLabel">
					<svg-icon iconName="icon-biaoqian" className="big-size"></svg-icon>
					<!-- <i class="iconfont icon-biaoqian"></i> -->
					<p>惯用词管理</p>
				</view>
				<view class="item" @click="shoppingList">
					<svg-icon iconName="icon-qingdan" className="big-size"></svg-icon>
					<!-- <i class="iconfont icon-qingdan"></i> -->
					<p>购物清单</p>
				</view>
				<view class="item" @click="changeTheme">
					<svg-icon iconName="icon-zhuti" className="big-size"></svg-icon>
					<!-- <i class="iconfont icon-zhuti"></i> -->
					<p>切换主题</p>
				</view>
				<view class="item" @click="toEditCode">
					<svg-icon iconName="icon-drxx04" className="big-size"></svg-icon>
					<!-- <i class="iconfont icon-drxx04"></i> -->
					<p>修改密码</p>
				</view>
			</view>
			<view class="menu-item" @click="exportExcel">导出账单<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item" @click="toUserManual">使用手册<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item" @click="isAdvice = true">建议反馈<u-icon name="arrow-right"></u-icon></view>
			<view class="menu-item" @click="toAboutUs">关于我们<u-icon name="arrow-right"></u-icon></view>
			<view class="cancellation-box">
				<view class="cancellation" @click="loginOut">退出登录</view>
			</view>
		</view>

		<!-- 建议与反馈弹窗 -->
		<u-popup :show="isAdvice" class="advice-popup" mode="center" @close="isAdvice = false">
			<p class="head-title">建议与反馈</p>
			<view @click="copyBtn(email)">
				<p>邮箱：{{ email }}</p>
				<p class="copy">将会尽快回复，点击可复制</p>
			</view>
			<view class="cancel" @click="isAdvice = false">取消</view>
		</u-popup>
		<!-- 下载表格弹窗 -->
		<u-popup :show="isExport" class="advice-popup" mode="center" @close="isExport = false">
			<p class="head-title">请复制下面链接前往浏览器进行下载</p>
			<view @click="copyBtn(exportExcelUrl)">
				<p>{{ exportExcelUrl }}</p>
				<p class="copy">点击可复制</p>
			</view>
			<view class="cancel" @click="isExport = false">取消</view>
		</u-popup>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app';
import userServer from '@/api/userApi'
import formattereTools from '@/utils/dataUtils'
import { useloginStore } from '@/pinia-store/login'
import billApi from '@/api/billApi';
import cut from '@/utils/publicStyle'
const loginStore = useloginStore()
const avaSrc = ref('')

const email = '1378279151@qq.com';
const exportExcelUrl = 'http://localhost:8080/bill/exportExcel/' + loginStore.userID + '/' + loginStore.passWord
onMounted(() => {
	console.log('onM----')
	if (loginStore.avatar.length)
		avaSrc.value = loginStore.avatar
	else
		avaSrc.value = '/static/img/defaultAvatar.png'
})

onShow(() => {
	console.log('oS----')
	if (loginStore.avatar.length)
		avaSrc.value = loginStore.avatar
})
// 用户注册时间
const timestamp = loginStore.info.register_timestamp
const bill_count = loginStore.info.bill_count || 0

const isAdvice = ref(false),
	isExport = ref(false)

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
}, toUserManual = () => {
	uni.navigateTo({
		url: '/pages/use/userManual'
	})
}, toAboutUs = () => {
	uni.navigateTo({
		url: '/pages/use/aboutUs'
	})
}, shoppingList = () => {
	uni.navigateTo({
		url: '/pages/use/shoppingList'
	})
}, previewImg = () => {
	let imgsArray = [];
	imgsArray[0] = loginStore.avatar;
	uni.previewImage({
		current: 0,
		urls: imgsArray
	});
}, copyBtn = (data: string) => {
	uni.setClipboardData({
		data: data,
		success: function () {
			uni.showToast({
				title: '复制成功',
			});
		},
		fail: function () {
			uni.showToast({
				title: '复制失败',
			});
		}
	});
}, changeTheme = () => {
	if (loginStore.theme == 'light') {
		cut(false)
		loginStore.setTheme('balck')
		uni.setTabBarStyle({
			"color": "#cfcfcf", // tab 上的文字默认颜色
			"selectedColor": "#3376e5", // tab 上的文字选中时的颜色
			"borderStyle": "white", // tabbar 上边框的颜色，可选值 black/white
			"backgroundColor": "#1d1d1d", // tab 的背景色
		})
	}
	else {
		cut(true)
		loginStore.setTheme('light')
		uni.setTabBarStyle({
			"color": "#bfbfbf", // tab 上的文字默认颜色
			"selectedColor": "#3376e5", // tab 上的文字选中时的颜色
			"borderStyle": "black", // tabbar 上边框的颜色，可选值 black/white
			"backgroundColor": "#ffffff", // tab 的背景色
		})
	}
}, exportExcel = async () => {
	// console.log('导出---')
	// await billApi.exportExcel()
	//弹出弹窗
	isExport.value = true

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
	height: 100vh;
	width: 100%;
	overflow-y: auto;
	color: var(--textColor);
	background-color: var(--pickerContent);
	padding-bottom: 120rpx;

	.top {
		width: 100%;
		padding: 150rpx 0 20rpx;
		background-color: var(--keyBoradHead);
		display: flex;
		flex-direction: column;
		align-items: center;

		.image-box {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 4px solid var(--imageShadow);

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.name-box {
			display: flex;
			font-size: 32rpx;
			margin-top: 10rpx;
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
		background-color: var(--pickerContent);
		// padding: 20rpx 0;

		// height: 90%;
		// // overflow-y: auto;
		.menu {
			// margin-bottom: 20rpx;
			padding: 60rpx 0 10rpx;
			background-color: var(--pickerContent);
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
			padding: 0 65rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			background-color: var(--pickerContent);
			// margin-bottom: 20rpx;
		}

		.cancellation-box {
			width: 100%;
			padding: 20rpx 0;

			.cancellation {
				margin: 0 auto;
				width: 75%;
				line-height: 90rpx;
				text-align: center;
				height: 90rpx;
				background: var(--buttonBg);
				border-radius: 6rem;
				font-weight: bold;
				font-size: 30rpx;
			}
		}
	}


}

.advice-popup {
	:deep(.u-popup__content) {
		padding: 50rpx;
		border-radius: 1rem;
		background-color: var(--menuItem);

		.head-title {
			font-size: 36rpx;
			font-weight: bolder;
			margin-bottom: 20rpx;
		}

		.copy {
			margin-top: 5rpx;
			font-size: 26rpx;
			color: var(--textLightColor);
		}

		.cancel {
			color: var(--addBtnColor);
			font-size: 34rpx;
			width: 100%;
			text-align: right;
			padding: 20rpx 20rpx 0;
		}
	}
}
</style>
