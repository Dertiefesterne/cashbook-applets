<template>
    <div>
        <view class="text-26rpx text-#999">{{ label }}</view>
        <view @click="show = true" class="flex justify-between items-center">
            <u-icon name="plus" color="#2979ff" class="font-700" size="40"></u-icon>
        </view>
        <view class="picker-modal" v-if="show" @click="_close"></view>
        <view class="picker-content" :style="{ transform: show ? 'translateY(0)' : 'translateY(100%)' }">
            <!-- <view>顶部</view> -->
            <picker-view class="picker-view">
                <view class="w-full p-40rpx ">
                    <!-- 标签展示栏 -->
                    <view class="flex items-center w-full mb-10rpx">
                        <textarea :placeholder="placeholder" v-model="inputText" maxlength="15" auto-focus
                            class="w-full" :style="inputText.length ? 'height:40rpx' : 'height:80rpx'" />
                        <u-icon name="grid" size="25" @click="toAddBill"></u-icon>
                    </view>
                    <view class="flex w-full justify-between ">
                        <i class="iconfont icon-rili" style="font-size:40rpx"></i>
                        <i class="iconfont icon-send-s mr-6rpx" style="font-size:50rpx" @click="anylyseBill"></i>
                    </view>
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
        emit('addBill', Number(res.data.time))
    }
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
    padding-bottom: 100rpx;
    background-color: rgba(255, 255, 255, 1);
}
</style>