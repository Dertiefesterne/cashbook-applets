<template>
  <view class="big-container">
    <view class="head">
      <p>记账</p>
      <p @click="change">{{ isEdit ? '取消' : '批量管理' }}</p>
    </view>
    <view class="content">
      <billSum :isEdit="isEdit" :sumData="moneySum"></billSum>
      <view class="btn-box">
        <button class="addBtn" hover-class='none' @click="toAddBill">增加一条新记账</button>
      </view>
      <view v-for="(item, index) in billList">
        <billDate :day-date="item.items" :groupIndex="index" v-if="item.items.length" :is-edit="isEdit"
          @delete-bill="delBill">
        </billDate>
      </view>
    </view>
    <view class="add-bill">
      <billAnalyse @add-bill="ifRefresh" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
// 引入 
import {
  onReachBottom,
  onShow,
  onLoad
} from '@dcloudio/uni-app';
import userServer from '@/api/userApi'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import { Bill, groupBill, listObject } from '@/entity/bill'
import formattereTools from '@/utils/dataUtils'
import billSum from './component/billSum.vue'
import billDate from './component/billDate.vue'
import billAnalyse from './component/billAnalyse.vue';
const loginStore = useloginStore()


/** 分页传参对象 */
interface PageParams {
  pageCurrent: number // 当前分页
  pageSize: number // 分页大小
  notMore: boolean // 是否不再加载更多
  userID: number
}

/** 分页传参对象 */
interface sumParams {
  daySum: number // 日支出
  monthSum: number // 月支出
  yearSum: number // 年支出
}

// 账单列表----嵌套数组
const list = ref<[Bill[]]>([[]]),
  // 分页列表
  groupList = ref<groupBill[]>([]),
  allData = ref<Bill[]>([]),
  page = ref<PageParams>({
    pageCurrent: 0,
    pageSize: 10,
    notMore: false,
    userID: loginStore.userID
  }),
  moneySum = ref<sumParams>({
    daySum: 0,
    monthSum: 0,
    yearSum: 0
  }),
  billList = ref<listObject[]>([]),
  dataLoading = ref(false)




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
}, allChoose = (e: Array<number>) => {
  choseeBill.value.push(...e)
  console.log('all', choseeBill.value)
}

/*请求测试*/
const toAddBill = () => {
  if (billList.value.length) {
    console.log('跳转参数', allData.value[0])
    uni.navigateTo({
      url: `/pages/addBill/index?lastTime=${billList.value[0].timestamp}`
    })
  }
  else {
    uni.navigateTo({
      url: '/pages/addBill/index'
    })
  }
},
  ifRefresh = (e: any) => {
    console.log(e, typeof e)
    refreshData(e)
  },
  refreshData = (timestamp: number) => {
    // 检查是否需要重新刷新页面
    if (billList.value.length == 0 || formattereTools.dateFormatterDispose(billList.value[0].timestamp, timestamp)) {
      console.log("重新刷新首页数据")
      // 当前添加的账单距离当前时间(更准确的是距离最新的一条账单的时间)没有超过7天，需要重新刷新首页数据（新增加的账单可能会出现在首页）
      // 重置数据列表
      list.value = [[]]
      billList.value = []
      // 重置页面参数
      page.value.pageCurrent = 0
      page.value.notMore = false
      // GetBillByGroup()
      GetBillSum()
      GetBillByPage()
      // 
      // uni.pageScrollTo({
      //   scrollTop: 0,
      //   duration: 300
      // });
    }
  },
  GetBillByPage = async () => {
    const res = await billServer.getBillPage(page.value)
    res.data.forEach((e: Bill) => {
      if (billList.value.length == 0 || billList.value[billList.value.length - 1]?.date != e.time.slice(5, 10)) {
        let temp: listObject = {
          date: e.time.slice(5, 10),
          timestamp: e.timestamp,
          items: []
        }
        temp.items.push(e)
        billList.value.push(temp)
      }
      else {
        billList.value[billList.value.length - 1].items.push(e)
      }
    })
    console.log('树结构----', billList.value)
    // let index = 0
    // for (let i = 0; i < groupList.value.length; i++) {
    //   let arr = []
    //   arr = res.data.slice(index, index + groupList.value[i].count)
    //   index = index + groupList.value[i].count
    //   if (list.value[0].length == 0) {
    //     list.value[0] = arr
    //   }
    //   else
    //     list.value.push(arr)
    // }
  },
  GetBillByGroup = async () => {
    const res = await billServer.getBillGroup(page.value)
    groupList.value = res.data;
    console.log('groupList.value:', groupList.value)
  },
  GetBillSum = async () => {
    const res = billServer.getBillSum({ userID: loginStore.userID })
    moneySum.value = (await res).data
    console.log('获取账单总数', moneySum.value)
  },
  delBill = () => {
    console.log('删除了账单---')
    GetBillSum()
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
}

/** 获取分页 */
async function getNextList() {
  uni.showLoading({ title: '加载中' })
  ++page.value.pageCurrent!
  // 新分页的分组结果
  // const res_group = await billServer.getBillGroup(page.value)
  // 新分页的账单数据
  const res_data = await billServer.getBillPage(page.value)
  // 没有更多数据了
  if (res_data.data && res_data.data.length == 0) {
    page.value.notMore = true
    uni.showToast({ title: '没有更多了', icon: 'none', duration: 800, mask: true })
  } else {
    res_data.data.forEach((e: Bill) => {
      if (billList.value.length == 0 || billList.value[billList.value.length - 1]?.date != e.time.slice(5, 10)) {
        let temp: listObject = {
          date: e.time.slice(5, 10),
          timestamp: e.timestamp,
          items: []
        }
        temp.items.push(e)
        billList.value.push(temp)
      }
      else {
        billList.value[billList.value.length - 1].items.push(e)
      }
    })
    // 新分页的分组结果中第一组和上一页最后一组是属于同一个组的
    // if (groupList.value[groupList.value.length - 1].date == res_group.data[0].date) {
    //   // 总分组结果处理------将相同组的结果合在一起=（更新总分组结果的最后一组的相关数据）
    //   groupList.value[groupList.value.length - 1].sums += res_group.data[0].sums
    //   groupList.value[groupList.value.length - 1].count += res_group.data[0].count
    //   // 总账单数据处理------将相同组的结果合在同一组（及上个分组结果的最后一组加入新数据）
    //   for (let i = 0; i < res_group.data[0].count; i++) { list.value[list.value.length - 1].push(res_data.data[i]) }
    //   // 除去与上一页相同一组的信息,剩下的分组信息和分组数据
    //   let leftGroupList = res_group.data.slice(1)
    //   let leftDataList = res_data.data.slice(res_group.data[0].count)
    //   // 将新的分组信息连接上总的分组信息
    //   for (let i = 0; i < leftGroupList.length; i++) { groupList.value.push(leftGroupList[i]) }
    //   // 将新的分组数据连接上总的分组数据
    //   grouping(leftGroupList, leftDataList)
    // } else {
    //   for (let i = 0; i < res_group.data.length; i++) { groupList.value.push(res_group.data[i]) }
    //   grouping(res_group.data, res_data.data)
    // }
  }
  uni.hideLoading()
}

onMounted(() => {
  if (loginStore.info.bill_count) {
    // GetBillByGroup()
    GetBillSum()
    GetBillByPage()
  }
})


</script>

<style lang="less" scoped>
.big-container {
  position: relative;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100rpx;
    padding: 0 40rpx;
    position: fixed;
    top: 0;
    background: #dfdfe1;
    z-index: 2;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-top: 100rpx;
    width: 100%;

    button::after {
      border: none;
    }

    .btn-box {
      width: 100%;
      padding: 0 40rpx;
      margin-bottom: 40rpx;

      .addBtn {
        background: #bcd4e7;
      }
    }
  }

  .add-bill {
    position: fixed;
    right: 100rpx;
    bottom: 200rpx;
    width: 100rpx;
    height: 100rpx;
    background-color: #bcd4e7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
