"use strict";
const common_vendor = require("../../common/vendor.js");
const api_billApi = require("../../api/billApi.js");
const utils_filters = require("../../utils/filters.js");
const piniaStore_login = require("../../pinia-store/login.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_calendar2 = common_vendor.resolveComponent("u-calendar");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  (_easycom_u_icon2 + _easycom_u_calendar2 + _easycom_u_datetime_picker2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus_3.1.23/components/u-icon/u-icon.js";
const _easycom_u_calendar = () => "../../uni_modules/uview-plus_3.1.23/components/u-calendar/u-calendar.js";
const _easycom_u_datetime_picker = () => "../../uni_modules/uview-plus_3.1.23/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_u_icon + BillTypeIconVue + _easycom_u_calendar + _easycom_u_datetime_picker)();
}
const BillTypeIconVue = () => "../../components/billTypeIcon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loginStore = piniaStore_login.useloginStore();
    const billID = common_vendor.ref(), billDetial = common_vendor.ref();
    common_vendor.ref();
    const moneyDisplay = common_vendor.ref(""), showDate = common_vendor.ref(false), showTime = common_vendor.ref(false), value1 = common_vendor.ref();
    const tags = ["\u5916\u5356", "\u6DD8\u5B9D", "\u6253\u8F66", "\u5403\u996D", "\u96F6\u98DF", "\u8D85\u5E02", "\u4E70\u83DC", "\u65C5\u6E38", "\u673A\u7968", "\u623F\u79DF"];
    const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
    common_vendor.onLoad((option) => {
      if (option)
        billID.value = option.billID;
      getBillDetail();
    });
    const getBillDetail = async () => {
      const res = await api_billApi.billServer.getBillDetial({ userID: loginStore.userID, billID: billID.value });
      console.log("\u83B7\u53D6\u83B7\u53D6\u8D26\u5355\u8BE6\u60C5", res.data);
      billDetial.value = res.data;
      moneyDisplay.value = billDetial.value.money + "";
    }, changeClassify = (type) => {
      setProp(billDetial.value, "classify", type);
    }, confirmDate = (e) => {
      showDate.value = false;
      const Data = JSON.parse(JSON.stringify(e));
      let time = Data[0] + billDetial.value.time.slice(10);
      setProp(billDetial.value, "time", time);
      console.log("11confirmDate ", time);
    }, confirmTime = (e) => {
      showTime.value = false;
      const Time = JSON.parse(JSON.stringify(e));
      let time = billDetial.value.time.slice(0, 11) + Time.value + ":00";
      setProp(billDetial.value, "time", time);
      console.log("11confirmTime", time);
    }, changeText = (e) => {
      let matter = e.replace(/ /g, "");
      setProp(billDetial.value, "matter", matter);
    }, changeMatter = (e) => {
      if (billDetial.value.matter == "")
        setProp(billDetial.value, "matter", e);
      else {
        let matter = billDetial.value.matter + e;
        setProp(billDetial.value, "matter", matter);
      }
    }, subMoney = () => {
      moneyDisplay.value = moneyDisplay.value.slice(0, moneyDisplay.value.length - 1);
      console.log(moneyDisplay.value);
    }, changeMoney = (e) => {
      if (moneyDisplay.value.length > 15) {
        common_vendor.index.showToast({ title: "\u8FD0\u7B97\u5F0F\u957F\u5EA6\u8D85\u51FA\u4E0A\u9650", icon: "none", duration: 800 });
        return;
      }
      if (e == "=") {
        let lastNum = moneyDisplay.value[moneyDisplay.value.length - 1];
        if (lastNum == "+" || lastNum == "-" || lastNum == ".") {
          moneyDisplay.value = moneyDisplay.value.slice(0, moneyDisplay.value.length - 1);
        }
        let preNum = 0;
        let afterNum = 0;
        let operator = "";
        let preIndex = 0;
        for (let i = 0; i < moneyDisplay.value.length; i++) {
          console.log(i, moneyDisplay.value[i]);
          if (moneyDisplay.value[i] == "+" || moneyDisplay.value[i] == "-") {
            if (preNum == 0) {
              preNum = Number(moneyDisplay.value.slice(0, i));
              operator = moneyDisplay.value[i];
              preIndex = i + 1;
              console.log("first-prenum", preNum);
            } else {
              console.log("\u4E2D\u95F4index", preIndex, i);
              afterNum = Number(moneyDisplay.value.slice(preIndex, i));
              console.log("\u4E2D\u95F4", afterNum);
              if (operator == "+") {
                preNum = preNum + afterNum;
              } else if (operator == "-") {
                preNum = preNum - afterNum;
              }
              operator = moneyDisplay.value[i];
              preIndex = i + 1;
            }
          }
          if (i == moneyDisplay.value.length - 1 && preNum != 0 && operator != "") {
            afterNum = Number(moneyDisplay.value.slice(preIndex));
            if (operator == "+") {
              preNum = preNum + afterNum;
            } else if (operator == "-") {
              preNum = preNum - afterNum;
            }
          }
        }
        if (Math.floor(preNum) == preNum)
          moneyDisplay.value = preNum + "";
        else
          moneyDisplay.value = preNum.toFixed(2) + "";
      } else if (e == "\u5B8C\u6210") {
        let money = Number(moneyDisplay.value);
        setProp(billDetial.value, "money", money);
        modifyBill();
      } else if (e == "+" || e == "-" || e == ".") {
        let str = moneyDisplay.value.slice(moneyDisplay.value.length - 1);
        if (str == "+" || str == "-" || str == ".")
          return;
        else
          moneyDisplay.value += e;
      } else {
        if (moneyDisplay.value == "0")
          moneyDisplay.value = e;
        else
          moneyDisplay.value += e;
      }
      if (moneyDisplay.value == "")
        moneyDisplay.value = "0";
    }, deleteBill = () => {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u5B9A\u5220\u9664\u8BE5\u8D26\u5355\u5417\uFF1F",
        success: async (res) => {
          if (res.confirm) {
            const params = {
              userID: loginStore.userID,
              billID: billDetial.value.bill_id
            };
            console.log("\u5220\u9664\u53C2\u6570", params);
            const res2 = api_billApi.billServer.deleteBill(params);
            if ((await res2).data == "\u5220\u9664\u6210\u529F") {
              common_vendor.index.showToast({ title: "\u5220\u9664\u6210\u529F", duration: 800 });
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }
          }
        }
      });
    }, modifyBill = async () => {
      console.log("\u4FEE\u6539\u540E\u7684\u8D26\u5355", billDetial.value);
      const params = { userID: Number(loginStore.userID), billID: billDetial.value.bill_id, datetime: billDetial.value.time, money: billDetial.value.money, matter: billDetial.value.matter };
      const res = api_billApi.billServer.updateBill(params);
      console.log("\u8BF7\u6C42\u7ED3\u679C", res);
      if ((await res).statusCode == 200) {
        common_vendor.index.showToast({ title: "\u4FEE\u6539\u6210\u529F", duration: 800 });
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }
    };
    function inCalc() {
      let str = moneyDisplay.value;
      let res = str.includes("+") || str.includes("-");
      if (res)
        return "=";
      else
        return "\u5B8C\u6210";
    }
    function setProp(foo, key, val) {
      foo[key] = val;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: billDetial.value
      }, billDetial.value ? {
        b: common_vendor.p({
          name: "trash",
          size: "20"
        }),
        c: common_vendor.o(deleteBill),
        d: common_vendor.t(moneyDisplay.value),
        e: common_vendor.f(8, (index, k0, i0) => {
          return {
            a: "7d412683-1-" + i0,
            b: common_vendor.p({
              classify: index - 1,
              choose: index - 1 == billDetial.value.classify
            }),
            c: common_vendor.t(common_vendor.unref(utils_filters.filters).billTypeFilter(index - 1)),
            d: common_vendor.o(($event) => changeClassify(index - 1))
          };
        }),
        f: common_vendor.p({
          name: "edit-pen",
          size: "20"
        }),
        g: common_vendor.o([($event) => billDetial.value.matter = $event.detail.value, ($event) => changeText(billDetial.value.matter)]),
        h: billDetial.value.matter,
        i: common_vendor.p({
          name: "clock",
          size: "20"
        }),
        j: common_vendor.t(billDetial.value.time.slice(0, 10)),
        k: common_vendor.o(($event) => showDate.value = true),
        l: common_vendor.t(billDetial.value.time.slice(10, 16)),
        m: common_vendor.o(($event) => showTime.value = true),
        n: common_vendor.o(confirmDate),
        o: common_vendor.o(($event) => showDate.value = false),
        p: common_vendor.p({
          show: showDate.value,
          mode: "single",
          minDate: "2022-12-17",
          maxDate: "2023-02-13",
          monthNum: "3",
          closeOnClickOverlay: true
        }),
        q: common_vendor.o(confirmTime),
        r: common_vendor.o(($event) => showTime.value = false),
        s: common_vendor.o(($event) => value1.value = $event),
        t: common_vendor.p({
          show: showTime.value,
          mode: "time",
          closeOnClickOverlay: true,
          modelValue: value1.value
        }),
        v: common_vendor.f(tags, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => changeMatter(item))
          };
        }),
        w: common_vendor.p({
          name: "more-circle",
          size: "20"
        }),
        x: common_vendor.f(buttons, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => changeMoney(item))
          };
        }),
        y: common_vendor.p({
          name: "backspace",
          size: "35"
        }),
        z: common_vendor.o(subMoney),
        A: common_vendor.o(($event) => changeMoney("+")),
        B: common_vendor.o(($event) => changeMoney("-")),
        C: common_vendor.t(inCalc()),
        D: common_vendor.o(($event) => changeMoney(inCalc()))
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7d412683"], ["__file", "D:/uni-css/src/pages/billDetial/index.vue"]]);
wx.createPage(MiniProgramPage);
