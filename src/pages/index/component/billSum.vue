<template>
    <view>
        <view class="main">
            <view class="content">
                <!-- 第一行 -->
                <view class="first">
                    <view>
                        <p>今天支出</p>
                        <p>{{ sumData.daySum ? showNumber(sumData.daySum) : 0 }}￥</p>
                    </view>
                    <view @click="editBudget">点击设置预算
                        <i class="icon xianxing-15"></i>
                    </view>
                </view>
                <!-- 第二行 -->
                <view class="second">
                    <view>
                        <p>本月结余</p>
                        <p>{{ sumData.monthSum ? showNumber(sumData.monthSum) : '0' }}￥</p>
                    </view>
                    <view>
                        <p>本月剩余预算</p>
                        <p>{{ surplus ? showNumber(surplus) : 0 }}￥</p>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import userServe from '@/api/userApi'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import formattereTools from '@/utils/dataUtils'
const loginStore = useloginStore()

const segementText = ref(''),
    show = ref(false)

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    },
    sumData: {
        type: Object,
        default: () => { }
    }
})
const surplus = computed(() => {
    if (props.sumData.monthSum > 0)
        return loginStore.info.budget
    else { return loginStore.info.budget + props.sumData.monthSum }
})

const editBudget = () => {
    uni.navigateTo({
        url: '/pages/editInfo/editBudget'
    })
},
    showNumber = (n: number) => {
        let f = n / 100;
        let s = n % 100;
        let src = f + '.' + s
        return parseFloat(src)
    }
</script>

<style lang="less" scoped>
.main {
    width: 100%;
    position: relative;
    padding: 40rpx 40rpx 20rpx;
    // background-color: rgba(0, 0, 0, 0.1);

    .content {
        padding: 40rpx;
        background: var(--billSumBg);
        border-radius: 1.5rem;

        .first {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40rpx;
        }

        .second {
            display: flex;
            justify-content: space-between;
        }
    }

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: var(--maskBg);
        z-index: 99;
    }
}

.picker-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--modelBg);
}

.picker-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: var(--pickerContent);
    border-radius: 20px 20px 0 0;
    transition: all 0.3s;
}

.picker-header {
    margin: 0 40rpx;
    padding: 20rpx 0;
}

.picker-view {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 100rpx;
    background-color: var(--pickerContent);
}
</style>
