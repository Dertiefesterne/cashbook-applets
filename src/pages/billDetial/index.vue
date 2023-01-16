<template>
    <view v-if="billDetial">
        <view class="flex">
            <view>支出</view>
            <view>收入</view>
        </view>
        <view class="flex justify-between">
            <billTypeIconVue :classify="billDetial.classify" />
            <p class="text-50rpx font-600">{{ billDetial.money }}<sapn class="text-32rpx">元</sapn>
            </p>
        </view>
        <!-- 图标 -->
        <view class="flex justify-around mb-20rpx">
            <view v-for="index of 4" class="flex flex-col items-center">
                <billTypeIconVue :classify="index - 1" />
                <p>{{ filters.billTypeFilter(index - 1) }}</p>
            </view>
        </view>
        <view class="flex justify-around">
            <view v-for="index of 4" class="flex flex-col items-center">
                <billTypeIconVue :classify="index - 1 + 4" />
                <p>{{ filters.billTypeFilter(index - 1 + 4) }}</p>
            </view>
        </view>
        账单详情{{ billID }}
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入 
import { onLoad } from '@dcloudio/uni-app';
import { getSegement } from '@/api/TestApi'
import { deleteBill, updateBill, getBillDetial } from '@/api/billApi'
import { Bill, groupBill } from '@/entity/bill'
import filters from '@/utils/filters'
import { useloginStore } from '@/pinia-store/login'
import billTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()


const billID = ref(),
    billDetial = ref<Bill>()

onLoad((option) => {
    if (option)
        billID.value = option.billID
    // 获取账单详情
    getBillDetail()
})



/**
 * 获取获取账单详情
 */
const getBillDetail = async () => {
    const res = await getBillDetial({ userID: loginStore.userID, billID: billID.value })
    console.log("获取获取账单详情", res.data)
    billDetial.value = res.data
}
</script>

<style lang="less" scoped>
.hh {
    display: flex;
    flex-direction: row-reverse;
}
</style>
