<template>
  <view class="content ">
    <view class="top">
      <view class="content">
        <view class="image-box">
          <image src="../../static/img/appIcon.png" mode="aspectFill" />
        </view>
        <p>{{ registerState ? '注册页' : '登录页' }}</p>
      </view>
    </view>
    <view class="table" v-if="!registerState">
      <view><input maxlength="15" placeholder="账号名/账号ID" v-model="userName" @input="ifRegister" />
      </view>
      <view class="info-warn" v-if="noRegister && userName.length">
        <u-icon name="info-circle" color="red"></u-icon>该账号尚未注册
      </view>
      <view><input maxlength="15" type="password" placeholder="密码" v-model="passWord" /></view>
    </view>
    <view class="table" v-else>
      <view><input maxlength="15" placeholder="账号名" v-model="userName" @input="ifRegister" />
      </view>
      <view class="info-warn" v-if="!noRegister && userName.length">
        <u-icon name="info-circle" color="red"></u-icon>该账号已被注册
      </view>
      <view><input maxlength="15" type="password" placeholder="请设置密码" v-model="passWord" /></view>
      <view><input maxlength="15" type="password" placeholder="请再次输入密码" v-model="passWord1" /></view>
      <view class="info-warn" v-if="!passWordSame">
        <u-icon name="info-circle" color="red"></u-icon>两次输入密码不一致
      </view>
    </view>
    <view class="login-btn">
      <button @click="confirmLogin" hover-class='none' :disabled="noRegister" v-if="!registerState">登录</button>
      <button @click="registerState = false" hover-class='none' v-else>去登录</button>
      <button @click="registerUser" hover-class='none'
        :disabled="(!noRegister && registerState) || (!passWordSame && registerState)">注册</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import userServer from '@/api/userApi'
import { debounce } from '@/utils/funTools'
import { useloginStore } from '@/pinia-store/login'
import cut from '@/utils/publicStyle'
const loginStore = useloginStore()

const userName = ref(''),
  passWord = ref(''),
  passWord1 = ref(''),
  noRegister = ref(false)

const registerState = ref(false)

const passWordSame = computed(() => {
  return passWord.value === passWord1.value
})


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
    let userID: number = res.data
    // 全局保存用户ID
    loginStore.login(userID)
    loginStore.setPassWord(passWord.value)
    getUserInfo(userID)
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
  if (!registerState.value) {
    registerState.value = true
    return
  }
  const res = await userServer.register({ userName: userName.value, passWord: passWord.value })
  if (res.statusCode == 200) {
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1000
    })
    let userID: number = res.data
    // 全局保存用户ID
    loginStore.login(userID)
    getUserInfo(userID)
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
  ifRegister = debounce(async () => {
    let name = userName.value.replace(/ /g, '')
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
  }, 800),

  getUserInfo = async (id: number) => {
    const res = await userServer.getInformation({ userID: id })
    console.log('登录获取用户信息--', res.data)
    loginStore.setInfo(res.data)
    uni.reLaunch({
      url: '/pages/index/index'
    })
  },
  test = () => {
    cut(true)
  },
  test2 = () => {
    cut(false)
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
    align-items: center;
    // padding-top: 300rpx;
    height: 250px;
    // background-color: #aed0ee;
    background: var(--primaryColor);

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-size: 16px;
        font-weight: bold;
        margin: 10px 0 0 0;
      }

      .image-box {
        width: 150rpx;
        height: 150rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

  }

  .table {
    width: 100%;
    padding: 10rpx 40rpx;

    ::v-deep input {
      width: 100%;
      height: 100rpx;
      border-bottom: 1px solid var(--borderColor);
    }

    .info-warn {
      display: flex;
      width: 1005;
      padding: 10rpx 0;
      background-color: var(--warmBg);
      line-height: 35rpx;
      font-size: 26rpx;
      color: var(--warnColor);

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
      background: var(--buttonBg);
      margin-top: 20rpx;
      border-radius: 6rem;

      &::after {
        border: none;
      }
    }
  }
}
</style>
