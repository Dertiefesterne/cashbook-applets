<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                关于我们
            </template>
        </headTop>
        <view class="content">
            <view class="image-box">
                <image src="../../static/img/appIcon.png" mode="aspectFill" />
            </view>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()



</script>


<style lang="less" scoped>
.container {
    height: 100vh;
    background-color: var(--pickerContent);
    color: var(--textColor);
    padding-bottom: 100rpx;

    .content {
        padding: 100rpx 140rpx 0;

        .image-box {
            width: 150rpx;
            height: 150rpx;
            margin: 0 auto;
            margin-top: 100rpx !important;

            image {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>