<template>
  <view>
    <view class="head flex justify-between items-center w-full h-100rpx px-40rpx fixed top-0 bg-#fff z-2">
      <p>记账</p>
      <p>批量管理</p>
    </view>
    <view class="content pt-100rpx w-full">
      <billSum></billSum>
      <billDay></billDay>
    </view>

    <!-- <view class="text-area">
      <text class="title mt-10">用户IDhhhh{{ loginStore.userID }}</text>
      <view @tap="goLogin" v-if="loginStore.userID == -1">去登录</view>
      <view class="input-box">
        <input v-model="segementText" /><button @click="segement">添加账单</button>
        <button @click="testAddBill">增加账单</button>
        <button @click="testDeleteBill">删除账单</button>
        <button @click="testUpdateBill">修改账单</button>
        <button @click="testGetBill">查找账单</button>
        <button @click="testGetBillCondition">条件查找</button>
        <button @click="testGetBillPage">分页查找</button>
        <u-button @click="testGetBillTime">时间查找</u-button>
        <button @click="testGetBillCondition" class="w-50px">条件查找</button>
        <u-icon name="photo"></u-icon>
      </view>
    </view> -->
  </view>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSegement } from '@/api/TestApi'
import { addBill, deleteBill, updateBill, getBillList, getBillPage, getBillCondition, getBillTime } from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import formattereTools from '@/utils/dataUtils'
import billSum from './component/billSum.vue'
import billDay from './component/billDay.vue'
const loginStore = useloginStore()

const segementText = ref('')

/*请求测试*/
const segement = async () => {
  let text = segementText.value
  segementText.value = ''
  const res = await getSegement({ analyzeText: text, userID: 1 })
  console.log('res:', res)
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
    const res = await addBill({ userID: 1, billType: -1, datetime: dd, time: time, money: money, matter: "烦死了", classify: 0, notes: "备注1" })
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
  },
  testGetBillTime = async () => {
    var date = new Date()
    var dd = formattereTools.dateFormattere(date, "full")
    var hh: string = "2023-01-09 00:00:00"
    var hh1: string = "2023-01-09 23:59:59"
    const res = await getBillTime({ userID: 1, beginDate: hh, endDate: hh1 })
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

  .head {}
}
</style>
