<template>
  <view>
    <view class="head flex justify-between items-center w-full h-100rpx px-40rpx fixed top-0 bg-#fff z-2">
      <p>记账</p>
      <p @click="change">{{ isEdit? '取消': '批量管理' }}</p>
    </view>
    <view class="content pt-100rpx w-full">
      <billSum :isEdit="isEdit"></billSum>
      <billDay :isEdit="isEdit" @chooseValue="allChoose" :day-date="list"></billDay>
      <!-- <test></test> -->
    </view>
    <button @click="testAddBill">增加账单</button>
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
import { ref, onMounted, nextTick } from 'vue'
// 引入 
import {
  onReachBottom,
  onShow,
} from '@dcloudio/uni-app';
import { getSegement } from '@/api/TestApi'
import { addBill, deleteBill, updateBill, getBillList, getBillPage, getBillCondition, getBillTime } from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import { Bill } from '@/entity/bill'
import formattereTools from '@/utils/dataUtils'
import billSum from './component/billSum.vue'
import billDay from './component/billDay.vue'
const loginStore = useloginStore()


/** 分页传参对象 */
interface PageParams {
  pageCurrent: number // 当前分页
  pageSize: number // 分页大小
  notMore: boolean // 是否不再加载更多
  userID: number
}

// 
const list = ref<Bill[]>([]),
  page = ref<PageParams>({
    pageCurrent: 0,
    pageSize: 10,
    notMore: false,
    userID: loginStore.userID
  })

/** 页面触底 */
onReachBottom(() => {
  nextTick(() => {
    console.log('触底了', page.value)
    if (page.value.notMore) return uni.showToast({ title: '没有更多了', icon: 'none', duration: 800, mask: true })
    getNextList()
  })
})



const segementText = ref(''),
  isEdit = ref(false),
  choseeBill = ref<number[]>([])


const change = () => {
  isEdit.value = !isEdit.value;
  console.log('hhh', isEdit.value)
}, allChoose = (e: Array<number>) => {
  choseeBill.value.push(...e)
  console.log('all', choseeBill.value)
}


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
    const res = await addBill({ userID: 1, billType: -1, datetime: dd, time: time, money: money, matter: "烦死了!!", classify: 0, notes: "无" })
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
  GetBillByPage = async () => {
    console.log('分页查找', page.value)
    const res = await getBillPage(page.value)
    list.value = res.data;
    console.log('list.value:', list.value)
  },
  testGetBillTime = async () => {
    var date = new Date()
    var dd = formattereTools.dateFormattere(date, "full")
    var hh: string = "2023-01-09 00:00:00"
    var hh1: string = "2023-01-09 23:59:59"
    const res = await getBillTime({ userID: 1, beginDate: hh, endDate: hh1 })
    console.log('res:', res)
  }

/** 获取分页 */
async function getNextList() {
  uni.showLoading({ title: '加载中' })
  ++page.value.pageCurrent!
  console.log('触底请求', page.value)
  const res = await getBillPage(page.value)
  if (res.data && res.data.length == 0) {
    page.value.notMore = true
    uni.showToast({ title: '没有更多了', icon: 'none', duration: 800, mask: true })
  } else {
    list.value = list.value.concat(res.data)
  }
  console.log('list.value:', list.value)
  uni.hideLoading()
}

onMounted(() => {
  // console.log("homestorage", uni.getStorageSync("USER_INFORMATION"))
  GetBillByPage()
})


</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;

  .head {}
}
</style>
