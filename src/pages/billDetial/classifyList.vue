<template>
    <view class="container">
        <headTop> <template v-slot:title>
                {{ filters.billTypeFilter(classify) }}
            </template></headTop>
        <view class="content">

        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import billServer from '@/api/billApi'
import filters from '@/utils/filters'
import { Bill, groupBill } from '@/entity/bill'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const classify = ref(0)

onLoad((option) => {
    if (option) {
        classify.value = option.classify
        getClassifyList(option.classify, option.month)
    }
})

interface listObject {
    timestamp: string,
    items: Bill[]
}

const list = ref<listObject[]>([])


const getClassifyList = async (classify: number, mon: number) => {
    const res = await billServer.getBillClassifyList({ userID: loginStore.userID, classify: classify, month: mon })
    console.log('分类结果', res.data, res.data[0].data_time.slice(5, 10))


}
</script>


<style lang="less" scoped>
.container {

    .content {
        padding: 100rpx 140rpx 0;

    }

}
</style>