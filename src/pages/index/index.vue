<template>
  <view>
    <view class="flex justify-between items-center w-full h-100rpx px-40rpx fixed top-0 bg-#dfdfe1 z-2">
      <p>记账</p>
      <p @click="change">{{ isEdit? '取消': '批量管理' }}</p>
    </view>
    <view class="content pt-100rpx w-full">
      <billSum :isEdit="isEdit"></billSum>
      <view v-for="item in list">
        <billDate :day-date="item" v-if="item.length"></billDate>
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


/** 分页传参对象 */
interface PageParams {
  pageCurrent: number // 当前分页
  pageSize: number // 分页大小
  notMore: boolean // 是否不再加载更多
  userID: number
}

// 账单列表----嵌套数组
const list = ref<[Bill[]]>([[]]),
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
    const res = await addBill({ userID: 1, billType: -1, datetime: dd, time: time, money: 42.8, matter: "过年饼干", classify: 1, notes: "无" })
    refreshData(new Date().getTime())
  },
  refreshData = (timestamp: number) => {
    // 检查是否需要重新刷新页面
    // uni.pageScrollTo({
    //   scrollTop: 0
    // });
    if (formattereTools.dateFormatterDispose(timestamp)) {
      console.log("重新刷新首页数据")
      // 当前添加的账单距离当前时间没有超过7天，需要重新刷新首页数据（新增加的账单可能会出现在首页）
      // 重置数据列表
      list.value = [[]]
      // 重置页面参数
      page.value.pageCurrent = 0
      page.value.notMore = false
      // 重新获取新的分组信息
      GetBillByGroup()
      // 
      // uni.pageScrollTo({
      //   scrollTop: 0,
      //   duration: 300
      // });
    }
  },
  GetBillByPage = async () => {
    const res = await getBillPage(page.value)
    let index = 0
    for (let i = 0; i < groupList.value.length; i++) {
      let arr = []
      arr = res.data.slice(index, index + groupList.value[i].count)
      index = index + groupList.value[i].count
      if (list.value[0].length == 0) {
        list.value[0] = arr
      }
      else
        list.value.push(arr)
    }
  },
  GetBillByGroup = async () => {
    const res = await getBillGroup(page.value)
    groupList.value = res.data;
    console.log('groupList.value:', groupList.value)
    GetBillByPage()
  }
/**根据新的分组，将账单列表分组插入大数组中 */
function grouping(group: Array<groupBill>, data: Array<Bill>) {
  let index = 0
  for (let i = 0; i < group.length; i++) {
    let arr = []
    arr = data.slice(index, index + group[i].count)
    index = index + group[i].count
    list.value.push(arr)
  }
  console.log("加上后dataList", list.value)
}

/** 获取分页 */
async function getNextList() {
  uni.showLoading({ title: '加载中' })
  ++page.value.pageCurrent!
  // 新分页的分组结果
  const res_group = await getBillGroup(page.value)
  // 新分页的账单数据
  const res_data = await getBillPage(page.value)
  console.log("触底请求结果", res_group.data, res_data.data)
  // 没有更多数据了
  if (res_group.data && res_group.data.length == 0) {
    page.value.notMore = true
    uni.showToast({ title: '没有更多了', icon: 'none', duration: 800, mask: true })
  } else {
    // 新分页的分组结果中第一组和上一页最后一组是属于同一个组的
    if (groupList.value[groupList.value.length - 1].date == res_group.data[0].date) {
      // 总分组结果处理------将相同组的结果合在一起=（更新总分组结果的最后一组的相关数据）
      groupList.value[groupList.value.length - 1].sums += res_group.data[0].sums
      groupList.value[groupList.value.length - 1].count += res_group.data[0].count
      // 总账单数据处理------将相同组的结果合在同一组（及上个分组结果的最后一组加入新数据）
      for (let i = 0; i < res_group.data[0].count; i++) { list.value[list.value.length - 1].push(res_data.data[i]) }
      // 除去与上一页相同一组的信息,剩下的分组信息和分组数据
      let leftGroupList = res_group.data.slice(1)
      let leftDataList = res_data.data.slice(res_group.data[0].count)
      console.log("除去相同的", leftGroupList, leftDataList)
      // 将新的分组信息连接上总的分组信息
      for (let i = 0; i < leftGroupList.length; i++) { groupList.value.push(leftGroupList[i]) }
      // 将新的分组数据连接上总的分组数据
      grouping(leftGroupList, leftDataList)
    } else {
      for (let i = 0; i < res_group.data.length; i++) { groupList.value.push(res_group.data[i]) }
      grouping(res_group.data, res_data.data)
      // list.value.push(res_data.data)
    }
  }
  uni.hideLoading()
}

onMounted(() => {
  console.log("初始化", list.value)
  // console.log("homestorage", uni.getStorageSync("USER_INFORMATION"))
  GetBillByGroup()
})


</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>
