<template>
    <view class="container">
        <headTop>
            <!-- <template v-slot:icon-l>
                <u-icon name="arrow-left" size="20" @click="back"></u-icon>
            </template> -->
            <template v-slot:title>
                修改密码
            </template>
            <template v-slot:icon-r>
                <span @click="next"> {{ step ? '完成' : '下一步' }}</span>
            </template>
        </headTop>
        <view class="content" v-if="step == 0">
            <input v-model="oldPassWord" type="password" maxlength="15" placeholder="请输入原始密码" />
            <button class="confirm" hover-class='none' @click="next">下一步</button>
        </view>
        <view class="content1" v-else>
            <h1>设置新密码</h1>
            <view class="input-item"><span>新密码</span><input v-model="newPassWord" maxlength="15" placeholder="请输入密码"
                    @input="verifyPassWord" />
            </view>
            <view class="input-item"><span>确认密码</span><input v-model="confirmPassWord" maxlength="15"
                    placeholder="请再次输入密码" /></view>
            <view class="input-item"><u-icon :name="verify1 ? 'checkmark-circle-fill' : 'checkmark-circle'"
                    size="20"></u-icon>至少含2种以上字符</view>
            <view class="input-item"><u-icon :name="verify2 ? 'checkmark-circle-fill' : 'checkmark-circle'"
                    size="20"></u-icon>密码由8-15位数字、字母或符合组成</view>
            <view class="input-item" v-if="verify3"><u-icon name="info-circle" size="20" color="red"></u-icon>不能包含中文</view>
            <button class="confirm" hover-class='none' @click="next" :disabled="!disabled">确定</button>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoServer from '@/api/userInfoApi';
import userServer from '@/api/userApi'
import { useloginStore } from '@/pinia-store/login'
import verify from '@/utils/verify';
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname),
    step = ref(0),
    oldPassWord = ref(''),
    newPassWord = ref(''),
    confirmPassWord = ref(''),
    verify1 = ref(false),
    verify2 = ref(false),
    verify3 = ref(false)

const disabled = computed(() => {
    return confirmPassWord.value == newPassWord.value && newPassWord.value != ''
})
onMounted(() => {
    // name.value = loginStore.info.nickname
    // console.log('用户昵称', loginStore.info.nickname)
})

const modifyNickName = async () => {
    console.log('modifyNickName', name.value)
    const params = { userID: loginStore.userID, nickname: name.value }
    const res = await userInfoServer.updateInfo(params)
    if (res.statusCode == 200) {
        uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
        })
        loginStore.setInfoName(name.value)
        uni.switchTab({
            url: '/pages/my/index'
        })
    }
}, verifyPassWord = () => {
    let passWord = newPassWord.value.replace(/ /g, '')
    if (passWord == '') {
        return
    }
    // var verify = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,15}$/;
    var verify = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]/;
    var charVerify = /.*[\u4e00-\u9fa5]+.*$/;
    console.log('验证结果', verify.test(passWord))
    charVerify.test(passWord) ? verify3.value = true : verify3.value = false
    if (verify.test(passWord)) {
        verify1.value = true
        passWord.length > 7 ? verify2.value = true : verify2.value = false
    }
    else {
        verify1.value = false
    }

}, next = async () => {
    console.log('点击下一步')
    if (step.value == 0) {
        if (oldPassWord.value == '') {
            uni.showToast({
                title: '密码不能为空',
                icon: 'none',
                duration: 800
            })
            return
        }
        //检测旧密码是否正确
        const res = await userServer.login({ userName: loginStore.info.user_name, passWord: oldPassWord.value })
        if (res.data > 0) {
            step.value = 1
        }
        else {
            uni.showToast({
                title: '密码错误',
                icon: 'none',
                duration: 800
            })
        }
    }
    else {
        const res = await userServer.modifyPassWord({ userID: loginStore.userID, passWord: newPassWord.value })
        if (res.data == '修改成功') {
            uni.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 800
            })
            uni.navigateTo({
                url: '/pages/login/index'
            })
        }
    }
}
</script>


<style lang="less" scoped>
.container {

    .content {
        padding: 100rpx 140rpx 0;
        margin-top: 120rpx;

        input {
            width: 100%;
            border-bottom: 2px solid rgb(58, 58, 58);
            margin-top: 20rpx;
            font-size: 30rpx;
        }

    }

    .confirm {
        margin-top: 60rpx;
        width: 100%;
        background: rgba(174, 208, 238, 0.5);
        border-radius: 6rem;

        &::after {
            border: none;
        }
    }

    .content1 {
        padding: 140rpx 60rpx 0;

        h1 {
            margin-bottom: 40rpx;
        }

        .input-item {
            display: flex;
            margin-bottom: 20rpx;
            font-size: 32rpx;

            &:nth-child(3) {
                margin-bottom: 40rpx;
            }

            span {
                margin-right: 10rpx;
            }
        }
    }

}
</style>