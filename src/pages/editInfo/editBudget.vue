<template>
    <view class="container">
        <headTop>
            <template v-slot:icon-l>
                <u-icon name="arrow-left" size="20" @click="toIndex"></u-icon>
            </template>
            <template v-slot:title>
                本月预算
            </template>
        </headTop>
        <view class="content">
            <input v-model="budget" maxlength="15" type="number" @input="inspectNum(budget)" />
            <button hover-class='none' @click="modifyBudget">确认修改</button>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoServer from '@/api/userInfoApi';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const infoBudget = ref(loginStore.info.budget)

const budget = ref('')


const modifyBudget = async () => {
    console.log('modifyNickName', budget.value)
    var src = ''
    let index = budget.value.indexOf('.')
    if (index != -1) {
        if (budget.value.length - index == 3) {
            console.log('两位小数')
            src = budget.value.replace('.', '')
        }
        else if (budget.value.length - index == 2) {
            console.log('1位小数')
            src = budget.value.replace('.', '') + '0'
        }
    }
    else
        src = Number(budget.value) + '00'
    const params = { userID: loginStore.userID, budget: parseInt(src) }
    const res = await userInfoServer.updateInfo(params)
    if (res.statusCode == 200) {
        uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
        })
        loginStore.setInfoBudget(parseInt(src))
        uni.switchTab({
            url: '/pages/index/index'
        })
    }
}, toIndex = () => {
    uni.switchTab({
        url: '/pages/index/index'
    })
}, inspectNum = (num: string) => {
    let dotIndex = num.indexOf('.')
    if (num.length - dotIndex > 3 && dotIndex != -1) {
        uni.showToast({ title: '最多输入两位小数', icon: 'none', duration: 800 })
        //截掉超出的最后一位
        console.log('截点前后', num, dotIndex, num.slice(0, dotIndex + 3))
        nextTick(() => {
            budget.value = num.slice(0, dotIndex + 3)
        })
    }
}

</script>


<style lang="less" scoped>
.container {
    height: 100vh;
    background-color: var(--keyBoradBg);
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