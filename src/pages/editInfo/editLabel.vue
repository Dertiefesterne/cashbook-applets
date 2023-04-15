<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                我的惯用词
            </template>
            <template v-slot:icon-r>
                <u-icon name="checkmark" size="20" @click="saveLabel"></u-icon>
            </template>
        </headTop>
        <view class="content">
            <view class="input-box">
                <div @click="show = true" class="selectBox">
                    <span v-if="selectedClassify.classify">{{ selectedClassify.classifyName }}</span>
                    <span v-else class="placeholder">请选择</span>
                    <u-icon name="arrow-down-fill" size="10"></u-icon>
                </div>
                <input v-model="newLabel" maxlength="6" @input="newLabel = newLabel.replace(/ /g, '')"
                    placeholder="请输入事项" /><text @click="addNewLabel">添加</text>
            </view>
            <p class="advice"> 建议字数2~6字</p>
            <view class="alreadyAdd">
                <p> 已添加<sapn>({{ saveClassify.length }}/8)</sapn>
                </p>
                <p class="advice">增加账单页面个性推荐</p>
                <view class="label-box">
                    <u-tag v-for="(item, index) in saveClassify" :text="`${item.classify_name}-${item.keyword}`" closable
                        :show="saveClassify.includes(item)" @close="saveClassify.splice(index, 1)"></u-tag>
                </view>
                <!-- <view class="label-box">
                    <div class="labelItem" v-for="item in saveClassify">
                        {{ item.classifyName }}-{{ item.matter }}| <u-icon name="close" size="10"></u-icon>
                    </div>
                </view> -->
            </view>
        </view>
        <u-picker :show="show" :columns="selectedList" keyName="name" @close="show = false" @cancel="show = false"
            @confirm="confirmClassify"></u-picker>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoApi from '@/api/userInfoApi';
import userApi from '@/api/userApi';
import customApi from '@/api/customClassifyMatter';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const newLabel = ref('')
const userID = loginStore.userID
const close2 = ref(true)
const show = ref(false)
const selectedClassify = reactive({
    classify: 0,
    classifyName: ''
})

interface myClassify {
    classify: number,
    classifyName: string,
    matter: string
}

interface selectedClassifyNode {
    classify_id: number,
    classify_name: string,
    keyword: string
}
//提交的时候用
const saveClassifyTree = ref<selectedClassifyNode[]>([])

//显示的时候用
const saveClassify = ref<selectedClassifyNode[]>([])


const customClassifyMatter = ref([])

const selectedList = [[{
    classify: 2,
    name: '餐饮'
}, {
    classify: 3,
    name: '购物'
}, {
    classify: 4,
    name: '住房'
}, {
    classify: 5,
    name: '交通'
}, {
    classify: 6,
    name: '娱乐'
}, {
    classify: 7,
    name: '医疗'
}, {
    classify: 9,
    name: '工资'
}, {
    classify: 10,
    name: '投资'
}, {
    classify: 11,
    name: '理财'
}, {
    classify: 12,
    name: '红包'
}]]

onMounted(() => {
    //获取用户的类别词
    getUserInfoCustom()
})

async function getUserInfoCustom() {
    const res = await customApi.get({ userID: userID })
    console.log('获取用户的类别词', res.data)
    saveClassifyTree.value = res.data
    res.data.forEach((e: { keyword: string; classify_id: number; classify_name: string; }) => {
        if (e.keyword.indexOf(',') != -1) {
            var arr = e.keyword.split(',')
            arr.forEach((item: any) => {
                let temp: selectedClassifyNode = {
                    classify_id: e.classify_id,
                    classify_name: e.classify_name,
                    keyword: item
                }
                saveClassify.value.push(temp)
            })
        }
        else {
            saveClassify.value.push(e)
        }
    })
    console.log(saveClassifyTree.value, saveClassify.value)
}

const addNewLabel = async () => {
    if (saveClassify.value.length > 8) {
        selectedClassify.classify = 0
        selectedClassify.classifyName = ''
        newLabel.value = ''
        uni.showToast({ title: '已达添加上限', icon: 'none', duration: 800 })
        return
    }
    else if (saveClassify.value.findIndex(e => e.keyword == newLabel.value) != -1) {
        selectedClassify.classify = 0
        selectedClassify.classifyName = ''
        newLabel.value = ''
        uni.showToast({ title: '请勿添加重复标签', icon: 'none', duration: 1000 })
        return
    }
    else {
        let temp: selectedClassifyNode = {
            classify_id: selectedClassify.classify,
            classify_name: selectedClassify.classifyName,
            keyword: newLabel.value
        }
        saveClassify.value.push(temp)
        saveClassifyToTree(temp)
        selectedClassify.classify = 0
        selectedClassify.classifyName = ''
        newLabel.value = ''
    }
    console.log('saveClassify', saveClassify.value)
},
    saveClassifyToTree = (item: selectedClassifyNode) => {
        let index = saveClassifyTree.value.findIndex(e => e.classify_id == item.classify_id)
        if (index != -1) {
            saveClassifyTree.value[index].keyword = saveClassifyTree.value[index].keyword + ',' + item.keyword
        }
        else {
            saveClassifyTree.value.push(item)
        }
        console.log('saveClassifyTree', saveClassifyTree.value)
    },

    saveLabel = async () => {
        saveClassifyTree.value.forEach(async e => {
            const res = await customApi.update({ ...e, userID: userID })
        })
        uni.showToast({ title: '保存成功', duration: 800 })
        uni.switchTab({
            url: '/pages/my/index'
        })

    }, confirmClassify = (e: any) => {
        console.log('确定', e, e.value[0]);
        selectedClassify.classify = e.value[0].classify
        selectedClassify.classifyName = e.value[0].name
        show.value = false
    }
</script>

<style lang="less" scoped>
.container {
    height: 100vh;
    background-color: var(--pickerContent);
    padding-bottom: 100rpx;

    .content {
        padding: 100rpx 40rpx 0;

        .input-box {
            display: flex;
            margin: 100rpx 0 10rpx;

            // align-items: center;
            // padding: 0 140rpx;
            input {
                width: 250rpx;
                height: 25px;
                border: 1px solid var(--weightBorderColor);
                border-radius: 4px;
                font-size: 14px;

            }

            text {
                width: 50px;
                height: 27px;
                text-align: center;
                line-height: 25px;
                background: var(--buttonBg2);
                border: 1px solid var(--weightBorderColor);
                border-radius: 4px;
                white-space: nowrap;
            }

            .selectBox {
                width: 60px;
                height: 25px;
                border: 1px solid var(--weightBorderColor);
                border-radius: 4px;
                color: var(--textColor);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 8px;
                margin-right: 0.1rpx;

                .placeholder {
                    color: var(--textLightColor);
                    font-size: 12px;
                }
            }

            .input-placeholder {
                color: var(--textLightColor);
                font-size: 12px;
            }
        }

        .advice {
            font-size: 12px;
            color: var(--textLightColor);
        }

        .alreadyAdd {
            margin-top: 40rpx;
            color: var(--textColor);

            .label-box {
                display: flex;
                flex-wrap: wrap;

                .labelItem {
                    display: flex;
                    padding: 4px 6px;
                    border: 1px solid var(--buttonBg2);
                    background-color: var(--buttonBg2);
                }
            }
        }
    }

}
</style>