<template>
	<view class="content">
		<h1>我的界面</h1>
		<view class="text-area">
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
.content {
	border: 1px solid red;
	width: 100%;
	height: 100%;
}
</style>
