<template>
    <view v-if="type == 'big'">
        <view class="box box1" :class="{ mask: !choose }" :style="filters.billTypeColor(classify)">
            <i class="iconfont" :class="filters.billTypeIcon(classify)" style="font-size:40rpx"></i>
        </view>
    </view>
    <view v-else>
        <view class="box box2" :class="{ mask: !choose }" :style="`background:${bgColor}`">
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
        default: -1
    },
    choose: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'big'
    },
    bgColor: {
        type: String,
        default: '#1890ff'
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
    border-radius: 0.5rem;
    margin: 0 15rpx;
}

.box1 {
    width: 100rpx;
    height: 100rpx;
}

.box2 {
    width: 60rpx;
    height: 60rpx;
}

:deep(.mask) {
    opacity: 0.3;
}
</style>
