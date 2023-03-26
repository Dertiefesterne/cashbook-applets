<template>
    <view>
        <view @click="show = true" class="icon-box">
            <u-icon name="plus" size="40"></u-icon>
        </view>
        <view class="picker-modal" v-if="show" @click="_close"></view>
        <view class="picker-content" :style="{ transform: show ? 'translateY(0)' : 'translateY(100%)' }">
            <!-- <view>顶部</view> -->
            <picker-view class="picker-view">
                <view class="content">
                    <!-- 标签展示栏 -->
                    <view class="label-box">
                        <textarea :placeholder="placeholder" v-model="inputText" maxlength="15" auto-focus
                            :style="inputText.length ? 'height:40rpx' : 'height:80rpx'" />
                        <u-icon name="grid" size="25" @click="toAddBill"></u-icon>
                    </view>
                    <view class="buttom-content">
                        <i class="iconfont icon-rili" style="font-size:40rpx"></i>
                        <i class="iconfont icon-send-s" style="font-size:50rpx;margin-right: 6rpx;"
                            @click="anylyseBill"></i>
                    </view>
                </view>
            </picker-view>
        </view>
        <!-- 日历弹窗选择器 -->
        <u-calendar :show="showDate" mode="single" @confirm="confirmDate" :minDate="minDate" :maxDate="maxDate" monthNum="3"
            closeOnClickOverlay @close="showDate = false"></u-calendar>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
// 引入 
import { onLoad } from '@dcloudio/uni-app';
import formattereTools from '@/utils/dataUtils'
import billServer from '@/api/billApi'
import userInfoApi from '@/api/userInfoApi';
import dataUtils from '@/utils/dataUtils';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const minDate = dataUtils.dateFormattimes(dataUtils.getMonTimes(1, -1), 'sDate')
const maxDate = dataUtils.dateFormattimes(dataUtils.getMonTimes(1, 1), 'sDate')


const billID = ref(),
    showDate = ref(false),
    inputText = ref(''),
    show = ref(false),
    placeholder = ref("试试输入“打车22块”、“逛超市买菜58.3元”、“买资料39.9”、“工资收入1万”")

const emit = defineEmits(['update:modelValue', 'addBill']),
    props = defineProps({
        label: { type: String },
        placeholder: { type: String, default: '请选择' },
        serve: { type: Array },
        type: { type: String, default: 'default' },
    })


// 保存参数信息
const billForm = reactive({
    /**  账单ID*/
    bill_id: 0,
    /**  用户ID */
    user_id: Number(loginStore.userID),
    /**  账单类型 */
    bill_type: -1,
    /**  账单时间 */
    data_time: formattereTools.dateFormattere(new Date(), 'full'),
    /**  账单时间戳 */
    timestamp: new Date().getTime() + '',
    /**  账单金额 */
    money: 0,
    /**  账单事项 */
    matter: '',
    /**  账单分类 */
    classify: 0,
    /**  账单备注 */
    notes: '',
    full_sentences: ''
})

// 点击关闭
const _close = () => {
    show.value = false
}, toAddBill = () => {
    uni.navigateTo({
        url: '/pages/addBill/index'
    })
}, anylyseBill = async () => {
    if (inputText.value == '') {
        return
    }
    const res = await billServer.analyzeBill({ analyzeText: inputText.value, userID: loginStore.userID })
    console.log('请求结果', res)
    if (res.statusCode == 200) {
        show.value = false
        inputText.value = ''
        emit('addBill', Number(res.data.time))
        //调用接口增加账单总数
        const rr = await userInfoApi.addBillCount({ userID: loginStore.userID })
        loginStore.setInfoBillCount(loginStore.info.bill_count + 1)
    }
}, confirmDate = (e: Event) => {
    showDate.value = false
    const Data = JSON.parse(JSON.stringify(e));
    let data_time = Data[0]
    console.log('Date', Data, data_time)
}

</script>

<style lang="scss" scoped>
.icon-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .u-icon {
        font-weight: 700;

        :deep(.uicon-plus) {
            color: var(--addBtnColor) !important;
        }
    }
}

.picker-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var()
}

.picker-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: var(--pickerContent);
    border-radius: 20px 20px 0 0;
    transition: all 0.3s;
}

.picker-header {
    margin: 0 40rpx;
    padding: 20rpx 0;
}

.picker-view {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 100rpx;
    background-color: var(--pickerContent);

    .content {
        width: 100%;
        padding: 40rpx;
        color: var(--textColor);

        .label-box {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10rpx;

            textarea {
                width: 100%;
            }
        }

        .buttom-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>