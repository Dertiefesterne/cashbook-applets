<template>
    <view class="container">
        <headTop> <template v-slot:title>
                个人信息
            </template></headTop>
        <view class="content">
            <view>我的头像</view>
            <view>我的账号</view>
        </view>
        <view>修改密码</view>
        <view>退出登录</view>
        <view>注销账号</view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoServer from '@/api/userInfoApi';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)

onMounted(() => {
    // name.value = loginStore.info.nickname
    // console.log('用户昵称', loginStore.info.nickname)
})

const modifyNickName = async () => {
    console.log('modifyNickName', name.value)
    const params = { userID: loginStore.userID, nickname: name.value }
    const res = await userInfoServer.updateInfo(params)
    if (res.statusCode == 200) {
        uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
        })
        loginStore.setInfoName(name.value)
        uni.switchTab({
            url: '/pages/my/index'
        })
    }
}
</script>


<style lang="less" scoped>
.container {

    .content {
        padding: 100rpx 140rpx 0;

        input {
            width: 100%;
            border-bottom: 2px solid rgb(58, 58, 58);
            margin: 100rpx 0 120rpx;
            font-size: 34rpx;
            font-weight: 600;
        }

        button {
            background: rgba(174, 208, 238, 0.5);
            border-radius: 6rem;

            &::after {
                border: none;
            }
        }
    }

}
</style>