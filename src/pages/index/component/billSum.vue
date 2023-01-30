<template>
    <view>
        <view class="main px-40rpx pt-40rpx pb-20rpx">
            <view class="p-40rpx bg-#d0e2fa b-rd-4 content">
                <!-- 第一行 -->
                <view class="flex justify-between mb-40rpx">
                    <view>
                        <p>今天支出</p>
                        <p>{{ sumData.daySum }}￥</p>
                    </view>
                    <view @click="show = true">点击设置预算
                        <i class="icon xianxing-15"></i>
                    </view>
                </view>
                <!-- 第二行 -->
                <view class="flex justify-between">
                    <view>
                        <p>本月支出</p>
                        <p>{{ sumData.monthSum.toFixed(2) }}￥</p>
                    </view>
                    <view>
                        <p>本月剩余预算</p>
                        <p>0.00</p>
                    </view>
                </view>
            </view>
        </view>
        <view class="picker-modal" v-if="show" @click="show = false"></view>
        <view class="picker-content" :style="{ transform: show ? 'translateY(0)' : 'translateY(100%)' }">
            <!-- <view>顶部</view> -->
            <picker-view class="picker-view">
                <view class="w-full p-40rpx ">
                    <!-- 标签展示栏 -->
                    哈哈哈哈哈哈
                    <view class="flex items-center w-full mb-10rpx">
                    </view>
                    <view class="flex w-full justify-between ">
                        <i class="iconfont icon-rili" style="font-size:40rpx"></i>
                    </view>
                </view>
            </picker-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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


</script>

<style lang="less" scoped>
.main {
    width: 100%;
    position: relative;
    // background-color: rgba(0, 0, 0, 0.1);

    // .content {
    //     opacity: 0.1;
    // }

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.4);
        z-index: 99;
    }
}

.picker-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}

.picker-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: #fff;
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
    background-color: rgba(255, 255, 255, 1);
}
</style>
