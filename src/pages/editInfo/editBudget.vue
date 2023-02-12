<template>
    <view class="container">
        <headTop>本月预算</headTop>
        <view class="content">
            <input v-model="budget" maxlength="15" type="number" />
            <button hover-class='none' @click="modifyBudget">确认修改</button>
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
const budget = ref(loginStore.info.budget)

const modifyBudget = async () => {
    console.log('modifyNickName', budget.value)
    const params = { userID: loginStore.userID, budget: budget.value }
    const res = await userInfoServer.updateInfo(params)
    if (res.statusCode == 200) {
        uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
        })
        loginStore.setInfoBudget(budget.value)
        uni.switchTab({
            url: '/pages/index/index'
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