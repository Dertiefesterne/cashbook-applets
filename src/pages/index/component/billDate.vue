<template>
    <view class="mb-20rpx">
        <view class="mx-40rpx p-30rpx bg-#f6f7f8 b-rd-4">
            <view class="flex justify-between mb-15rpx">
                <p>{{ formattereTools.dateFormatString(dayDate[0].time) }}</p>
                <p>总支出：{{ dataListSum }}￥</p>
            </view>
            <!-- 每一项账单 -->
            <view>
                <view class="flex justify-between w-full mb-15rpx" v-for="item in dayDate"
                    @click="toBillDetial(item.bill_id)">
                    <view class="flex justify-center items-center">
                        <view class="flex justify-center items-center w-60rpx h-60rpx b-rd-2 mx-15rpx"
                            :style="filters.billTypeColor(item.classify)">
                            <i class="iconfont" :class="filters.billTypeIcon(item.classify)"></i>
                        </view>
                        <!-- <billTypeIconVue :classify="item.classify" /> -->
                        <view>
                            <p class="mb-5rpx">{{ item.matter }} | {{ filters.billTypeFilter(item.classify) }}</p>
                            <p>{{ formattereTools.dateFormatString(item.time, "time") }}</p>
                        </view>
                    </view>
                    <view class="flex justify-center items-center">
                        -{{ item.money }}
                    </view>
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
.content {
    display: flex;
    flex-direction: column;

    .bill_checkbox {
        :deep(.uni-checkbox-wrapper) {
            width: 100%;

            .uni-checkbox-input {
                width: 30rpx;
                height: 30rpx;

                svg {
                    font-size: 14rpx;
                }
            }
        }
    }
}
</style>
