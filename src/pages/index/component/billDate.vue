<template>
    <view class="date-container">
        <view class="content">
            <view class="head ">
                <p>{{ formattereTools.dateFormatString(dayDate[0].time) }}</p>
                <p>总支出：{{ dataListSum }}￥</p>
            </view>
            <!-- 每一项账单 -->
            <view class="bill-list head" v-for="item in dayDate" @click="toBillDetial(item.bill_id)">
                <view class="items">
                    <view class="item" :style="filters.billTypeColor(item.classify)">
                        <i class="iconfont" :class="filters.billTypeIcon(item.classify)"></i>
                    </view>
                    <view>
                        <p style="margin-bottom: 5rpx;">{{ item.matter }} | {{ filters.billTypeFilter(item.classify) }}
                        </p>
                        <p>{{ formattereTools.dateFormatString(item.time, "time") }}</p>
                    </view>
                </view>
                <view class="items">
                    -{{ item.money }}
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import userServer from '@/api/userApi'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import formattereTools from '@/utils/dataUtils'
import { Bill, groupBill } from '@/entity/bill'
import filters from '@/utils/filters'
import billTypeIconVue from '../../../components/billTypeIcon.vue'
const loginStore = useloginStore()


const emits = defineEmits(['chooseValue'])

const props = defineProps({
    // 写法一
    msg2: String,
    // 写法二
    msg: {
        type: String,
        default: ""
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    dayDate: {
        type: Array<Bill>,
        default: () => []
    }
})

const dataListSum = computed(() => {
    return props.dayDate.reduce((sum, e) => sum + Number(e.money || 0), 0).toFixed(2)
})

const allChoose = ref([]),
    nowDate = ref('')

const toBillDetial = (billID: number) => {
    uni.navigateTo({
        // url: '/pages/billDetial/index'
        url: `/pages/billDetial/index?billID=${billID}`
    })
}

</script>

<style lang="less" scoped>
.date-container {
    margin-bottom: 20rpx;

    .content {
        margin: 0 40rpx;
        padding: 30rpx;
        background: #f6f7f8;
        border-radius: 1.5rem;

        .head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15rpx;
        }

        .bill-list {
            width: 100%;

            .items {
                display: flex;
                justify-content: center;
                align-items: center;

                .item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 60rpx;
                    height: 60rpx;
                    border-radius: 2rem;
                    margin: 0 15rpx;
                }
            }
        }
    }
}
</style>
