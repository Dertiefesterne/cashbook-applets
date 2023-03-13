<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                用户手册
            </template>
        </headTop>
        <view class="content">
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

    .content {
        padding: 100rpx 140rpx 0;

    }
}
</style>