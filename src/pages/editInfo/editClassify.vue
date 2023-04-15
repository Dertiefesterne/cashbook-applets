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
                    <u-tag v-for="(item, index) in outputClassify" closable :text="item"
                        :show="outputClassify.includes(item)" @close="outputClassify.splice(index, 1)"></u-tag>
                </view>
                <view class="label-box2" v-else>
                    <u-tag v-for="(item, index) in inputClassify" closable :text="item" :show="inputClassify.includes(item)"
                        @close="inputClassify.splice(index, 1)"></u-tag>
                </view>
            </view>
        </view>
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


onMounted(() => {
    //获取用户的自定义类别
    getCustomClassify()
})

async function getCustomClassify() {
    allClassify.value = await CustomClassify()
    outputClassify.value = allClassify.value.inuseOutput.filter(e => e.isSys == 'N').map(e => e.classify_name)
    inputClassify.value = allClassify.value.inuseInput.filter(e => e.isSys == 'N').map(e => e.classify_name)
}

const addNewLabel = async () => {
    if (curNow.value == 0)
        addOutputClassify()
    else if (curNow.value == 1) {
        addinputClassify()
    }

}, saveLabel = async () => {
    if (curNow.value == 0) {
        const res = userInfoApi.updataClassify({ userID: userID, outputClassify: outputClassify.value.join(',') })
        if ((await res).statusCode == 200) {
            uni.showToast({ title: '保存成功', duration: 500 })
            uni.switchTab({
                url: '/pages/my/index'
            })
        }
    }
    else {
        const res = userInfoApi.updataClassify({ userID: userID, inputClassify: inputClassify.value.join(',') })
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
    else if (outputClassify.value?.includes(NewClassify.value)) {
        uni.showToast({ title: '请勿添加重复类别', icon: 'none', duration: 800 })
        return
    }
    else {
        outputClassify.value.push(NewClassify.value)
        NewClassify.value = ''
    }
}, addinputClassify = async () => {
    if (inputClassify.value.length == 3) {
        NewClassify.value = ''
        uni.showToast({ title: '添加个数已达上限', icon: 'none', duration: 800 })
        return
    }
    else if (inputClassify.value.includes(NewClassify.value)) {
        uni.showToast({ title: '请勿添加重复类别', icon: 'none', duration: 800 })
        return
    }
    else {
        inputClassify.value.push(NewClassify.value)
        NewClassify.value = ''
    }
}, sectionChange = (index: number) => {
    curNow.value = index;
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
</style>