<template>
    <view>
        <view class="main p-40rpx">
            <view class="p-40rpx bg-#d0e2fa b-rd-4 content">
                <!-- 第一行 -->
                <view class="flex justify-between mb-40rpx">
                    <view>
                        <p>今天支出</p>
                        <p>0.00</p>
                    </view>
                    <view>点击设置预算
                        <i class="icon xianxing-15"></i>
                    </view>
                </view>
                <!-- 第二行 -->
                <view class="flex justify-between">
                    <view>
                        <p>本月支出</p>
                        <p>0.00</p>
                    </view>
                    <view>
                        <p>本月结余</p>
                        <p>0.00</p>
                    </view>
                </view>
            </view>
            <view :class="{ mask: isEdit }">

            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSegement } from '@/api/TestApi'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import formattereTools from '@/utils/dataUtils'
const loginStore = useloginStore()

const segementText = ref('')
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
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
</style>
