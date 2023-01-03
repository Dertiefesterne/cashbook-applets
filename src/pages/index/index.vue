<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">用户IDhhhh{{ loginStore.userID }}</text>
      <view @tap="goLogin" v-if="loginStore.userID == -1">去登录</view>
      <view class="input-box">
        <input v-model="segementText" /><button @click="segement">添加账单</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSegement } from '@/api/TestApi'
import { useloginStore } from '@/pinia-store/login'
import formattereTools from '@/utils/dataUtils'
const loginStore = useloginStore()

const segementText = ref('')
/*请求测试*/
const segement = async () => {
  let text = segementText.value
  segementText.value = ''
  const res = await getSegement({ analyzeText: text, userId: 1 })
  console.log('res:', res)
  console.log('res:', res.dateTime)
  if (res.dateTime) {
    var date = new Date(res.dateTime)
    console.log('res:d', formattereTools.dateFormattere(date))
  }
},
  goLogin = () => {
    console.log('去登录页')
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }


onMounted(() => {
  // console.log("homestorage", uni.getStorageSync("USER_INFORMATION"))
})

</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;

  .title {
    font-size: 36rpx;
    color: rgb(255, 91, 119);
  }
}

.input-box {
  input {
    border: 1px solid gray;
  }
}
</style>
