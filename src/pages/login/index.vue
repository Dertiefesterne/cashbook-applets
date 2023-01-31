<template>
  <view class="content ">
    <view class="top">
      <h3>登录页</h3>
    </view>
    <view class="table">
      <view><input maxlength="15" placeholder="用户名" v-model="userName" @input="ifRegister(userName)" />
      </view>
      <view class="info-warn" v-if="noRegister && userName.length">
        <u-icon name="info-circle" color="red"></u-icon>该账号尚未注册
      </view>
      <view><input maxlength="15" placeholder="密码" v-model="passWord" /></view>
    </view>
    <view class="login-btn">
      <button @click="confirmLogin" hover-class='none' :disabled="noRegister">登录</button>
      <button @click="registerUser" hover-class='none' :disabled="!noRegister">注册</button>
      <BillTypeIconVue />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userServer from '@/api/userApi'
import { useloginStore } from '@/pinia-store/login'
import BillTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()

const acount = ref(),
  userName = ref(''),
  passWord = ref(''),
  noRegister = ref(false)
const confirmLogin = async () => {
  if (userName.value == "") {
    uni.showToast({
      title: '请输入账号',
      icon: 'none',
      duration: 1000
    })
    return
  }
  if (passWord.value == "") {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
      duration: 1000
    })
    return
  }
  const res = await userServer.login({ userName: userName.value, passWord: passWord.value })
  if (res.data > 0) {
    uni.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1000
    })
    let userID = res.data
    // 全局保存用户ID
    loginStore.login(userID)
    uni.switchTab({
      url: '/pages/index/index'
    })
  } else if (res.data == 0) {
    uni.showToast({
      title: '密码错误，请重新输入',
      icon: 'none',
      duration: 1000
    })
  }
  else {
    uni.showToast({
      title: '此账号未注册',
      icon: 'none',
      duration: 1000
    })
  }
}

const registerUser = async () => {
  if (!noRegister) return
  const res = await userServer.register({ userName: userName.value, passWord: passWord.value })
  if (res.statusCode == 200) {
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1000
    })
    let userID = res.data
    // 全局保存用户ID
    loginStore.login(userID)
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
  else {
    uni.showToast({
      title: '该账号已注册，请直接登录',
      icon: 'none',
      duration: 1000
    })
  }
},
  ifRegister = async (name: string) => {
    if (name == '') {
      return
    }
    const res = userServer.isRegister({ userName: name })
    if ((await res).data == -1) {
      noRegister.value = true
    }
    else {
      noRegister.value = false
    }
  }

onMounted(() => {
})

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .top {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 300rpx;
    background-color: #aed0ee;
    color: pink;
  }

  .table {
    width: 100%;
    padding: 10rpx 40rpx;

    ::v-deep input {
      width: 100%;
      height: 100rpx;
      border-bottom: 1px solid rgb(201, 201, 201);
    }

    .info-warn {
      display: flex;
      width: 1005;
      padding: 10rpx 0;
      background-color: #fef5ec;
      line-height: 35rpx;
      font-size: 26rpx;
      color: red;

      .u-icon {
        margin-right: 10rpx;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 0 40rpx;

    button {
      width: 100%;
      background: rgba(174, 208, 238, 0.5);
      margin-top: 20rpx;
      border-radius: 6rem;

      &::after {
        border: none;
      }
    }
  }
}
</style>
