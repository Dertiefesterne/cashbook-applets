<template>
    <view class="my-container">
        <headTop> <template v-slot:title>
                {{ className }}
            </template></headTop>
        <view class="my-content">
            <view v-for="(item, index) in list">
                <billDate :day-date="item.items" v-if="item.items.length">
                </billDate>
            </view>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import billServer from '@/api/billApi'
import filters from '@/utils/filters'
import { Bill, listObject } from '@/entity/bill'
import { useloginStore } from '@/pinia-store/login'
import billDate from '@/pages/index/component/billDate.vue'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const classify = ref(0)
const className = ref('')

onLoad((option) => {
    if (option) {
        classify.value = option.classify
        className.value = option.className
        getClassifyList(option.classify, option.month, option.billType)
    }
})


const list = ref<listObject[]>([])


const getClassifyList = async (classify: number, mon: number, type: number) => {
    const res = await billServer.getBillClassifyList({ userID: loginStore.userID, classify: classify, month: mon, billType: type })
    console.log('分类结果', res.data)
    res.data.forEach((e: Bill) => {
        if (list.value.length == 0 || list.value[list.value.length - 1].date != e.time.slice(5, 10)) {
            let temp: listObject = {
                date: e.time.slice(5, 10),
                timestamp: e.timestamp,
                items: []
            }
            temp.items.push(e)
            list.value.push(temp)
        }
        else {
            list.value[list.value.length - 1].items.push(e)
        }
    })
    console.log('分类结果2', list.value)
}
</script>


<style lang="less" scoped>
.my-container {

    .my-content {
        padding: 130rpx 20rpx 0;

    }

}
</style>