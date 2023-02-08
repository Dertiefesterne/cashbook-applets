<template>
    <view class="container">

        <headTop></headTop>
        <view class="content"></view>
        {{ oldName }}
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import billTypeIconVue from '@/components/billTypeIcon.vue';
const oldName = ref('')

onLoad((option) => {
    if (option) {
        oldName.value = option.name;
    }
})

</script>


<style lang="less" scoped>
.container {

    .content {
        padding: 0 40rpx;
    }

}
</style>