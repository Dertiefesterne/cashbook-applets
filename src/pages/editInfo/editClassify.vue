<template>
    <view class="container">
        <headTop>
            <template v-slot:title>
                账单类别
            </template>
            <template v-slot:icon>
                <u-icon name="checkmark" size="20" @click="saveLabel"></u-icon>
            </template>
        </headTop>
        <view class="content">
            支出类别
            <view class="input-box">
                <input v-model="newLabel" maxlength="2" @input="newLabel = newLabel.replace(/ /g, '')" /><text
                    @click="addNewLabel">添加</text>
            </view>
            <p class="advice"> 建议字数2字</p>
            <view class="alreadyAdd">
                <p> 已添加<sapn>({{ selectedClassify.length }}/8)</sapn>
                </p>
                <p class="advice">增加账单页面个性推荐</p>
                <view class="label-box">
                    <u-tag v-for="(item, index) in selectedClassify" :text="item" closable
                        :show="selectedClassify.includes(item)" @close="selectedClassify.splice(index, 1)"></u-tag>
                </view>
            </view>
            收入类别
        </view>

    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoApi from '@/api/userInfoApi';
import userApi from '@/api/userApi';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const newLabel = ref('')
const userID = loginStore.userID
const selectedClassify = ref<string[]>([])
const close2 = ref(true)
onMounted(() => {
    //获取用户惯用词
    getUserInfoLabel()
})

async function getUserInfoLabel() {
    const res = await userApi.getInformation({ userID: userID })
    console.log('userInfo----', res.data)
    selectedClassify.value = res.data.customClassify.split(',')
    console.log('userInfo----', selectedClassify.value)
}

const addNewLabel = async () => {
    if (selectedClassify.value.length == 8) {
        newLabel.value = ''
        return
    }
    else if (selectedClassify.value.includes(newLabel.value)) {
        uni.showToast({ title: '请勿添加重复类别', icon: 'none', duration: 1000 })
        return
    }
    else
        selectedClassify.value.push(newLabel.value)
    newLabel.value = ''


}, saveLabel = async () => {
    const res = userInfoApi.updateUserClassify({ userID: userID, customClassify: selectedClassify.value.join(',') })
    if ((await res).statusCode == 200) {
        uni.showToast({ title: '保存成功', duration: 500 })
        uni.switchTab({
            url: '/pages/my/index'
        })
    }
}
</script>

<style lang="less" scoped>
.container {

    .content {
        padding: 100rpx 40rpx 0;

        .input-box {
            display: flex;
            margin: 100rpx 0 10rpx;

            // align-items: center;
            // padding: 0 140rpx;
            input {
                width: 200rpx;
                border-bottom: 2px solid rgb(58, 58, 58);
                font-size: 34rpx;
                font-weight: 600;
            }

            text {
                width: 50px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                background: rgba(174, 208, 238, 0.5);
                border-radius: 10px;
                white-space: nowrap;
            }
        }

        .advice {
            font-size: 12px;
            color: #999;
        }

        .alreadyAdd {
            margin-top: 40rpx;

            .label-box {
                display: flex;
                flex-wrap: wrap;

            }
        }
    }

}
</style>