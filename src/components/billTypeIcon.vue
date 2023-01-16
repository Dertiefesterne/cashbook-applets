<template>
    <view class="flex justify-center items-center w-80rpx h-80rpx b-rd-2 mx-15rpx"
        :style="filters.billTypeColor(classify)">
        <i class="iconfont" :class="filters.billTypeIcon(classify)" style="font-size:40rpx"></i>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import filters from '@/utils/filters'

const props = defineProps({
    classify: {
        type: Number,
        default: 0
    }
})
const color = () => {
    return "bg-#fce681"
}


</script>

<style lang="less" scoped>

</style>
