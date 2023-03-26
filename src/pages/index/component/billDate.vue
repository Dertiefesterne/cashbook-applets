<template>
    <view class="date-container">
        <view class="content" :class="{ 'mask': isEdit }">
            <view class="head ">
                <p>{{ formattereTools.dateFormatString(dayDate[0].time) }}</p>
                <p>总支出：{{ dataListSum }}￥</p>
            </view>
            <!-- 每一项账单 -->
            <view class="bill-list" v-for="(item, index) in dayDate" @click="toBillDetial(item.bill_id, index)">
                <view v-if="isEdit" @click="deleteBill(index, item.bill_id)">
                    <u-icon name="minus-circle-fill" color="red" size="22"></u-icon>
                </view>
                <view class="bill">
                    <view class="items">
                        <view class="item" :style="`background:${filterClassifyColor(item.bill_type, item.classify)}`">
                            <i class="iconfont" :class="filterClassifyIcon(item.bill_type, item.classify)"></i>
                        </view>
                        <view class="text">
                            <p style="margin-bottom: 5rpx;">{{ item.matter }} | {{
                                filterClassifyName(item.bill_type, item.classify)
                            }}
                            </p>
                            <p>{{ formattereTools.dateFormatString(item.time, "time") }}</p>
                        </view>
                    </view>
                    <view class="items text">
                        {{ item.bill_type == 1 ? "+" : "-" }}{{ item.money.toFixed(2) }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import { useStore } from '@/pinia-store/my'
import formattereTools from '@/utils/dataUtils'
import { Bill } from '@/entity/bill'
import filters from '@/utils/filters'
import { classifyType, defaultOutputClassify, customClassifyType, defaultInputClassify, CustomClassify } from '@/utils/staticData'
const loginStore = useloginStore()
const userStore = useStore()

const emits = defineEmits(['chooseValue', 'deleteBill'])


const allClassify = ref<customClassifyType>(
    {
        allOutput: [],
        inuseOutput: [],
        allInput: [],
        inuseInput: []
    }
)

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
    },
    groupIndex: {
        type: Number,
        default: 0
    }
})

const dataListSum = computed(() => {
    return props.dayDate.reduce((sum, e) => sum + Number(e.money * e.bill_type || 0), 0).toFixed(2)
})

const allChoose = ref([]),
    nowDate = ref('')

const toBillDetial = (billID: number, billIndex: number) => {
    if (props.isEdit)
        return
    // userStore.setIndex(props.groupIndex, billIndex)
    // console.log('个人修改账单---', userStore.gruopIndex, userStore.billIndex)
    uni.navigateTo({
        // url: '/pages/billDetial/index'
        url: `/pages/addBill/index?bill_id=${billID}`
    })
},
    deleteBill = async (index: number, billID: number) => {
        const params = {
            userID: loginStore.userID,
            billID: billID,
        }
        await billServer.deleteBill(params)
        emits('deleteBill')
        /*最后再删除
        *（props.dayDate.splice(index, 1)写在emits后面，
        *否则删掉最后一条账单后，dom元素就没有了绑定的事件也没有了
        *写在最后面的emit事件就会失效
        （个人推测）
        */
        props.dayDate.splice(index, 1)
        console.log('发送消息成功')
    }

function filterClassifyIcon(billType: number, id: number) {
    if (billType == -1) {
        let index = allClassify.value.allOutput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.allOutput[index].icon
        else
            return "icon-jushoucang";
    }
    else {
        let index = allClassify.value.allInput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.allInput[index].icon
        else
            return "icon-jushoucang";
    }
}

function filterClassifyColor(billType: number, id: number) {
    if (billType == -1) {
        let index = allClassify.value.allOutput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.allOutput[index].color
        else
            return "#d98991;";
    }
    else {
        let index = allClassify.value.allInput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.allInput[index].color
        else
            return "#d98991;";
    }
}

function filterClassifyName(billType: number, id: number) {
    if (billType == -1) {
        let index = allClassify.value.allOutput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.allOutput[index].classify_name
        else
            return "自定义";
    }
    else {
        let index = allClassify.value.allInput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.allInput[index].classify_name
        else
            return "自定义";
    }
}

async function getCustomClassify() {
    allClassify.value = await CustomClassify()
}

onMounted(() => {
    // 如果用户账单总数为0就return
    if (loginStore.info.bill_count) {
        getCustomClassify()
    }
})
</script>

<style lang="less" scoped>
.date-container {
    margin-bottom: 20rpx;

    .content {
        margin: 0 40rpx;
        padding: 30rpx;
        background: var(--billBg);
        border-radius: 1.5rem;

        .head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15rpx;
            color: var(--textSecondColor);
        }

        .bill-list {
            display: flex;
            align-items: center;
            width: 100%;

            .bill {
                display: flex;
                justify-content: space-between;
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

                .text {
                    color: var(--textSecondColor);
                }
            }

        }
    }

    // 点击管理时的遮挡层
    .mask {
        // background-color: rgba(255, 255, 255, 0.5);
        opacity: 0.7;
    }
}
</style>
