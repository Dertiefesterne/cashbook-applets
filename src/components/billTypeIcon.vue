<template>
    <view>
        <view class="box" :class="{ mask: !choose }" :style="filters.billTypeColor(classify)">
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
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    border-radius: 0.5rem;
    margin: 0 15rpx;
}

:deep(.mask) {
    opacity: 0.3;
}
</style>
