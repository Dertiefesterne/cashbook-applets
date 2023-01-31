"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_billApi = require("../../api/billApi.js");
const piniaStore_login = require("../../pinia-store/login.js");
const utils_dataUtils = require("../../utils/dataUtils.js");
if (!Math) {
  (billSum + billDate + billAnalyse)();
}
const billSum = () => "./component/billSum.js";
const billDate = () => "./component/billDate.js";
const billAnalyse = () => "./component/billAnalyse.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loginStore = piniaStore_login.useloginStore();
    const list = common_vendor.ref([[]]), groupList = common_vendor.ref([]), allData = common_vendor.ref([]), page = common_vendor.ref({
      pageCurrent: 0,
      pageSize: 10,
      notMore: false,
      userID: loginStore.userID
    }), moneySum = common_vendor.ref({
      daySum: 0,
      monthSum: 0,
      yearSum: 0
    });
    common_vendor.onLoad((option) => {
    });
    common_vendor.onReachBottom(() => {
      common_vendor.nextTick(() => {
        console.log("\u89E6\u5E95\u4E86", page.value);
        if (page.value.notMore)
          return common_vendor.index.showToast({ title: "\u6CA1\u6709\u66F4\u591A\u4E86", icon: "none", duration: 800, mask: true });
        getNextList();
      });
    });
    common_vendor.ref("");
    const isEdit = common_vendor.ref(false);
    common_vendor.ref([]);
    const change = () => {
      isEdit.value = !isEdit.value;
      console.log("hhh", isEdit.value);
    };
    const toAddBill = () => {
      common_vendor.index.navigateTo({
        url: "/pages/addBill/index"
      });
    }, ifRefresh = (e) => {
      console.log(e, typeof e);
      refreshData(e);
    }, refreshData = (timestamp) => {
      if (utils_dataUtils.formattereTools.dateFormatterDispose(allData.value[0].timestamp, timestamp)) {
        console.log("\u91CD\u65B0\u5237\u65B0\u9996\u9875\u6570\u636E");
        list.value = [[]];
        page.value.pageCurrent = 0;
        page.value.notMore = false;
        GetBillByGroup();
      }
    }, GetBillByPage = async () => {
      const res = await api_billApi.billServer.getBillPage(page.value);
      allData.value = res.data;
      let index = 0;
      for (let i = 0; i < groupList.value.length; i++) {
        let arr = [];
        arr = res.data.slice(index, index + groupList.value[i].count);
        index = index + groupList.value[i].count;
        if (list.value[0].length == 0) {
          list.value[0] = arr;
        } else
          list.value.push(arr);
      }
    }, GetBillByGroup = async () => {
      const res = await api_billApi.billServer.getBillGroup(page.value);
      groupList.value = res.data;
      console.log("groupList.value:", groupList.value);
      GetBillByPage();
    }, GetBillSum = async () => {
      const res = api_billApi.billServer.getBillSum({ userID: loginStore.userID });
      moneySum.value = (await res).data;
      console.log("\u8D26\u5355\u603B\u6570", moneySum.value);
    };
    function grouping(group, data) {
      let index = 0;
      for (let i = 0; i < group.length; i++) {
        let arr = [];
        arr = data.slice(index, index + group[i].count);
        index = index + group[i].count;
        list.value.push(arr);
      }
      console.log("\u52A0\u4E0A\u540EdataList", list.value);
    }
    async function getNextList() {
      common_vendor.index.showLoading({ title: "\u52A0\u8F7D\u4E2D" });
      ++page.value.pageCurrent;
      const res_group = await api_billApi.billServer.getBillGroup(page.value);
      const res_data = await api_billApi.billServer.getBillPage(page.value);
      console.log("\u89E6\u5E95\u8BF7\u6C42\u7ED3\u679C", res_group.data, res_data.data);
      if (res_group.data && res_group.data.length == 0) {
        page.value.notMore = true;
        common_vendor.index.showToast({ title: "\u6CA1\u6709\u66F4\u591A\u4E86", icon: "none", duration: 800, mask: true });
      } else {
        if (groupList.value[groupList.value.length - 1].date == res_group.data[0].date) {
          groupList.value[groupList.value.length - 1].sums += res_group.data[0].sums;
          groupList.value[groupList.value.length - 1].count += res_group.data[0].count;
          for (let i = 0; i < res_group.data[0].count; i++) {
            list.value[list.value.length - 1].push(res_data.data[i]);
          }
          let leftGroupList = res_group.data.slice(1);
          let leftDataList = res_data.data.slice(res_group.data[0].count);
          console.log("\u9664\u53BB\u76F8\u540C\u7684", leftGroupList, leftDataList);
          for (let i = 0; i < leftGroupList.length; i++) {
            groupList.value.push(leftGroupList[i]);
          }
          grouping(leftGroupList, leftDataList);
        } else {
          for (let i = 0; i < res_group.data.length; i++) {
            groupList.value.push(res_group.data[i]);
          }
          grouping(res_group.data, res_data.data);
        }
      }
      common_vendor.index.hideLoading();
    }
    common_vendor.onMounted(() => {
      console.log("\u521D\u59CB\u5316", list.value);
      GetBillByGroup();
      GetBillSum();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(isEdit.value ? "\u53D6\u6D88" : "\u6279\u91CF\u7BA1\u7406"),
        b: common_vendor.o(change),
        c: common_vendor.p({
          isEdit: isEdit.value,
          sumData: moneySum.value
        }),
        d: common_vendor.o(toAddBill),
        e: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.length
          }, item.length ? {
            b: "83a5a03c-1-" + i0,
            c: common_vendor.p({
              ["day-date"]: item
            })
          } : {});
        }),
        f: common_vendor.o(ifRefresh)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "D:/uni-css/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
