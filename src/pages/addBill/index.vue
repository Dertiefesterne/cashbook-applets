<template>
    <view>
        <view class="head flex justify-center items-center w-full h-100rpx px-40rpx fixed top-0 bg-#dfdfe1 z-2">
            <view class="mx-40rpx h-full lh-100rpx" :class="{ 'chooseBorder': chooseType == -1 }"
                @click="changeChoose(-1)">
                支出</view>
            <view class="mx-40rpx h-full lh-100rpx" :class="{ 'chooseBorder': chooseType == 1 }"
                @click="changeChoose(1)">
                收入</view>
            <view class="icon" @click="savaBill">
                <u-icon name="checkmark" class="mr-20rpx" size="20"></u-icon>
            </view>
        </view>
        <view class="pt-100rpx w-full ">
            <view class="flex flex-row-reverse py-20rpx px-40rpx w-full money-box">
                <text class="text-60rpx font-600">{{ moneyDisplay }}<text class="text-32rpx text-#999">元</text>
                </text>
            </view>
            <!-- 图标 -->
            <view class="gaid-box">
                <view v-for="index of 8" class="flex flex-col items-center bg-" @click="changeClassify(index - 1)">
                    <BillTypeIconVue :classify="index - 1" :choose="(index - 1) == billForm.classify" />
                    <p>{{ filters.billTypeFilter(index - 1) }}</p>
                </view>
            </view>
            <view class="mt-50rpx px-40rpx">
                <!-- 时间 -->
                <view class="flex mb-25rpx text-32rpx">
                    <u-icon name="edit-pen" class="mr-20rpx" size="20"></u-icon>
                    <input placeholder="备注...（最多15个字）" v-model="billForm.matter" @input="changeText(billForm.matter)"
                        maxlength="15" class="matter-input" />
                </view>
                <view class="flex text-32rpx">
                    <u-icon name="clock" class="mr-20rpx" size="20"></u-icon>
                    <text class="mr-10rpx" @click="showDate = true">
                        {{ billForm.data_time.slice(0, 10) }}
                    </text>
                    <text @click="showTime = true">
                        {{ billForm.data_time.slice(10, 16) }}
                    </text>
                </view>
            </view>
            <u-calendar :show="showDate" mode="single" @confirm="confirmDate" minDate="2022-12-17" maxDate="2023-02-13"
                monthNum="3" closeOnClickOverlay @close="showDate = false"></u-calendar>
            <u-datetime-picker :show="showTime" v-model="datetimeValue" mode="time" @confirm="confirmTime"
                closeOnClickOverlay @cancel="showTime = false"></u-datetime-picker>
            <view class="absolute bottom-0  w-full">
                <view class="w-full">
                    <view class="flex tagsBox bg-#d0e2fa p-20rpx w-full">
                        <text v-for="item in tags" class="px-15rpx py-5rpx bg-#fff rd-3 mr-10rpx"
                            @click="changeMatter(item)">{{
                                item
                            }}</text>
                        <view class="bg-#d0e2fa  iconBox">
                            <u-icon name="more-circle" size="20"></u-icon>
                        </view>
                    </view>
                    <view class="w-full bg-#f8f8fa but-box flex p-20rpx">
                        <view class="number-box">
                            <button hover-class='none' class="rd-7" v-for="item in buttons"
                                @click="changeMoney(item)">{{ item }}</button>
                            <button hover-class='none' class="rd-7 flex justify-center" @click="subMoney">
                                <u-icon name="backspace" size="35"></u-icon>
                            </button>
                        </view>
                        <view class="add-box">
                            <button hover-class='none' class="rd-7" @click="changeMoney('+')">+</button>
                            <button hover-class='none' class="rd-7" @click="changeMoney('-')">-</button>
                            <button hover-class='none' class="publish rd-7" @click="changeMoney(inCalc())">{{
                                inCalc()
                            }}</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
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

const tags = ['外卖', '淘宝', '打车', '吃饭', '零食', '超市', '买菜', '旅游', '机票']
const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']


/**
 * 获取获取账单详情
 */
const getBillDetail = async () => {
    const res = await billServer.getBillDetial({ userID: loginStore.userID, billID: billID.value })
    console.log("获取获取账单详情", res.data)
    billDetial.value = res.data
    moneyDisplay.value = billDetial.value.money + ''
},
    changeChoose = (type: number) => {
        chooseType.value = type
    },
    changeClassify = (type: number) => {
        billForm.classify = type
    },
    confirmDate = (e: Event) => {
        showDate.value = false
        const Data = JSON.parse(JSON.stringify(e));
        let data_time = Data[0] + billForm.data_time.slice(10)
        billForm.data_time = data_time
    },
    confirmTime = (e: Event) => {
        showTime.value = false
        const Time = JSON.parse(JSON.stringify(e));
        let data_time = billForm.data_time.slice(0, 11) + Time.value + ":00"
        billForm.data_time = data_time
    },
    changeText = (e: string) => {
        let matter = e.replace(/ /g, '')
        billForm.matter = matter
    },
    changeMatter = (e: string) => {
        if (billForm.matter == '')
            billForm.matter = e
        else {
            let matter = billForm.matter + e
            billForm.matter = matter
        }
    },
    subMoney = () => {
        moneyDisplay.value = moneyDisplay.value.slice(0, moneyDisplay.value.length - 1)
    },
    changeMoney = (e: string) => {
        if (moneyDisplay.value.length > 15) {
            uni.showToast({ title: '运算式长度超出上限', icon: 'none', duration: 800 })
            return
        }
        // 金额最多8位数，否则超出上限
        // if (moneyDisplay.value.length > 15) {
        //     uni.showToast({ title: '运算式长度超出上限', icon: 'none', duration: 800 })
        //     return
        // }
        if (e == '=') {
            let lastNum = moneyDisplay.value[moneyDisplay.value.length - 1]
            if (lastNum == '+' || lastNum == '-' || lastNum == '.') {
                moneyDisplay.value = moneyDisplay.value.slice(0, moneyDisplay.value.length - 1)
            }
            // 一个简单算式的左边数字
            let preNum: number = 0
            // 一个简单算式的右边数字
            let afterNum: number = 0
            // 一个简单算式的运算符
            let operator = ''
            let preIndex: number = 0
            for (let i = 0; i < moneyDisplay.value.length; i++) {
                console.log(i, moneyDisplay.value[i])
                if (moneyDisplay.value[i] == '+' || moneyDisplay.value[i] == '-') {
                    if (preNum == 0) {
                        preNum = Number(moneyDisplay.value.slice(0, i))
                        operator = moneyDisplay.value[i]
                        preIndex = i + 1
                        console.log('first-prenum', preNum)
                    }
                    else {
                        console.log('中间index', preIndex, i)
                        afterNum = Number(moneyDisplay.value.slice(preIndex, i))
                        console.log('中间', afterNum)
                        if (operator == '+') {
                            preNum = preNum + afterNum
                        }
                        else if (operator == '-') {
                            preNum = preNum - afterNum
                        }
                        // 算好前面第一个运算符（第一个算式），再记录下一个运算符和运算符索引位置
                        operator = moneyDisplay.value[i]
                        preIndex = i + 1
                    }
                }
                // 最后面一个字符了，作为afterNum
                if (i == moneyDisplay.value.length - 1 && preNum != 0 && operator != '') {
                    afterNum = Number(moneyDisplay.value.slice(preIndex))
                    if (operator == '+') {
                        preNum = preNum + afterNum
                    }
                    else if (operator == '-') {
                        preNum = preNum - afterNum
                    }
                }
            }
            if (Math.floor(preNum) == preNum)
                moneyDisplay.value = preNum + ''
            else
                moneyDisplay.value = preNum.toFixed(2) + ''
        }
        // 点击完成
        else if (e == '完成') {
            let money = Number(moneyDisplay.value)
            billForm.money = money
            // 保存该账单
            savaBill()
        }
        // 运算符不能一起,如果最后一位是运算符就不能再输入运算符
        else if (e == '+' || e == '-' || e == '.') {
            let str = moneyDisplay.value.slice(moneyDisplay.value.length - 1)
            if (str == '+' || str == '-' || str == '.')
                return
            else
                moneyDisplay.value += e
        }
        // 点击数字
        else {
            // 初始数字为空的话代替
            if (moneyDisplay.value == '0')
                moneyDisplay.value = e
            else
                moneyDisplay.value += e
        }
        // 如果删完了显示0
        if (moneyDisplay.value == '')
            moneyDisplay.value = '0'
    },
    savaBill = async () => {
        if (billForm.money == 0) {
            uni.showToast({ title: '请输入该账单金额', icon: 'none' })
            return
        }
        const params = billForm
        console.log('保存参数', { ...params })
        const res = await billServer.addBill({ ...params })
        if (res.data == '添加成功') {
            uni.showToast({ title: '添加成功', duration: 800 })
            uni.switchTab({
                url: '/pages/index/index'
            })
        }
    }

function inCalc() {
    let str = moneyDisplay.value
    let res: boolean = str.includes('+') || str.includes('-')
    if (res)
        return '='
    else
        return '完成'
}


</script>

<style lang="less" scoped>
.head {
    position: relative;

    .icon {
        position: absolute;
        right: 0;
    }
}

.money-box {
    text {
        white-space: normal;
    }
}

.gaid-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10rpx;
}

.chooseBorder {
    border-bottom: 2px solid #559eff;
}


.matter-input {
    width: 100%;
}

.tagsBox {
    overflow: hidden;
    position: relative;

    text {
        white-space: nowrap;
    }

    .iconBox {
        position: absolute;
        right: 0;
        top: 0;
        padding: 25rpx 25rpx;
    }
}

.but-box {

    button {
        width: 150rpx;
        height: 100rpx;
        background-color: #fff;
        box-shadow: 0 5px 5px #dfdfe1;
    }

    button::after {
        border: none;
    }

    button:focus {
        outline: none; //去除点击之后默认的边框
        background: #fff;
    }

    .number-box {
        width: 75%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px 0;
    }

    .add-box {
        width: 25%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px 0;

        .publish {
            height: 220rpx;
            line-height: 220rpx;
        }
    }
}
</style>
