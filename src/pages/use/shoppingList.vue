<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                购物清单
            </template>
        </headTop>
        <view class="content">
            <button @click="addItem">add</button>
            <button @click="changeState">change</button>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import toBuyApi from '@/api/toBuyApi';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()

interface toBuyItem {
    item_id: number,
    item_name: string,
    state: string,
    budget: number
}

const toBuyList = ref<toBuyItem[]>([])

const addItem = () => {
    toBuyApi.add({ userID: loginStore.userID, name: '奶茶' })
},
    changeState = () => {
        toBuyApi.update({ userID: loginStore.userID, itemID: 1, state: 'N' })
    }

async function getList() {
    const res = await toBuyApi.getList({ userID: loginStore.userID })
    if (res.statusCode == 200) {
        toBuyList.value = res.data
        console.log('待购清单--', toBuyList.value)
    }
}

onMounted(() => {
    getList()
})

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