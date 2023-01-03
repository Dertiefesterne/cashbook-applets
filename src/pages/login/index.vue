<template>
  <view class="content">
    <view class="top">
      <h3>登录页</h3>
      <view class="title">登录用户ID{{ loginStore.userID }}</view>
    </view>
    <view class="table">
      <view class="table-input">账号<input type="number" maxlength="15" v-model="acount" /></view>
      <view class="table-input">密码<input maxlength="15" v-model="passWord" /></view>
    </view>
    <view class="login">
      <button @click="confirmLogin">登录</button>
      <button @click="registerUser">注册</button>
    </view>
  </view>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { login, register } from '@/api/TestApi'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()

const acount = ref(),
  passWord = ref('')
const confirmLogin = async () => {
  if (acount.value && passWord.value != '') {
    const res = await login({ id: acount.value, passWord: passWord.value })
    if (res.data == 1) {
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      })
      let userID = acount.value
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
  else {
    uni.showToast({
      title: '请输入账号/密码',
      icon: 'none',
      duration: 1000
    })
  }
}

const registerUser = async () => {
  const res = await register({ id: acount.value, passWord: passWord.value })
  if (res.data == 1) {
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1000
    })
    let userID = acount.value
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
}

onMounted(() => {

})

</script>
  
<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .top {
    display: flex;
    justify-content: center;

    .title {
      font-size: 36rpx;
      color: rgb(255, 91, 119);
    }
  }

  .table {
    width: 80%;

    input {
      width: 60%;
      border: 1px solid gray;
    }

    .table-input {
      display: flex;
      justify-content: center;
      margin: 10rpx 0;
    }
  }
}
</style>
  