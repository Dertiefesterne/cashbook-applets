<template>
    <view>
        <view class="head">
            <view class="icon-l" @click="back" v-if="!edit">
                <u-icon name="arrow-left" size="20"></u-icon>
            </view>
            <view class="icon-l" v-else>
                <text class="text">账单详情</text>
            </view>
            <view class="text" :class="{ 'chooseBorder': chooseType == -1 }" @click="changeChoose(-1)">
                支出</view>
            <view class="text" :class="{ 'chooseBorder': chooseType == 1 }" @click="changeChoose(1)">
                收入</view>
            <view class="icon-r" @click="savaBill" v-if="!edit">
                <u-icon name="checkmark" size="20"></u-icon>
            </view>
            <view class="icon-r" @click="deleteBill" v-else>
                <u-icon name="trash" size="20"></u-icon>
            </view>
        </view>
        <view class="content" v-if="dataLoad">
            <view class="money flex flex-row-reverse py-20rpx px-40rpx w-full money-box">
                <text class="num text-60rpx font-600">{{ moneyDisplay }}<text class="yuan text-32rpx text-#999">元</text>
                </text>
            </view>
            <!-- 支出图标 -->
            <scroll-view class="uni-swiper-tab" scroll-x="true" v-if="chooseType == -1">
                <!-- 系统默认标签 -->
                <view class="scroll-item">
                    <view class="gaid-box">
                        <view v-for="item in allClassify.inuseOutput.slice(0, 8)" class="classify"
                            @click="changeClassify(item.classify_id)">
                            <BillTypeIconVue :icon="item.icon" :choose="item.classify_id == billForm.classify"
                                :bg-color="item.color" />
                            <p>{{ item.classify_name }}</p>
                        </view>
                        <view class="classify" @click="isAddClassify = true" v-if="allClassify.inuseOutput.length == 7">
                            <BillTypeIconVue icon="icon-tianjia" :choose="billForm.classify == -1" bg-color="#b9b9b9;" />
                            <p>添加</p>
                        </view>
                    </view>
                </view>
                <!-- 自定义 -->
                <view class="scroll-item" v-if="allClassify.inuseOutput.length > 7">
                    <view class="gaid-box">
                        <view v-for="(item, index) in allClassify.inuseOutput.slice(8)" class="classify"
                            @click="changeClassify(item.classify_id)">
                            <BillTypeIconVue :icon="item.icon" :choose="item.classify_id == billForm.classify"
                                :bg-color="filters.customBillTypeColor(index)" />
                            <p>{{ item.classify_name }}</p>
                        </view>
                        <view class="classify" @click="isAddClassify = true" v-if="allClassify.inuseOutput.length < 10">
                            <BillTypeIconVue icon="icon-tianjia" :choose="billForm.classify == -1" bg-color="#b9b9b9;" />
                            <p>添加</p>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <!-- 收入图标 -->
            <view class="gaid-box" v-if="chooseType == 1">
                <view v-for="item in allClassify.inuseInput" class="classify" @click="changeClassify(item.classify_id)">
                    <BillTypeIconVue :icon="item.icon" :choose="item.classify_id == billForm.classify"
                        :bg-color="item.color" />
                    <p>{{ item.classify_name }}</p>
                </view>
                <view class="classify" @click="isAddClassify = true" v-if="allClassify.inuseInput.length < 8">
                    <BillTypeIconVue icon="icon-tianjia" :choose="billForm.classify == -1" bg-color="#b9b9b9;" />
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
                :maxDate="maxDate" monthNum="12" closeOnClickOverlay @close="showDate = false"></u-calendar>
            <!-- 时间弹窗选择器 -->
            <u-datetime-picker :show="showTime" v-model="datetimeValue" mode="time" @confirm="confirmTime"
                closeOnClickOverlay @cancel="showTime = false"></u-datetime-picker>
            <!-- 数字键盘 -->
            <view class="keyboard">
                <view class="tagsBox">
                    <scroll-view class="uni-swiper-tab" scroll-x>
                        <text v-for="item in recommendTags" class="tab" @click="changeMatter(item.keyword)">{{
                            item.keyword
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
            <view class="input-box"> <input v-model="classify" maxlength="3"
                    @input="classify = classify.replace(/ /g, '')" />
                <text v-if="classify.length" class="matter-num">{{
                    classify.length
                }}/3</text>
            </view>
            <button hover-class='none' class="save" @click="addNewClassify" :disabled="classify.length == 0">完成</button>
            <button hover-class='none' class="cancel" @click="isAddClassify = false">取消</button>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick, watch } from 'vue'
// 引入 
import { onLoad } from '@dcloudio/uni-app';
import billServer from '@/api/billApi'
import userInfoApi from '@/api/userInfoApi';
import filters from '@/utils/filters'
import customApi from '@/api/customClassifyMatter';
import { classifyType, customClassifyType, defaultOutputClassify, defaultInputClassify, CustomClassify } from '@/utils/staticData'
import dataUtils from '@/utils/dataUtils';
import { showNumber } from '@/utils/funTools'
import { useloginStore } from '@/pinia-store/login'
import BillTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()
const minDate = dataUtils.dateFormattimes(dataUtils.getMonTimes(4, -1), 'sDate')
const maxDate = dataUtils.dateFormattimes(dataUtils.getMonTimes(1, 1), 'sDate')

const allClassify = ref<customClassifyType>(
    {
        allOutput: [],
        inuseOutput: [],
        allInput: [],
        inuseInput: []
    }
)
const dataLoad = ref(false)

const chooseType = ref<number>(-1),
    moneyDisplay = ref('0'),
    showDate = ref(false),
    showTime = ref(false),
    isAddClassify = ref(false),
    datetimeValue = ref(),
    lastTime = ref(''),
    classify = ref(''),
    recommendTags = ref<selectedClassifyNode[]>([])

// 保存参数信息
const billForm = reactive({
    /**  账单ID*/
    bill_id: 0,
    /**  用户ID */
    user_id: Number(loginStore.userID),
    /**  账单类型 */
    bill_type: -1,
    /**  账单时间 */
    data_time: dataUtils.dateFormattere(new Date(), 'full'),
    /**  账单时间戳 */
    timestamp: new Date().getTime() + '',
    /**  账单金额 */
    money: 0,
    /**  账单事项 */
    matter: '',
    /**  账单分类 */
    classify: 0,
    /**  账单分类名 */
    classify_name: '',
    /**  账单备注 */
    notes: '',
})

const tags = [{
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '外卖'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '淘宝'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '打车'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '吃饭'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '零食'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '超市'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '买菜'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '旅游'
}, {
    classify_id: 2,
    classify_name: '餐饮',
    keyword: '机票'
}]
const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']

/**
 * 获取获取账单详情
 */
const changeChoose = (type: number) => {
    chooseType.value = type
},
    changeClassify = (type: number) => {
        billForm.classify = type
        console.log('billForm.classify', billForm.classify)
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
            if (edit.value)
                modifyBill()
            else
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
        //浮点数转为整数存进数据库中
        let money = dataUtils.floatToint(moneyDisplay.value)
        billForm.money = money
        billForm.bill_type = chooseType.value
        if (billForm.money == 0) {
            uni.showToast({ title: '请输入该账单金额', icon: 'none' })
            return
        }
        billForm.classify_name = filterClassifyName(billForm.bill_type, billForm.classify)
        const params = billForm
        console.log('保存参数', { ...params })
        const res = await billServer.addBill({ ...params })
        if (res.data == '添加成功') {
            uni.showToast({ title: '添加成功', duration: 800 })
            jumpPage()
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
        let params2 = {}
        if (chooseType.value == -1) {
            params2 = {
                userID: loginStore.userID,
                outputClassify: classify.value
            }
        }
        else {
            params2 = {
                userID: loginStore.userID,
                inputClassify: classify.value
            }
        }
        console.log('保存参数', params2, classify.value)
        const rr = await userInfoApi.addClassify(params2)
        if (rr.statusCode == 200) {
            uni.showToast({ title: '添加成功', duration: 800 })
            classify.value = ''
        }
        let temp = rr.data
        if (chooseType.value == -1)
            allClassify.value.inuseOutput.push(temp)
        else
            allClassify.value.inuseInput.push(temp)
        console.log('保存类别成功后rr----', allClassify.value.inuseOutput, allClassify.value.inuseInput)
        // getCustomClassify()
    },
    modifyBill = async () => {
        //let money = Number(moneyDisplay.value)
        //浮点数转为整数存进数据库中
        let money = dataUtils.floatToint(moneyDisplay.value)
        billForm.money = money
        billForm.bill_type = chooseType.value
        billForm.classify_name = filterClassifyName(billForm.bill_type, billForm.classify)
        // 保存修改后的账单
        const params = { ...billForm }
        console.log('修改后的账单', params)
        const res = billServer.updateBill(params)
        if ((await res).statusCode == 200) {
            uni.showToast({ title: '修改成功', duration: 800 })
            jumpPage()
        }
    }

function filterClassifyName(billType: number, id: number) {
    if (billType == -1) {
        let index = allClassify.value.inuseOutput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.inuseOutput[index].classify_name
        else
            return "自定义";
    }
    else {
        let index = allClassify.value.inuseInput.findIndex(e => e.classify_id == id)
        if (index != -1)
            return allClassify.value.inuseInput[index].classify_name
        else
            return "自定义";
    }
}

const deleteBill = () => {
    uni.showModal({
        title: '提示',
        content: '确定删除该账单吗？',
        success: async (res) => {
            if (res.confirm) {
                const params = {
                    userID: loginStore.userID,
                    billID: billForm.bill_id,
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
    jumpPage = () => {
        // 如果修改的账单时间距离(最新一条账单)超过7天，就刷新
        // if (dataUtils.dateFormatterDispose(billForm.timestamp, Number(lastTime.value))) {
        //     uni.reLaunch({
        //         url: '/pages/index/index'
        //     })
        // }
        // else {
        //     uni.switchTab({
        //         url: '/pages/index/index'
        //     })
        // }
        uni.reLaunch({
            url: '/pages/index/index'
        })
    }, getBillDetail = async (id: number) => {
        const res = await billServer.getBillDetial({ userID: Number(loginStore.userID), billID: id })
        console.log('获取账单详情--', res.data)
        billForm.bill_id = res.data.bill_id
        billForm.bill_type = res.data.bill_id
        /**  账单时间 */
        billForm.data_time = res.data.time
        /**  账单时间戳 */
        billForm.timestamp = res.data.timestamp
        /**  账单金额 */
        billForm.money = res.data.money
        /**  账单事项 */
        billForm.matter = res.data.matter
        /**  账单分类 */
        billForm.classify = res.data.classify
        /**  账单分类名 */
        billForm.classify_name = res.data.classify_name
        /**  账单备注 */
        billForm.notes = res.data.notes
        chooseType.value = res.data.bill_type
        moneyDisplay.value = showNumber(billForm.money) + ''
    }, inspectNum = (num: string) => {
        let dotIndex = num.indexOf('.')
        if (num.length - dotIndex > 3 && dotIndex != -1) {
            uni.showToast({ title: '最多输入两位小数', icon: 'none', duration: 800 })
            //截掉超出的最后一位
            console.log('截点前后', num, dotIndex, num.slice(0, dotIndex + 3))
            moneyDisplay.value = num.slice(0, dotIndex + 3)
        }
    }

watch(
    moneyDisplay,
    (newProps) => {
        console.log('改变了')
        inspectNum(newProps)
    },
);


function inCalc() {
    let str = moneyDisplay.value
    let res: boolean = str.includes('+') || str.includes('-')
    if (res)
        return '='
    else
        return '完成'
}

const edit = ref(false)

onLoad((option) => {
    if (option && option.bill_id) {
        getBillDetail(option.bill_id)
        //编辑账单
        edit.value = true;
        billForm.bill_id = option.bill_id
    }
    else {
        edit.value = false;
    }
    if (option && option.lastTime) {
        lastTime.value = option.lastTime;
    }
    else {
        lastTime.value = new Date().getTime() + ''
    }
})

async function getCustomClassify() {
    allClassify.value = await CustomClassify()
    console.log('所有分类--', allClassify.value)
    dataLoad.value = true
}

onMounted(() => {
    dataLoad.value = false
    //获取用户的类别词
    getUserInfoCustom()
    getCustomClassify()
    console.log('推荐标签', recommendTags.value)
})


async function getUserInfoCustom() {
    const res = await customApi.get({ userID: loginStore.userID })
    recommendTags.value = []
    res.data.forEach((e: { keyword: string; classify_id: number; classify_name: string; }) => {
        if (e.keyword.indexOf(',') != -1) {
            var arr = e.keyword.split(',')
            arr.forEach((item: any) => {
                let temp: selectedClassifyNode = {
                    classify_id: e.classify_id,
                    classify_name: e.classify_name,
                    keyword: item
                }
                recommendTags.value.push(temp)
            })
        }
        else {
            recommendTags.value.push(e)
        }
    })
    if (recommendTags.value.length < 9) {
        recommendTags.value = recommendTags.value.concat(tags.slice(0, 9 - recommendTags.value.length))
    }
}

interface selectedClassifyNode {
    classify_id: number,
    classify_name: string,
    keyword: string
}
</script>

<style lang="less" scoped>
.head {
    width: 100%;
    height: 100rpx;
    padding: 0 40rpx;
    position: fixed;
    top: 0;
    background: var(--headBg);
    color: var(--textColor);
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

    :depp(.uicon-checkmark) {
        color: var(--textColor) !important;
    }
}

.content {
    background-color: var(--pickerContent);
    padding: 100rpx 0 600rpx;
    width: 100%;

    .money {
        display: flex;
        flex-direction: row-reverse;
        padding: 20rpx 40rpx;
        width: 100%;
        color: var(--textColor);

        text {
            white-space: normal;
        }

        .num {
            font-size: 60rpx;
            font-weight: 600;
        }

        .yuan {
            font-size: 32rpx;
            color: var(--textLightColor);
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

            p {
                color: var(--textFourthColor);
            }
        }
    }

    .date-box {
        padding: 0 40rpx;
        margin-top: 50rpx;
        color: var(--textColor);

        .matter {
            display: flex;
            font-size: 32rpx;
            margin-bottom: 25rpx;

            .u-icon {
                margin-right: 20rpx;

                :depp(.uicon-edit-pen) {
                    color: var(--textColor) !important;
                }
            }

            .matter-input {
                width: 100%;
            }

            .matter-num {
                font-size: 28rpx;
                color: var(--textLightColor);
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
            background: var(--keyBoradHead);
            padding: 20rpx;
            position: relative;

            text {
                white-space: nowrap;
                color: var(--textThirdColor);
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
                    background: var(--keyBoradBtn);
                    border-radius: 0.5rem;
                    margin-right: 10rpx;
                    display: inline-block;
                }
            }

            .iconBox {
                background: var(--keyBoradHead);
            }
        }

        .but-box {
            width: 100%;
            background: var(--keyBoradBg);
            display: flex;
            padding: 20rpx;

            button {
                width: 150rpx;
                height: 100rpx;
                color: var(--textSecondColor);
                background-color: var(--keyBoradBtn);
                box-shadow: 0 5px 5px var(--keyBoradShadow);
                border-radius: 2rem;
            }

            button::after {
                border: none;
            }

            button:focus {
                outline: none; //去除点击之后默认的边框
                background: var(--pickerContent);
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
    // border-bottom: 2px solid #559eff;
    border-bottom: 2px solid var(--addBtnColor);
}

.addClassify {
    :deep(.u-popup__content) {
        width: 70%;
        height: 36%;
        background-color: var(--pickerContent);
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
            // border-bottom: 2px solid rgb(165, 165, 165);
            border-bottom: 2px solid var(--borderColor);
            align-items: center;
            padding: 5rpx 15rpx;
            margin: 0 auto;

            input {
                width: 100%;
                padding: 1prpx;
            }

            .matter-num {
                font-size: 28rpx;
                color: var(--textLightColor);
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
            background: var(--buttonBg);
            text-align: center;
        }

        .cancel {
            background-color: var(--cancelButtonBg);
            margin-top: 10rpx;
        }
    }
}
</style>
