<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">用户IDhhhh{{ loginStore.userID }}</text>
      <view @tap="goLogin" v-if="loginStore.userID == -1">去登录</view>
      <view class="input-box">
        <input v-model="segementText" /><button @click="segement">添加账单</button>
        <button @click="testAddBill">增加账单</button>
        <button @click="testDeleteBill">删除账单</button>
        <button @click="testUpdateBill">修改账单</button>
        <button @click="testGetBill">查找账单</button>
        <button @click="testGetBillCondition">条件查找</button>
        <button @click="testGetBillPage">分页查找</button>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSegement } from '@/api/TestApi'
import { addBill, deleteBill, updateBill, getBillList, getBillPage, getBillCondition } from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import formattereTools from '@/utils/dataUtils'
const loginStore = useloginStore()

const segementText = ref('')

/*请求测试*/
const segement = async () => {
  let text = segementText.value
  segementText.value = ''
  const res = await getSegement({ analyzeText: text, userID: 1 })
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
  },
  testAddBill = async () => {
    var date = new Date()
    var dd = formattereTools.dateFormattere(date, "full")
    var time = new Date().getTime() + ''
    var money: number = 12;
    const res = await addBill({ userID: 1, datetime: dd, time: time, money: money, matter: "烦死了", notes: "备注1" })
    console.log('res:', res)
  },
  testDeleteBill = async () => {
    const res = await deleteBill({ userID: 1, billID: 2 })
    console.log('res:', res)
  },
  testUpdateBill = async () => {
    var date = new Date()
    var dd = formattereTools.dateFormattere(date, "full")
    var time = new Date().getTime() + ''
    var money: number = 12;
    const res = await updateBill({ userID: 1, billID: 4, matter: "哈哈哈", notes: "备注备注" })
    console.log('res:', res)
  },
  testGetBill = async () => {
    const res = await getBillList({ userID: 1 })
    console.log('res:', res)
  },
  testGetBillCondition = async () => {
    var date = new Date()
    var dd = formattereTools.dateFormattere(date, "full")
    const res = await getBillCondition({ userID: 1, money: 12, matter: "烦死了", notes: "备注1" })
    console.log('res:', res)
  },
  testGetBillPage = async () => {
    const res = await getBillPage({ userID: 1, pageCurrent: 2, pageSize: 2 })
    console.log('res:', res)
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
