<template>
    <view>
        <view class="head">
            <view class="icon-l" @click="back">
                <u-icon name="arrow-left" size="20"></u-icon>
            </view>
            <view class="text" :class="{ 'chooseBorder': chooseType == -1 }" @click="changeChoose(-1)">
                支出</view>
            <view class="text" :class="{ 'chooseBorder': chooseType == 1 }" @click="changeChoose(1)">
                收入</view>
            <view class="icon-r" @click="savaBill">
                <u-icon name="checkmark" size="20"></u-icon>
            </view>
        </view>
        <view class="content">
            <view class="money flex flex-row-reverse py-20rpx px-40rpx w-full money-box">
                <text class="num text-60rpx font-600">{{ moneyDisplay }}<text class="yuan text-32rpx text-#999">元</text>
                </text>
            </view>
            <!-- 支出图标 -->
            <scroll-view class="uni-swiper-tab" scroll-x="true" v-if="chooseType == -1">
                <!-- 系统默认标签 -->
                <view class="scroll-item">
                    <view class="gaid-box">
                        <view v-for="index of 8" class="classify" @click="changeClassify(index - 1)">
                            <BillTypeIconVue :classify="index - 1" :choose="(index - 1) == billForm.classify"
                                :bg-color="filters.billTypeColor(index - 1)" />
                            <p>{{ filters.billTypeFilter(index - 1) }}</p>
                        </view>
                    </view>
                </view>
                <!-- 自定义 -->
                <view class="scroll-item">
                    <view class="gaid-box">
                        <view v-for="(item, index) in customOutPutClassify" class="classify"
                            @click="changeClassify(index + 13)">
                            <BillTypeIconVue :classify="index + 13" :choose="(index + 13) == billForm.classify"
                                :bg-color="filters.customBillTypeColor(index)" />
                            <p>{{ item }}</p>
                        </view>
                        <view class="classify" @click="isAddClassify = true" v-if="customOutPutClassify.length < 3">
                            <BillTypeIconVue :classify="add" :choose="billForm.classify == -1"
                                :bg-color="filters.billTypeColor(add)" />
                            <p>添加</p>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <!-- 收入图标 -->
            <view class="gaid-box" v-if="chooseType == 1">
                <view v-for="index of 5" class="classify" @click="changeClassify(index + 7)">
                    <BillTypeIconVue :classify="index + 7" :choose="(index + 7) == billForm.classify"
                        :bg-color="filters.billTypeColor(index + 7)" />
                    <p>{{ filters.billTypeFilter(index + 7) }}</p>
                </view>
                <view v-for="(item, index) in customInPutClassify" class="classify" @click="changeClassify(index + 16)">
                    <BillTypeIconVue :classify="index + 16" :choose="(index + 16) == billForm.classify"
                        :bg-color="filters.customBillTypeColor(index)" />
                    <p>{{ item }}</p>
                </view>
                <view class="classify" @click="isAddClassify = true" v-if="customInPutClassify.length < 3">
                    <BillTypeIconVue :classify="add" :choose="billForm.classify == -1"
                        :bg-color="filters.billTypeColor(add)" />
                    <p>添加</p>
                </view>
            </view>
            <view class="date-box">
                <!-- 事项 -->
                <view class="matter">
                    <u-icon name="edit-pen" size="20"></u-icon>
                    <input placeholder="备注...（最多15个字）" v-model="billForm.matter" @input="changeText(billForm.matter)"
                        maxlength="15" class="matter-input" />
                    <text v-if="billForm.matter.length" class="matter-num">{{
                        billForm.matter.length
                    }}/15</text>
                </view>
                <!-- 日期、时间 -->
                <view class="time">
                    <u-icon name="clock" size="20"></u-icon>
                    <text class="dd" @click="showDate = true">
                        {{ billForm.data_time.slice(0, 10) }}
                    </text>
                    <text @click="showTime = true">
                        {{ billForm.data_time.slice(10, 16) }}
                    </text>
                </view>
            </view>
            <!-- 日历弹窗选择器 -->
            <u-calendar :show="showDate" mode="single" @confirm="confirmDate" @click="confirmDateClick" :minDate="minDate"
                :maxDate="maxDate" monthNum="3" closeOnClickOverlay @close="showDate = false"></u-calendar>
            <!-- 时间弹窗选择器 -->
            <u-datetime-picker :show="showTime" v-model="datetimeValue" mode="time" @confirm="confirmTime"
                closeOnClickOverlay @cancel="showTime = false"></u-datetime-picker>
            <!-- 数字键盘 -->
            <view class="keyboard">
                <view class="tagsBox">
                    <scroll-view class="uni-swiper-tab" scroll-x>
                        <text v-for="item in recommendTags" class="tab" @click="changeMatter(item)">{{
                            item
                        }}</text>
                    </scroll-view>
                    <view class=" iconBox">
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
        <!-- 增加自定义类别弹窗 -->
        <u-popup :show="isAddClassify" class="addClassify" mode="center" @close="isAddClassify = false">
            <view class="head-title">添加分类</view>
            <p>分类名称:</p>
            <view class="input-box"> <input v-model.trim="classify" maxlength="2"
                    @input="classify = classify.replace(/ /g, '')" />
                <text v-if="classify.length" class="matter-num">{{
                    classify.length
                }}/4</text>
            </view>
            <button hover-class='none' class="save" @click="addNewClassify" :disabled="classify.length == 0">完成</button>
            <button hover-class='none' class="cancel" @click="isAddClassify = false">取消</button>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
// 引入 
import { onLoad } from '@dcloudio/uni-app';
import formattereTools from '@/utils/dataUtils'
import billServer from '@/api/billApi'
import userInfoApi from '@/api/userInfoApi';
import filters from '@/utils/filters'
import dataUtils from '@/utils/dataUtils';
import { useloginStore } from '@/pinia-store/login'
import BillTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()
const minDate = dataUtils.dateFormattimes(dataUtils.getMonTimes(1, -1), 'sDate')
const maxDate = dataUtils.dateFormattimes(dataUtils.getMonTimes(1, 1), 'sDate')

const customOutPutClassify = computed(() => {
    if (loginStore.info.outputClassify != '')
        return loginStore.info.outputClassify.split(',')
    else
        return []
})

const customInPutClassify = computed(() => {
    if (loginStore.info.inputClassify != '')
        return loginStore.info.inputClassify.split(',')
    else
        return []
})



const add: number = -1
const billID = ref(),
    billDetial = ref(),
    chooseType = ref<number>(-1),
    moneyDisplay = ref('0'),
    showDate = ref(false),
    showTime = ref(false),
    isAddClassify = ref(false),
    datetimeValue = ref(),
    time = ref(),
    lastTime = ref(''),
    classify = ref(''),
    recommendTags = ref<string[]>([])

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
const changeChoose = (type: number) => {
    billForm.classify = 8
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
        billForm.timestamp = new Date(data_time).getTime() + '';
    },
    confirmDateClick = (e: Event) => {
        const Data = JSON.parse(JSON.stringify(e));
        console.log('点击', Data[0], Data)
    },
    confirmTime = (e: Event) => {
        showTime.value = false
        const Time = JSON.parse(JSON.stringify(e));
        let data_time = billForm.data_time.slice(0, 11) + Time.value + ":00"
        billForm.data_time = data_time
        billForm.timestamp = new Date(data_time).getTime() + '';
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
        let money = Number(moneyDisplay.value)
        billForm.money = money
        billForm.bill_type = chooseType.value
        if (billForm.money == 0) {
            uni.showToast({ title: '请输入该账单金额', icon: 'none' })
            return
        }
        const params = billForm
        console.log('保存参数', { ...params })
        const res = await billServer.addBill({ ...params })
        if (res.data == '添加成功') {
            uni.showToast({ title: '添加成功', duration: 800 })

            // 如果添加的账单时间距离(最新一条账单)超过7天，就刷新
            if (formattereTools.dateFormatterDispose(billForm.timestamp, Number(lastTime.value))) {
                uni.reLaunch({
                    url: '/pages/index/index'
                })
            }
            // 
            else {
                uni.switchTab({
                    url: '/pages/index/index'
                })
            }
            // 更新用户的账单数
            loginStore.setInfoBillCount(loginStore.info.bill_count + 1)
        }
    }, back = () => {
        uni.switchTab({
            url: '/pages/index/index'
        })
    },
    addNewClassify = async () => {
        if (classify.value == '') return
        isAddClassify.value = false
        let params = {}
        if (chooseType.value == -1) {
            params = {
                userID: loginStore.userID,
                outputClassify: customOutPutClassify.value.length ? customOutPutClassify.value.join(',') + ',' + classify.value : classify.value
            }
        }
        else {
            params = {
                userID: loginStore.userID,
                inputClassify: customInPutClassify.value.length ? customInPutClassify.value.join(',') + ',' + classify.value : classify.value
            }
        }
        console.log('保存参数', params, classify.value)
        const res = await userInfoApi.updateUserClassify(params)
        if (res.statusCode == 200) {
            chooseType.value == -1 ? loginStore.setOutputClassify(res.data) : loginStore.setInputClassify(res.data)
            uni.showToast({ title: '添加成功', duration: 800 })
            classify.value = ''
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

onLoad((option) => {
    if (option && option.lastTime) {
        lastTime.value = option.lastTime;
        console.log('lastTime', lastTime.value, typeof lastTime.value)
    }
    else {
        lastTime.value = new Date().getTime() + ''
    }
})

onMounted(() => {
    console.log('用户信息---', loginStore.info)
    let arr = []
    if (loginStore.info.customMatter)
        recommendTags.value = loginStore.info.customMatter.split(',')
    if (recommendTags.value.length < 9) {
        recommendTags.value = recommendTags.value.concat(tags.slice(0, 9 - recommendTags.value.length))
    }
    console.log('推荐标签', recommendTags.value)
})
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

    .text {
        line-height: 100rpx;
        height: 100%;
        margin: 0 40rpx;
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
    padding: 100rpx 0 600rpx;
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

    .uni-swiper-tab {
        white-space: nowrap;

        .scroll-item {
            width: 100%;
            display: inline-block;
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

            .matter-num {
                font-size: 28rpx;
                color: #999;
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
        position: fixed;
        bottom: 0;
        width: 100%;

        .tagsBox {
            overflow: hidden;
            width: 100%;
            background: #d0e2fa;
            padding: 20rpx;
            position: relative;

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

.chooseBorder {
    border-bottom: 2px solid #559eff;
}

.addClassify {
    :deep(.u-popup__content) {
        width: 70%;
        height: 36%;
        background-color: #fff;
        position: relative;
        border-radius: 10rpx;
        padding: 40rpx;

        .head-title {
            text-align: center;
            font-weight: bold;
            font-size: 32rpx;
            margin-bottom: 20rpx;
        }

        p {
            margin-bottom: 10rpx;
        }

        .input-box {
            width: 80%;
            display: flex;
            font-size: 32rpx;
            border-bottom: 2px solid rgb(165, 165, 165);
            align-items: center;
            padding: 5rpx 15rpx;
            margin: 0 auto;

            input {
                width: 100%;
                padding: 1prpx;
            }

            .matter-num {
                font-size: 28rpx;
                color: #999;
            }
        }

        button {
            width: 80%;
            border-radius: 6rem;

            &::after {
                border: none;
            }
        }

        .save {
            margin-top: 30rpx;
            background: rgba(174, 208, 238, 0.5);
            text-align: center;
        }

        .cancel {
            background-color: rgba(221, 222, 224, 0.5);
            margin-top: 10rpx;
        }
    }
}
</style>
