<template>
    <view v-if="billDetial">
        <view class="flex justify-center items-center w-full h-100rpx px-40rpx fixed top-0 bg-#999 z-2">
            <view class="mx-20rpx h-full lh-100rpx" :class="{ 'chooseBorder': chooseType == -1 }"
                @click="changeChoose(-1)">
                支出</view>
            <view class="mx-20rpx h-full lh-100rpx" :class="{ 'chooseBorder': chooseType == 1 }"
                @click="changeChoose(1)">
                收入</view>
        </view>
        <view class="pt-100rpx">
            <view class="flex flex-row-reverse my-20rpx mr-40rpx">
                <p class="text-60rpx font-600">{{ billDetial.money }}<text class="text-32rpx text-#999">元</text>
                </p>
            </view>
            <!-- 图标 -->
            <view class="gaid-box">
                <view v-for="index of 8" class="flex flex-col items-center bg-" @click="changeClassify(index - 1)">
                    <BillTypeIconVue :classify="index - 1" :choose="(index - 1) == billDetial.classify" />
                    <p>{{ filters.billTypeFilter(index - 1) }}</p>
                </view>
            </view>
            <view class="mb-20rpx">
                <!-- 时间 -->
                <view class="flex mb-10rpx">
                    <u-icon name="edit-pen" class="mr-20rpx"></u-icon>
                    <input placeholder="备注...（最多50个字）" />
                </view>
                <view class="flex">
                    <u-icon name="clock" class="mr-20rpx"></u-icon>
                    <text class="mr-10rpx" @click="showDate = true">
                        {{ billDetial.time.slice(0, 10) }}
                    </text>
                    <text @click="showTime = true">
                        {{ billDetial.time.slice(10, 16) }}
                    </text>
                </view>
            </view>
            <u-calendar :show="showDate" mode="single" @confirm="confirmDate" minDate="2022-12-17" maxDate="2023-02-13"
                monthNum="3" closeOnClickOverlay @close="showDate = false"></u-calendar>
            <u-datetime-picker :show="showTime" v-model="value1" mode="time" @confirm="confirmTime" closeOnClickOverlay
                @cancel="showTime = false"></u-datetime-picker>
            <view class="absolute bottom-0  w-full">
                <view>
                    键盘
                </view>
                <view class="flex but-box">
                    <button class="w-50% bg-#b1b1b1">删除</button>
                    <button class="w-50% bg-#ff6b8b">完成</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
// 引入 
import { onLoad } from '@dcloudio/uni-app';
import { getSegement } from '@/api/TestApi'
import { deleteBill, updateBill, getBillDetial } from '@/api/billApi'
import { Bill, groupBill } from '@/entity/bill'
import filters from '@/utils/filters'
import { useloginStore } from '@/pinia-store/login'
import BillTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()


const billID = ref(),
    billDetial = ref(),
    chooseType = ref<number>(),
    showDate = ref(false),
    showTime = ref(false),
    value1 = ref(),
    time = ref(),
    maxDate = ref()

// 保存参数信息
const billForm: Bill = {
    /**  账单ID*/
    bill_id: 0,
    /**  用户ID */
    user_id: 0,
    /**  账单类型 */
    bill_type: -1,
    /**  账单时间 */
    data_time: new Date(),
    /**  账单时间 yy-mm-dd hh:mm:ss 格式*/
    time: '',
    /**  账单时间戳 */
    timestamp: '',
    /**  账单金额 */
    money: 0,
    /**  账单事项 */
    matter: '',
    /**  账单分类 */
    classify: 0,
    /**  账单备注 */
    notes: '',
    full_sentences: ''
}


onLoad((option) => {
    if (option)
        billID.value = option.billID
    // 获取账单详情
    getBillDetail()
    const d = new Date()
    const year = d.getFullYear()
    let month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
    const date = d.getDate()
    maxDate.value = `${year + 1}-${month}-${date}`
})



/**
 * 获取获取账单详情
 */
const getBillDetail = async () => {
    const res = await getBillDetial({ userID: loginStore.userID, billID: billID.value })
    console.log("获取获取账单详情", res.data)
    billDetial.value = res.data
},
    changeChoose = (type: number) => {
        chooseType.value = type
    },
    changeClassify = (type: number) => {
        setProp(billDetial.value, 'classify', type)
    },
    confirmDate = (e: Event) => {
        showDate.value = false
        const Data = JSON.parse(JSON.stringify(e));
        let time = Data[0] + billDetial.value.time.slice(10)
        setProp(billDetial.value, 'time', time)
        console.log('11', time)
    },
    confirmTime = (e: Event) => {
        showTime.value = false
        const Data = JSON.parse(JSON.stringify(e));
        let time = billDetial.value.time.slice(0, 11) + Data.value + ":00"
        setProp(billDetial.value, 'time', time)
        console.log('11', time)
    },
    bindTimeChange = (e: Event) => {
        let time = billDetial.time.slice(10)

        console.log('11', toRaw(e))
    }

function setProp<T, K extends keyof T>(foo: T, key: K, val: T[K]) {
    foo[key] = val;
}

</script>

<style lang="less" scoped>
.gaid-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10rpx;
}

.chooseBorder {
    border-bottom: 2px solid #559eff;
}

.but-box {

    button {
        border: none;
        outline: none; //消除默认点击蓝色边框效果
        border-radius: 0;
        color: #fff;
    }

    button::after {
        border: none;
    }
}
</style>
