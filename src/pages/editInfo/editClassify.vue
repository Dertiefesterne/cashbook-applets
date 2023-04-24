<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                账单类别
            </template>
            <template v-slot:icon-r>
                <u-icon name="checkmark" size="20" @click="saveLabel"></u-icon>
            </template>
        </headTop>
        <view class="content">
            <u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
            <view class="input-box">
                <input v-model="NewClassify" maxlength="3" @input="NewClassify = NewClassify.replace(/ /g, '')" /><text
                    @click="addNewLabel">添加</text>
            </view>
            <p class="advice"> 建议字数：2</p>
            <view class="alreadyAdd">
                <p> 系统分类<span class="advice">(不可删除)</span></p>
                <!-- 支出 -->
                <view class="label-box2" v-if="curNow == 0">
                    <u-tag v-for="item in defaultOutputClassify" :text="item.classify_name">
                    </u-tag>
                </view>
                <!-- 收入 -->
                <view class="label-box2" v-else>
                    <u-tag v-for="item in defaultInputClassify" :text="item.classify_name">
                    </u-tag>
                </view>
            </view>
            <view class="alreadyAdd">
                <p> 自定义类别<sapn>({{ curNow ? inputClassify?.length : outputClassify?.length }}/3)</sapn>
                </p>
                <!-- <p class="advice">最多设置3个</p> -->
                <view class="label-box2" v-if="curNow == 0">
                    <u-tag v-for="(item, index) in outputClassify" closable :text="item.classify_name"
                        :show="outputClassify.includes(item)" @close="outputClassify.splice(index, 1)"
                        @click="modifyClassifyName(index, item)"></u-tag>
                </view>
                <view class="label-box2" v-else>
                    <u-tag v-for="(item, index) in inputClassify" closable :text="item.classify_name"
                        :show="inputClassify.includes(item)" @close="inputClassify.splice(index, 1)"
                        @click="modifyClassifyName(index, item)"></u-tag>
                </view>
            </view>
        </view>
        <!-- 修改自定义类别名字弹窗 -->
        <u-popup :show="isModifyClassify" class="addClassify" mode="center" @close="isModifyClassify = false">
            <view class="head-title">修改类别名称</view>
            <p>分类名称:</p>
            <view class="input-box"> <input v-model="modifyingName" maxlength="3"
                    @input="modifyingName = modifyingName.replace(/ /g, '')" />
                <text v-if="modifyingName.length" class="matter-num">{{
                    modifyingName.length
                }}/3</text>
            </view>
            <button hover-class='none' class="save" @click="comfireModifyClassifyName"
                :disabled="modifyingName.length == 0">完成</button>
            <button hover-class='none' class="cancel" @click="isModifyClassify = false">取消</button>
        </u-popup>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoApi from '@/api/userInfoApi';
import { customClassifyType, CustomClassify, defaultOutputClassify, defaultInputClassify } from '@/utils/staticData'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const NewClassify = ref('')
const userID = loginStore.userID
const outputClassify = ref<any[]>([])
const inputClassify = ref<any[]>([])
const curNow = ref(0)
const list = ['支出类别', '收入类别']

const allClassify = ref<customClassifyType>(
    {
        allOutput: [],
        inuseOutput: [],
        allInput: [],
        inuseInput: []
    }
)

const isModifyClassify = ref(false), modifyingName = ref(''), modifyingId = ref(0), modifyingIndex = ref(0)

onMounted(() => {
    //获取用户的自定义类别
    getCustomClassify()
})

async function getCustomClassify() {
    allClassify.value = await CustomClassify()
    outputClassify.value = allClassify.value.inuseOutput.filter(e => e.isSys == 'N').map(e => {
        return {
            classify_name: e.classify_name,
            classify_id: e.classify_id
        }
    })
    inputClassify.value = allClassify.value.inuseInput.filter(e => e.isSys == 'N').map(e => {
        return {
            classify_name: e.classify_name,
            classify_id: e.classify_id
        }
    })
}

const addNewLabel = async () => {
    if (curNow.value == 0)
        addOutputClassify()
    else if (curNow.value == 1) {
        addinputClassify()
    }

}, saveLabel = async () => {
    if (curNow.value == 0) {
        const outputClassify1 = outputClassify.value.map(e => e.classify_name)
        const res = userInfoApi.updataClassify({ userID: userID, outputClassify: outputClassify1.join(',') })
        if ((await res).statusCode == 200) {
            uni.showToast({ title: '保存成功', duration: 500 })
            uni.switchTab({
                url: '/pages/my/index'
            })
        }
    }
    else {
        const inputClassify1 = inputClassify.value.map(e => e.classify_name)
        const res = userInfoApi.updataClassify({ userID: userID, inputClassify: inputClassify1.join(',') })
        if ((await res).statusCode == 200) {
            uni.showToast({ title: '保存成功', duration: 500 })
            uni.switchTab({
                url: '/pages/my/index'
            })
        }
    }

}, addOutputClassify = async () => {

    if (outputClassify.value?.length == 3) {
        NewClassify.value = ''
        uni.showToast({ title: '添加个数已达上限', icon: 'none', duration: 800 })
        return
    }
    else if (outputClassify.value?.findIndex(e => e.classify_name == NewClassify.value) != -1) {
        uni.showToast({ title: '请勿添加重复类别', icon: 'none', duration: 800 })
        return
    }
    else {
        let temp = {
            classify_name: NewClassify.value,
            classify_id: -1
        }
        outputClassify.value.push(temp)
        NewClassify.value = ''
    }
}, addinputClassify = async () => {
    if (inputClassify.value.length == 3) {
        NewClassify.value = ''
        uni.showToast({ title: '添加个数已达上限', icon: 'none', duration: 800 })
        return
    }
    else if (inputClassify.value.findIndex(e => e.classify_name == NewClassify.value) != -1) {
        uni.showToast({ title: '请勿添加重复类别', icon: 'none', duration: 800 })
        return
    }
    else {
        let temp = {
            classify_name: NewClassify.value,
            classify_id: -1
        }
        inputClassify.value.push(temp)
        NewClassify.value = ''
    }
}, sectionChange = (index: number) => {
    curNow.value = index;
}, modifyClassifyName = (index: number, item: any) => {
    isModifyClassify.value = true
    modifyingName.value = item.classify_name
    modifyingId.value = item.classify_id
    modifyingIndex.value = index
    console.log('修改该类别名字---', item)

},
    comfireModifyClassifyName = () => {
        let temp = {
            classify_name: modifyingName.value,
            classify_id: modifyingId.value
        }
        if (curNow.value == 0) {
            outputClassify.value.splice(modifyingIndex.value, 1, temp)
            if (modifyingId.value != -1) {
                //发请求修改类名
                userInfoApi.modifyClassifyName({ classify_name: modifyingName.value, classify_id: modifyingId.value })
            }
        }
        else {
            inputClassify.value.splice(modifyingIndex.value, 1, temp)
            if (modifyingId.value != -1) {
                //发请求修改类名
                userInfoApi.modifyClassifyName({ classify_name: modifyingName.value, classify_id: modifyingId.value })
            }
        }
        isModifyClassify.value = false
    }
</script>

<style lang="less" scoped>
.container {
    height: 100vh;
    background-color: var(--pickerContent);
    // color: var(--textColor);
    padding-bottom: 100rpx;

    .content {
        padding: 120rpx 40rpx 0;

        .input-box {
            display: flex;
            margin: 100rpx 0 10rpx;

            // align-items: center;
            // padding: 0 140rpx;
            input {
                width: 200rpx;
                border-bottom: 2px solid var(--weightBorderColor);
                font-size: 34rpx;
                font-weight: 600;
            }

            text {
                width: 50px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                background: var(--buttonBg2);
                border-radius: 10px;
                white-space: nowrap;
            }
        }

        .advice {
            margin-left: 3px;
            font-size: 12px;
            color: var(--textLightColor);
        }

        .alreadyAdd {
            margin-top: 40rpx;
            color: var(--textColor);

            .label-box {
                margin-top: 20rpx;
                display: grid;
                grid-gap: 8px 5px;
                //内容整体平均分布
                justify-content: space-between;
                //单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充
                grid-template-columns: repeat(auto-fill, 58px); //单元格的大小是65px
            }

            .label-box2 {
                margin-top: 20rpx;
                display: flex;
                flex-wrap: wrap;

                :deep(.u-tag) {
                    margin-right: 15rpx !important;
                    margin-bottom: 15rpx;
                }
            }
        }

        :deep(.u-subsection--button) {
            background-color: var(--menuItem) !important;

            //     .u-subsection__item {
            //         background-color: var(--pickerContent);
            //     }
        }
    }

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