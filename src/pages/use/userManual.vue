<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                用户手册
            </template>
        </headTop>
        <view class="content">
            gg
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
    }
}
</style>