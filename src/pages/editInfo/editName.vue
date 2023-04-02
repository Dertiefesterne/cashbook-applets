<template>
    <view class="container">
        <headTop> <template v-slot:title>
                我的昵称
            </template></headTop>
        <view class="content">
            <input v-model="name" maxlength="15" />
            <button hover-class='none' @click="modifyNickName">确认修改</button>
        </view>
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
    height: 100vh;
    background-color: var(--pickerContent);
    color: var(--textColor);
    padding-bottom: 100rpx;

    .content {
        padding: 100rpx 140rpx 0;

        input {
            width: 100%;
            border-bottom: 2px solid var(--weightBorderColor);
            margin: 100rpx 0 120rpx;
            font-size: 34rpx;
            font-weight: 600;
        }

        button {
            background: var(--buttonBg2);
            border-radius: 6rem;

            &::after {
                border: none;
            }
        }
    }

}
</style>