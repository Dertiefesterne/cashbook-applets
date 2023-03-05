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
      <view v-for="(item, index) in list">
        <billDate :day-date="item" :groupIndex="index" v-if="item.length" :is-edit="isEdit" @delete-bill="delBill">
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
import { Bill, groupBill } from '@/entity/bill'
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
    daySum: 0,// 当前分页
    monthSum: 0,// 分页大小
    yearSum: 0 // 是否不再加载更多
  })

onLoad((option) => {
  // if (option)
  // // billID.value = option.billID
  // {
  //   console.log('获取删除参数', option.billID, option.date)
  //   // 获取账单详情
  //   // if (option.billID)
  //   // deleteBill(option.billID, option.date)
  // }
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
}, allChoose = (e: Array<number>) => {
  choseeBill.value.push(...e)
  console.log('all', choseeBill.value)
}

/*请求测试*/
const segement = async () => {
  let text = segementText.value
  segementText.value = ''
  const res = await userServer.getSegement({ analyzeText: text, userID: 1 })
  console.log('res:', res)
},
  goLogin = () => {
    console.log('去登录页la')
    uni.navigateTo({
      url: '/pages/login/index'
    })
  },
  testAddBill = async () => {
    var date = new Date()
    var dd = formattereTools.dateFormattere(date, "full")
    var time = new Date().getTime() + ''
    var money: number = 12;
    const res = await billServer.addBill({ userID: 1, billType: -1, datetime: dd, time: time, money: 42.8, matter: "过年饼干", classify: 1, notes: "无" })
    refreshData(new Date().getTime())
  },
  toAddBill = () => {
    if (allData.value.length) {
      console.log('跳转参数', allData.value[0])
      uni.navigateTo({
        url: `/pages/addBill/index?lastTime=${allData.value[0].timestamp}`
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
    if (allData.value.length == 0 || formattereTools.dateFormatterDispose(allData.value[0].timestamp, timestamp)) {
      console.log("重新刷新首页数据")
      // 当前添加的账单距离当前时间(更准确的是距离最新的一条账单的时间)没有超过7天，需要重新刷新首页数据（新增加的账单可能会出现在首页）
      // 重置数据列表
      list.value = [[]]
      // 重置页面参数
      page.value.pageCurrent = 0
      page.value.notMore = false
      // 重新获取新的分组信息
      GetBillByGroup()
      // 重新获得新的账单总数信息
      GetBillSum()
      // 
      // uni.pageScrollTo({
      //   scrollTop: 0,
      //   duration: 300
      // });
    }
  },
  GetBillByPage = async () => {
    const res = await billServer.getBillPage(page.value)
    allData.value = res.data
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
    const res = await billServer.getBillGroup(page.value)
    groupList.value = res.data;
    console.log('groupList.value:', groupList.value)
    GetBillByPage()
  }, deleteBill = (id: number, date: string) => {
    for (let i = 0; i < list.value.length; i++) {
      if (formattereTools.dateFormatString(list.value[i][0].time) == date) {
        console.log('删除前的组', list.value[i])
        list.value[i].filter(item => item.bill_id != id)
        console.log('删除后的组', list.value[i])
        break
      }
    }
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
  console.log("加上后dataList", list.value)
}

/** 获取分页 */
async function getNextList() {
  uni.showLoading({ title: '加载中' })
  ++page.value.pageCurrent!
  // 新分页的分组结果
  const res_group = await billServer.getBillGroup(page.value)
  // 新分页的账单数据
  const res_data = await billServer.getBillPage(page.value)
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
  if (loginStore.info.bill_count) {
    GetBillByGroup()
    GetBillSum()
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
