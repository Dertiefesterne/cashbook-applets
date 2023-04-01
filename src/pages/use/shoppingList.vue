<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                购物清单
            </template>
        </headTop>
        <view class="content">
            <view v-if="toBuyList.length" class="toBuyList">
                <view v-for="(item, index) in toBuyList.filter(e => e.state == 'N')" class="item">
                    <!-- Y-待购买  N-已买 -->
                    <i class="iconfont icon-round" style="font-size:20px;" @click="changeState(item.item_id)"></i>
                    <view class="item-content" @click="edit(item)">
                        <span class="stress2">{{ item.item_name }}</span>
                        <span v-if="item.item_budget" class="stress">￥{{ showNumber(item.item_budget) }}</span>
                    </view>
                </view>
                <view>已购买>></view>
                <view v-for="(item, index) in toBuyList.filter(e => e.state == 'Y')" class="item compeleted">
                    <!-- Y-待购买  N-已买 -->
                    <u-checkbox-group v-model="checkboxValue1">
                        <u-checkbox v-model="item.state" :checked="item.state == 'Y'" shape="circle"
                            disabled="true"></u-checkbox>
                    </u-checkbox-group>
                    <view class="item-content" @click="edit(item)">
                        <span>{{ item.item_name }}</span>
                        <span v-if="item.item_budget">￥{{ showNumber(item.item_budget) }}</span>
                    </view>
                </view>
                <view class="sum">
                    <i class="iconfont icon-biaodan"></i>
                    共<span class="stress2">{{ toBuyList.filter(e => e.state == 'N').length
                    }}</span>件物品，预计花费<span class="stress2">{{ showNumber(getSum()) }}</span>元
                </view>
            </view>
            <view class="no-charts" v-else>
                <i class="iconfont icon-zanwushuju" style="font-size:200rpx"></i>
                <p>暂无待购清单</p>
            </view>
        </view>
        <!-- 增加自定义类别弹窗 -->
        <u-popup :show="isAdd" class="addClassify" mode="center" @close="isAdd = false">
            <u-icon name="close-circle" size="20" @click="isAdd = false"></u-icon>
            <view class="head-title">{{ editItem.id ? '编辑' : '添加' }}</view>
            <view class="input-box">
                <span>名称:</span>
                <input v-model.trim="itemName" maxlength="10" @input="itemName = itemName.replace(/ /g, '')" />
            </view>
            <view class="input-box">
                <span>预算:</span>
                <input v-model="itemBudget" maxlength="10" type="number" @input="processNum" />
            </view>
            <view class="tip"><i class="iconfont icon-tishi"></i>结果只保留两位小数</view>
            <view class="but-box">
                <button hover-class='none' class="save" @click="saveItem(0)" v-if="!editItem.id">保存并继续</button>
                <button hover-class='none' :class="editItem.id ? 'save' : 'cancel'" @click=saveItem(1)>保存</button>
                <button hover-class='none' class="save" v-if="editItem.id && editItem.state == 'Y'"
                    @click="changeState2(editItem.id)" style="margin-right:20rpx ;">改为未购</button>
                <button hover-class='none' class="cancel" @click="deleteToBuy(editItem.id)" v-if="editItem.id">删除</button>
            </view>
        </u-popup>
        <view @click="addItem" class="buttom-add">
            添加
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import toBuyApi from '@/api/toBuyApi';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const userID = loginStore.userID

interface toBuyItem {
    item_id: number,
    item_name: string,
    state: string,
    item_budget: number
}

const toBuyList = ref<toBuyItem[]>([]),
    isAdd = ref(false),
    itemName = ref(''),
    itemBudget = ref(''),
    editId = ref(0),
    checkboxValue1 = ref([]),
    editItem = reactive({
        id: 0,
        state: '',
    })

const addItem = () => {
    itemName.value = ''
    itemBudget.value = ''
    editItem.id = 0
    editItem.state = ''
    isAdd.value = true
},
    saveItem = async (close: number) => {
        if (itemName.value == '' || itemBudget.value == '')
            return
        if (close)
            isAdd.value = false
        var src = ''
        let index = itemBudget.value.indexOf('.')
        if (index != -1) {
            if (itemBudget.value.length - index == 3) {
                console.log('两位小数')
                src = itemBudget.value.replace('.', '')
            }
            else if (itemBudget.value.length - index == 2) {
                console.log('1位小数')
                src = itemBudget.value.replace('.', '') + '0'
            }
        }
        else
            src = Number(itemBudget.value) + '00'
        if (editItem.id) {
            updateItem(parseInt(src), itemName.value)
            return
        }
        let params = {
            userID: userID,
            name: itemName.value,
            budget: parseInt(src)
        }
        console.log('参数', itemBudget.value, src)
        await toBuyApi.add(params)
        itemName.value = ''
        itemBudget.value = ''
        editItem.id = 0
        editItem.state = ''
        getList()
    },
    changeState = async (id: number) => {
        console.log('改变了???', id)
        await toBuyApi.changeState({ userID: userID, itemID: id, state: 'Y' })
        getList()
    },
    changeState2 = async (id: number) => {
        await toBuyApi.changeState({ userID: userID, itemID: id, state: 'N' })
        getList()
        isAdd.value = false
    },
    showNumber = (n: number) => {
        let f = n / 100;
        let s = n % 100;
        let src = f + '.' + s
        return parseFloat(src)
    }, deleteToBuy = async (toBuyId: number) => {
        // toBuyList.value.splice(index, 1)
        await toBuyApi.delete({ userID: userID, itemID: toBuyId })
        isAdd.value = false
        getList()
    }, edit = (e: toBuyItem) => {
        editItem.id = e.item_id
        editItem.state = e.state
        itemName.value = e.item_name
        itemBudget.value = showNumber(e.item_budget) + ''
        isAdd.value = true
    },
    updateItem = async (budget: number, name: string) => {
        let params = {
            userID: userID,
            itemID: editItem.id,
            name: name,
            budget: budget
        }
        await toBuyApi.update(params)
        isAdd.value = false
        itemName.value = ''
        itemBudget.value = ''
        editItem.id = 0
        editItem.state = ''
        getList()
    },
    processNum = () => {
        let index = itemBudget.value.indexOf('.')
        if (index != -1)
            itemBudget.value = itemBudget.value.slice(0, index + 3)
    }

async function getList() {
    const res = await toBuyApi.getList({ userID: loginStore.userID })
    if (res.statusCode == 200) {
        toBuyList.value = res.data
        console.log('待购清单--', toBuyList.value)
    }
}

function getSum() {
    let sum = 0
    toBuyList.value.forEach(e => {
        if (e.state == 'N' && e.item_budget)
            sum += e.item_budget
    })
    return sum
}



onMounted(() => {
    getList()
})

</script>


<style lang="less" scoped>
.container {
    height: 100vh;
    overflow-y: auto;
    background-color: var(--pickerContent);
    color: var(--textColor);
    position: relative;

    .content {
        padding: 120rpx 90rpx 120rpx;
        background-color: var(--pickerContent);

        .item {
            margin: 20rpx 0;
            display: flex;
            align-items: center;

            .icon-round {
                color: var(--lightColor);
                margin-right: 10rpx;
            }

            .item-content {
                width: 100%;
                border: 1px solid var(--textLightColor);
                background-color: var(--menuItem);
                border-radius: 10rpx;
                display: flex;
                padding: 25rpx;
                justify-content: space-between;
            }
        }

        .circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #bfbfbf;
            box-sizing: border-box;
        }

        .sum {
            margin: 40rpx 0;
            padding: 10px;
            text-align: center;
            color: #303133;
            background-color: var(--billSumBg2);
            box-shadow: 0px 0px 3px 3px var(--billSumBg2);
            border-radius: 10px;

            .icon-biaodan {
                margin-right: 5px;
            }
        }

        .compeleted {
            opacity: 0.5;
        }

        .no-charts {
            width: 100%;
            margin-top: 100rpx;
            display: flex;
            align-items: center;
            flex-direction: column;

            p,
            i {
                color: var(--lightColor);
            }
        }

        .stress {
            color: var(--billSumColor);
            font-weight: bold;
        }

        .stress2 {
            font-weight: bold;
        }
    }

    .buttom-add {
        width: 100%;
        height: 120rpx;
        line-height: 120rpx;
        text-align: center;
        position: fixed;
        bottom: 0;
        background-color: var(--billSumBg);
        color: #303133;
        font-weight: bold;
        font-size: 42rpx;
    }
}

.addClassify {
    position: relative;

    .u-icon {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
    }

    :deep(.u-popup__content) {
        width: 60%;
        background-color: var(--pickerContent);
        position: relative;
        border-radius: 10rpx;
        padding: 30rpx;

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
            width: 100%;
            display: flex;
            font-size: 32rpx;
            align-items: center;
            padding: 15rpx 0;
            margin: 0 auto;

            span {
                display: inline-block;
                white-space: nowrap;
                text-align: right;
                margin-right: 10rpx;
                font-weight: bold;
            }

            input {
                border-bottom: 2px solid var(--borderColor);
            }

            .matter-num {
                font-size: 28rpx;
                color: var(--textLightColor);
            }
        }

        .tip {
            display: flex;
            align-items: center;
            color: var(--lightColor);
            font-size: 24rpx;

            .icon-tishi {
                font-size: 24rpx;
                margin-right: 2px;
            }
        }

        button {

            line-height: 70rpx;
            border-radius: 10rpx;
            margin: 0;
            white-space: nowrap;
            padding: 0 15rpx;
            font-size: 14px;

            &::after {
                border: none;
            }
        }

        .but-box {
            margin-top: 20rpx;
            display: flex;
            flex-direction: row-reverse;

            .save {
                background: var(--billSumBg2);
                text-align: center;
            }

            .cancel {
                background-color: var(--cancelButtonBg);
                margin-right: 20rpx;
            }

            .del {}
        }
    }
}
</style>

