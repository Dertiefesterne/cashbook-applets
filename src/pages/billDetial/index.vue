<template>
    <view v-if="billDetial">
        <view class="head">
            <view class="icon-l">
                <text class="text">账单详情</text>
            </view>
            <view class="text" :class="{ 'chooseBorder': chooseType == -1 }" @click="changeChoose(-1)">
                支出</view>
            <view class="text" :class="{ 'chooseBorder': chooseType == 1 }" @click="changeChoose(1)">
                收入</view>
            <view class="icon-r" @click="deleteBill">
                <u-icon name="trash" size="20"></u-icon>
            </view>
        </view>
        <view class="content">
            <view class="money">
                <text class="num">{{ moneyDisplay }}<text class="yuan">元</text>
                </text>
            </view>
            <!-- 支出图标 -->
            <view class="gaid-box" v-if="billDetial.bill_type == -1">
                <view v-for="index of 8" class="classify" @click="changeClassify(index - 1)">
                    <BillTypeIconVue :classify="index - 1" :choose="(index - 1) == billDetial.classify" />
                    <p>{{ filters.billTypeFilter(index - 1) }}</p>
                </view>
            </view>
            <!-- 收入图标 -->
            <view class="gaid-box" v-else>
                <view v-for="index of 5" class="classify" @click="changeClassify(index + 7)">
                    <BillTypeIconVue :classify="index + 7" :choose="(index + 7) == billDetial.classify" />
                    <p>{{ filters.billTypeFilter(index + 7) }}</p>
                </view>
            </view>
            <view class="date-box">
                <!-- 时间 -->
                <view class="matter">
                    <u-icon name="edit-pen" size="20"></u-icon>
                    <input placeholder="备注...（最多15个字）" v-model="billDetial.matter" @input="changeText(billDetial.matter)"
                        maxlength="15" class="matter-input" />
                </view>
                <view class="time">
                    <u-icon name="clock" size="20"></u-icon>
                    <text class="dd" @click="showDate = true">
                        {{ billDetial.time.slice(0, 10) }}
                    </text>
                    <text @click="showTime = true">
                        {{ billDetial.time.slice(10, 16) }}
                    </text>
                </view>
            </view>
            <u-calendar :show="showDate" mode="single" @confirm="confirmDate" minDate="2022-12-17" maxDate="2023-03-13"
                monthNum="3" closeOnClickOverlay @close="showDate = false"></u-calendar>
            <u-datetime-picker :show="showTime" v-model="value1" mode="time" @confirm="confirmTime" closeOnClickOverlay
                @cancel="showTime = false"></u-datetime-picker>
            <view class="keyboard">
                <view class="content">
                    <view class="tagsBox">
                        <scroll-view class="uni-swiper-tab" scroll-x>
                            <text v-for="item in tags" class="tab" @click="changeMatter(item)">{{
                                item
                            }}</text>
                        </scroll-view>
                        <view class="iconBox">
                            <u-icon name="more-circle" size="20"></u-icon>
                        </view>
                    </view>
                    <view class="but-box">
                        <view class="number-box">
                            <button hover-class='none' v-for="item in buttons" @click="changeMoney(item)">{{
                                item
                            }}</button>
                            <button hover-class='none' class="sub" @click="subMoney">
                                <u-icon name="backspace" size="35"></u-icon>
                            </button>
                        </view>
                        <view class="add-box">
                            <button hover-class='none' @click="changeMoney('+')">+</button>
                            <button hover-class='none' @click="changeMoney('-')">-</button>
                            <button hover-class='none' class="publish" @click="changeMoney(inCalc())">{{
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
    chooseType = ref<number>(),
    moneyDisplay = ref(''),
    showDate = ref(false),
    showTime = ref(false),
    value1 = ref(),
    lastTime = ref('')

const tags = ['外卖', '淘宝', '打车', '吃饭', '零食', '超市', '买菜', '旅游', '机票', '房租']
const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']



onLoad((option) => {
    if (option)
        billID.value = option.billID
    // 获取账单详情
    getBillDetail()
    if (option && option.lastTime) {
        lastTime.value = option.lastTime;
        console.log('lastTime', lastTime.value, typeof lastTime.value)
    }
    else {
        lastTime.value = new Date().getTime() + ''
    }
})



/**
 * 获取获取账单详情
 */
const getBillDetail = async () => {
    const res = await billServer.getBillDetial({ userID: Number(loginStore.userID), billID: billID.value })
    console.log("获取获取账单详情", res.data, res.data.bill_type)
    billDetial.value = res.data
    chooseType.value = res.data.bill_type
    moneyDisplay.value = billDetial.value.money + ''
},
    changeChoose = (type: number) => {
        chooseType.value = type
    },
    changeClassify = (type: number) => {
        setProp(billDetial.value, 'classify', type)
    },
    confirmDate = (e: Event) => {
        showDate.value = false
        const Data = JSON.parse(JSON.stringify(e));
        let time = Data[0] + billDetial.value.time.slice(10)
        let timestamp = new Date(time).getTime() + '';
        setProp(billDetial.value, 'time', time)
        setProp(billDetial.value, 'timestamp', timestamp)
    },
    confirmTime = (e: Event) => {
        showTime.value = false
        const Time = JSON.parse(JSON.stringify(e));
        let time = billDetial.value.time.slice(0, 11) + Time.value + ":00"
        let timestamp = new Date(time).getTime() + '';
        setProp(billDetial.value, 'time', time)
        setProp(billDetial.value, 'timestamp', timestamp)
    },
    changeText = (e: string) => {
        let matter = e.replace(/ /g, '')
        setProp(billDetial.value, 'matter', matter)
    },
    changeMatter = (e: string) => {
        if (billDetial.value.matter == '')
            setProp(billDetial.value, 'matter', e)
        else {
            let matter = billDetial.value.matter + e
            setProp(billDetial.value, 'matter', matter)
        }
    },
    subMoney = () => {
        moneyDisplay.value = moneyDisplay.value.slice(0, moneyDisplay.value.length - 1)
        console.log(moneyDisplay.value)
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
            setProp(billDetial.value, 'money', money)
            // 修改了其他的，保存
            modifyBill()
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
    deleteBill = () => {
        uni.showModal({
            title: '提示',
            content: '确定删除该账单吗？',
            success: async (res) => {
                if (res.confirm) {
                    const params = {
                        userID: loginStore.userID,
                        billID: billDetial.value.bill_id,
                    }
                    console.log('删除参数', params)
                    const res = billServer.deleteBill(params)
                    if ((await res).data == '删除成功') {
                        uni.showToast({ title: '删除成功', duration: 800 })
                        jumpPage()
                    }
                }
            },
        })
    },
    modifyBill = async () => {
        // 保存修改后的账单
        const params = { userID: Number(loginStore.userID), billID: billDetial.value.bill_id, datetime: billDetial.value.time, timestamp: billDetial.value.timestamp, money: billDetial.value.money, matter: billDetial.value.matter, classify: billDetial.value.classify, bill_type: chooseType.value }
        console.log('修改后的账单', params)
        const res = billServer.updateBill(params)
        if ((await res).statusCode == 200) {
            uni.showToast({ title: '修改成功', duration: 800 })
            jumpPage()
        }
    },
    jumpPage = () => {
        // 如果修改的账单时间距离(最新一条账单)超过7天，就刷新
        if (formattereTools.dateFormatterDispose(billDetial.value.timestamp, Number(lastTime.value))) {
            uni.reLaunch({
                url: '/pages/index/index'
            })
        }
        else {
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

function setProp<T, K extends keyof T>(foo: T, key: K, val: T[K]) {
    foo[key] = val;
}

</script>

<style lang="less" scoped>
.head {
    width: 100%;
    height: 100rpx;
    padding: 0 40rpx;
    position: fixed;
    top: 0;
    background: #dfdfe1;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    // .text {
    //     line-height: 100rpx;
    // }
    .text {
        line-height: 100rpx;
        height: 100%;
        margin: 0 40rpx;
    }

    .chooseBorder {
        border-bottom: 2px solid #559eff;
    }

    .icon-l {
        position: absolute;
        left: 20rpx;
    }

    .icon-r {
        position: absolute;
        right: 20rpx;
    }
}

.content {
    padding-top: 100rpx;
    width: 100%;

    .money {
        display: flex;
        flex-direction: row-reverse;
        padding: 20rpx 40rpx;
        width: 100%;

        text {
            white-space: normal;
        }

        .num {
            font-size: 60rpx;
            font-weight: 600;
        }

        .yuan {
            font-size: 32rpx;
            color: #999;
        }
    }

    .gaid-box {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10rpx;

        .classify {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .date-box {
        padding: 0 40rpx;
        margin-top: 50rpx;

        .matter {
            display: flex;
            font-size: 32rpx;
            margin-bottom: 25rpx;

            .u-icon {
                margin-right: 20rpx;
            }

            .matter-input {
                width: 100%;
            }
        }

        .time {
            display: flex;
            font-size: 32rpx;

            .u-icon {
                margin-right: 20rpx;
            }

            .dd {
                margin-right: 10rpx;
            }
        }
    }

    .keyboard {
        position: absolute;
        bottom: 0;
        width: 100%;

        .content {
            width: 100%;

            .tagsBox {
                overflow: hidden;
                position: relative;
                width: 100%;
                background: #d0e2fa;
                padding: 20rpx;

                text {
                    white-space: nowrap;
                }

                .iconBox {
                    position: absolute;
                    right: 0;
                    top: 0;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding: 0 25rpx;
                }

                .uni-swiper-tab {
                    white-space: nowrap;
                    width: 90%;

                    .tab {
                        padding: 5rpx 15rpx;
                        background: #fff;
                        border-radius: 0.5rem;
                        margin-right: 10rpx;
                        display: inline-block;
                    }
                }

                .iconBox {
                    background: #d0e2fa;
                }
            }

            .but-box {
                width: 100%;
                background: #f8f8fa;
                display: flex;
                padding: 20rpx;

                button {
                    width: 150rpx;
                    height: 100rpx;
                    background-color: #fff;
                    box-shadow: 0 5px 5px #dfdfe1;
                    border-radius: 2rem;
                }

                button::after {
                    border: none;
                }

                button:focus {
                    outline: none; //去除点击之后默认的边框
                    background: #fff;
                }

                .sub {
                    display: flex;
                    justify-content: center;
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
                    border-radius: 2rem;

                    .publish {
                        height: 220rpx;
                        line-height: 220rpx;
                    }
                }
            }
        }
    }
}

.chooseBorder {
    border-bottom: 2px solid #559eff;
}
</style>
