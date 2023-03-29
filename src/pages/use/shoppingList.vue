<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                购物清单
            </template>
        </headTop>
        <view class="content">
            <view v-if="toBuyList.length" class="toBuyList">
                <view v-for="(item, index) in toBuyList.filter(e => e.state == 'Y')" class="item">
                    <!-- Y-待购买  N-已买 -->
                    <u-checkbox shape="circle" @change="changeState($event, item.item_id)"></u-checkbox>
                    <view class="item-content">
                        <span>{{ item.item_name }}</span>
                        <span v-if="item.item_budget">{{ showNumber(item.item_budget) }}</span>
                        <span @click="deleteToBuy(item.item_id)">删除</span>
                    </view>
                </view>
                <view>已购买>></view>
                <view v-for="(item, index) in toBuyList.filter(e => e.state == 'N')" class="item compeleted">
                    <!-- Y-待购买  N-已买 -->
                    <u-checkbox v-model="item.state" :checked="item.state == 'N'" shape="circle"></u-checkbox>
                    <view class="item-content">
                        <span>{{ item.item_name }}</span>
                        <span v-if="item.item_budget">{{ showNumber(item.item_budget) }}</span>
                        <span @click="deleteToBuy(item.item_id)">删除</span>
                    </view>
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
            <view class="head-title">添加待购项</view>
            <view class="input-box">
                <span>名称:</span>
                <input v-model.trim="itemName" maxlength="10" @input="itemName = itemName.replace(/ /g, '')" />
            </view>
            <view class="input-box">
                <span>预算:</span>
                <input v-model="itemBudget" maxlength="10" type="number"
                    @input="itemBudget = itemBudget.slice(0, itemBudget.indexOf('.') + 3)" />
            </view>
            <p>结果只保留两位小数</p>
            <view class="but-box">
                <button hover-class='none' class="save" @click="saveItem(0)">保存并继续</button>
                <button hover-class='none' class="cancel" @click=saveItem(1)>保存</button>
            </view>
        </u-popup>
        <view @click="addItem" class="buttom-add">
            添加
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
    itemBudget = ref('')

const addItem = () => {
    isAdd.value = true
},
    saveItem = async (close: number) => {
        if (close)
            isAdd.value = false
        if (itemName.value == '' || itemBudget.value == '')
            return
        let src = Number(itemBudget.value) * 100 + ''
        let params = {
            userID: userID,
            name: itemName.value,
            budget: parseInt(src)
        }
        console.log('参数', params)
        await toBuyApi.add(params)
        itemName.value = ''
        itemBudget.value = ''
        getList()
    },
    changeState = async (e: Event, id: number) => {
        console.log('改变了???', e, id)
        if (e)
            await toBuyApi.update({ userID: userID, itemID: id, state: 'N' })
        getList()
    },
    showNumber = (n: number) => {
        let f = n / 100;
        let s = n % 100;
        let src = f + '.' + s
        return parseFloat(src)
    }, deleteToBuy = async (toBuyId: number) => {
        // toBuyList.value.splice(index, 1)
        await toBuyApi.delete({ userID: userID, itemID: toBuyId })
        getList()
    }

async function getList() {
    const res = await toBuyApi.getList({ userID: loginStore.userID })
    if (res.statusCode == 200) {
        toBuyList.value = res.data
        console.log('待购清单--', toBuyList.value)
    }
}

onMounted(() => {
    getList()
})

</script>


<style lang="less" scoped>
.container {
    height: 100vh;
    background-color: var(--pickerContent);
    color: var(--textColor);
    padding-bottom: 100rpx;
    position: relative;

    .content {
        padding: 100rpx 120rpx 50rpx;
        background-color: var(--pickerContent);

        .item {
            margin: 20rpx 0;
            display: flex;

            .item-content {
                border: 1px solid var(--textLightColor);
                background-color: var(--menuItem);
                border-radius: 10rpx;
                display: flex;
                padding: 20rpx;
            }
        }

        .compeleted {
            opacity: 0.5;
        }
    }

    .buttom-add {
        width: 100%;
        height: 120rpx;
        line-height: 120rpx;
        text-align: center;
        position: absolute;
        bottom: 0;
        background-color: var(--billSumBg);
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
            // border-bottom: 2px solid rgb(165, 165, 165);
            align-items: center;
            padding: 15rpx;
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
                background: var(--buttonBg);
                text-align: center;
            }

            .cancel {
                background-color: var(--cancelButtonBg);
                margin-right: 20rpx;
            }
        }
    }
}
</style>