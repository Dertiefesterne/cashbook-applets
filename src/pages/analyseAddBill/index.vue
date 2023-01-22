<template>
    <div>
        <view class="text-26rpx text-#999 mt-5">{{ label }}</view>
        <view @click="show = true" class="flex justify-between items-center pb-3 pt-5">
            点击部分
        </view>
        <view class="picker-modal" v-if="show" @click="_close"></view>
        <view class="picker-content" :style="{ transform: show ? 'translateY(0)' : 'translateY(100%)' }">
            <view>顶部</view>
            <picker-view class="picker-view">
                <view class="label-box">
                    <!-- 标签展示栏 -->
                    <view>内容</view>
                </view>
            </picker-view>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
// 引入 
import { onLoad } from '@dcloudio/uni-app';
import formattereTools from '@/utils/dataUtils'
import billServer from '@/api/billApi'
import { Bill } from '@/entity/bill'
import filters from '@/utils/filters'
import { useloginStore } from '@/pinia-store/login'
import BillTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()


const billID = ref(),
    billDetial = ref(),
    chooseType = ref<number>(-1),
    moneyDisplay = ref('0'),
    showDate = ref(false),
    showTime = ref(false),
    datetimeValue = ref(),
    time = ref(),
    maxDate = ref()

const emit = defineEmits(['update:modelValue', 'change']),
    props = defineProps({
        label: { type: String },
        placeholder: { type: String, default: '请选择' },
        serve: { type: Array },
        type: { type: String, default: 'default' },
    }),
    show = ref(false) // 是否显示下拉框


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
}

</script>

<style lang="scss" scoped>
.picker-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}

.picker-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: #fff;
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
    height: 700rpx;
    background-color: rgba(255, 255, 255, 1);

    .label-box {
        width: 100%;
        padding: 20rpx 37rpx;

        .check {
            border: 1px solid #4d699a;
            box-sizing: border-box;
        }

        .itemLabel {
            min-width: 240rpx;
            padding: 0 40rpx;

            &:nth-of-type(1) {
                margin-right: 30rpx;
            }
        }
    }
}
</style>