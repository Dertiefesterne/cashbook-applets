<template>
    <view class="head">
        <view class="icon-l" @click="back">
            <slot name="icon-l"> <u-icon name="arrow-left" size="20"></u-icon></slot>
        </view>
        <slot name="title"></slot>
        <view class="icon-r">
            <slot name="icon-r"></slot>
        </view>
    </view>
</template>

<script setup lang="ts">


const back = () => {
    // uni.switchTab({
    //     url: '/pages/my/index'
    // })
    uni.navigateBack({ delta: 1 })
}
</script>

<style lang="less" scoped>
.head {
    width: 100%;
    height: 100rpx;
    padding: 0 40rpx;
    position: fixed;
    top: 0;
    background: var(--headBg);
    color: var(--textColor);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-l {
        position: absolute;
        left: 20rpx;
    }

    .icon-r {
        position: absolute;
        right: 20rpx;
    }
}
</style>