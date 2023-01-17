<template>
    <view>
        <view class="flex justify-center items-center w-100rpx h-100rpx b-rd-2 mx-15rpx" :class="{ mask: !choose }"
            :style="filters.billTypeColor(classify)">
            <i class="iconfont" :class="filters.billTypeIcon(classify)" style="font-size:40rpx"></i>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import filters from '@/utils/filters'

const props = defineProps({
    classify: {
        type: Number,
        default: 0
    },
    choose: {
        type: Boolean,
        default: true
    }
})
const color = () => {
    return "bg-#fce681"
}


</script>

<style lang="less" scoped>
:deep(.mask) {
    opacity: 0.3;
}
</style>
