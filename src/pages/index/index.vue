<template>
  <view>
    <view class="head flex justify-between items-center w-full h-100rpx px-40rpx fixed top-0 bg-#fff z-2">
      <p>记账</p>
      <p @click="change">{{ isEdit? '取消': '批量管理' }}</p>
    </view>
    <view class="content pt-100rpx w-full">
      <billSum :isEdit="isEdit"></billSum>
      <view v-for="item in list">
        <billDate :day-date="item"></billDate>
      </view>
      <!-- <billDay :isEdit="isEdit" @chooseValue="allChoose" :day-date="list"></billDay> -->
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
import { addBill, deleteBill, updateBill, getBillList, getBillPage, getBillGroup, getBillCondition, getBillTime } from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import { Bill, groupBill } from '@/entity/bill'
import formattereTools from '@/utils/dataUtils'
import billSum from './component/billSum.vue'
import billDay from './component/billDay.vue'
import billDate from './component/billDate.vue'
const loginStore = useloginStore()


const testList = [[
  { bill_id: 1, matter: "哈哈" },
  { bill_id: 2, matter: "哈哈" },
  { bill_id: 3, matter: "哈哈" }
],
[{ bill_id: 4, matter: "哈哈" },
{ bill_id: 5, matter: "哈哈" }],
[{ bill_id: 6, matter: "哈哈" },
{ bill_id: 7, matter: "哈哈" },
{ bill_id: 8, matter: "哈哈" },
{ bill_id: 9, matter: "哈哈" }]]


/** 分页传参对象 */
interface PageParams {
  pageCurrent: number // 当前分页
  pageSize: number // 分页大小
  notMore: boolean // 是否不再加载更多
  userID: number
}

// 账单列表
const list = ref<Bill[]>([]),
  // 分页列表
  groupList = ref<groupBill[]>([]),
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
  GetBillByPage = async () => {
    const res = await getBillPage(page.value)
    console.log('分页查找', res.data)
    let index = 0
    for (let i = 0; i < groupList.value.length; i++) {
      let arr = []
      console.log(index, index + groupList.value[i].count)
      arr = res.data.slice(index, index + groupList.value[i].count)
      index = index + groupList.value[i].count
      console.log("分组后", arr)
      list.value.push(arr)
    }
    console.log('list.value:', list.value)
  },
  GetBillByGroup = async () => {
    console.log('账单分组', page.value)
    const res = await getBillGroup(page.value)
    groupList.value = res.data;
    console.log('groupList.value:', groupList.value)
    GetBillByPage()
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

    // list.value = list.value.concat(res.data)
  }
  // console.log('list.value:', list.value)
  uni.hideLoading()
}

onMounted(() => {
  // console.log("homestorage", uni.getStorageSync("USER_INFORMATION"))
  GetBillByGroup()
})


</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;

  .head {}
}
</style>
