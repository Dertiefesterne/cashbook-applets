"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_dataUtils = require("../../utils/dataUtils.js");
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
    common_vendor.ref();
    common_vendor.ref();
    const chooseType = common_vendor.ref(-1), moneyDisplay = common_vendor.ref("0"), showDate = common_vendor.ref(false), showTime = common_vendor.ref(false), datetimeValue = common_vendor.ref();
    common_vendor.ref();
    common_vendor.ref();
    const billForm = common_vendor.reactive({
      bill_id: 0,
      user_id: Number(loginStore.userID),
      bill_type: -1,
      data_time: utils_dataUtils.formattereTools.dateFormattere(new Date(), "full"),
      timestamp: new Date().getTime() + "",
      money: 0,
      matter: "",
      classify: 0,
      notes: "",
      full_sentences: ""
    });
    const tags = ["\u5916\u5356", "\u6DD8\u5B9D", "\u6253\u8F66", "\u5403\u996D", "\u96F6\u98DF", "\u8D85\u5E02", "\u4E70\u83DC", "\u65C5\u6E38", "\u673A\u7968"];
    const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
    const changeChoose = (type) => {
      chooseType.value = type;
    }, changeClassify = (type) => {
      billForm.classify = type;
    }, confirmDate = (e) => {
      showDate.value = false;
      const Data = JSON.parse(JSON.stringify(e));
      let data_time = Data[0] + billForm.data_time.slice(10);
      billForm.data_time = data_time;
    }, confirmTime = (e) => {
      showTime.value = false;
      const Time = JSON.parse(JSON.stringify(e));
      let data_time = billForm.data_time.slice(0, 11) + Time.value + ":00";
      billForm.data_time = data_time;
    }, changeText = (e) => {
      let matter = e.replace(/ /g, "");
      billForm.matter = matter;
    }, changeMatter = (e) => {
      if (billForm.matter == "")
        billForm.matter = e;
      else {
        let matter = billForm.matter + e;
        billForm.matter = matter;
      }
    }, subMoney = () => {
      moneyDisplay.value = moneyDisplay.value.slice(0, moneyDisplay.value.length - 1);
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
        savaBill();
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
    }, savaBill = async () => {
      let money = Number(moneyDisplay.value);
      billForm.money = money;
      if (billForm.money == 0) {
        common_vendor.index.showToast({ title: "\u8BF7\u8F93\u5165\u8BE5\u8D26\u5355\u91D1\u989D", icon: "none" });
        return;
      }
      const params = billForm;
      console.log("\u4FDD\u5B58\u53C2\u6570", { ...params });
      const res = await api_billApi.billServer.addBill({ ...params });
      if (res.data == "\u6DFB\u52A0\u6210\u529F") {
        common_vendor.index.showToast({ title: "\u6DFB\u52A0\u6210\u529F", duration: 800 });
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: chooseType.value == -1 ? 1 : "",
        b: common_vendor.o(($event) => changeChoose(-1)),
        c: chooseType.value == 1 ? 1 : "",
        d: common_vendor.o(($event) => changeChoose(1)),
        e: common_vendor.p({
          name: "checkmark",
          size: "20"
        }),
        f: common_vendor.o(savaBill),
        g: common_vendor.t(moneyDisplay.value),
        h: common_vendor.f(8, (index, k0, i0) => {
          return {
            a: "b2f4867e-1-" + i0,
            b: common_vendor.p({
              classify: index - 1,
              choose: index - 1 == billForm.classify
            }),
            c: common_vendor.t(common_vendor.unref(utils_filters.filters).billTypeFilter(index - 1)),
            d: common_vendor.o(($event) => changeClassify(index - 1))
          };
        }),
        i: common_vendor.p({
          name: "edit-pen",
          size: "20"
        }),
        j: common_vendor.o([($event) => billForm.matter = $event.detail.value, ($event) => changeText(billForm.matter)]),
        k: billForm.matter,
        l: billForm.matter.length
      }, billForm.matter.length ? {
        m: common_vendor.t(billForm.matter.length)
      } : {}, {
        n: common_vendor.p({
          name: "clock",
          size: "20"
        }),
        o: common_vendor.t(billForm.data_time.slice(0, 10)),
        p: common_vendor.o(($event) => showDate.value = true),
        q: common_vendor.t(billForm.data_time.slice(10, 16)),
        r: common_vendor.o(($event) => showTime.value = true),
        s: common_vendor.o(confirmDate),
        t: common_vendor.o(($event) => showDate.value = false),
        v: common_vendor.p({
          show: showDate.value,
          mode: "single",
          minDate: "2022-12-17",
          maxDate: "2023-02-13",
          monthNum: "3",
          closeOnClickOverlay: true
        }),
        w: common_vendor.o(confirmTime),
        x: common_vendor.o(($event) => showTime.value = false),
        y: common_vendor.o(($event) => datetimeValue.value = $event),
        z: common_vendor.p({
          show: showTime.value,
          mode: "time",
          closeOnClickOverlay: true,
          modelValue: datetimeValue.value
        }),
        A: common_vendor.f(tags, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => changeMatter(item))
          };
        }),
        B: common_vendor.p({
          name: "more-circle",
          size: "20"
        }),
        C: common_vendor.f(buttons, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => changeMoney(item))
          };
        }),
        D: common_vendor.p({
          name: "backspace",
          size: "35"
        }),
        E: common_vendor.o(subMoney),
        F: common_vendor.o(($event) => changeMoney("+")),
        G: common_vendor.o(($event) => changeMoney("-")),
        H: common_vendor.t(inCalc()),
        I: common_vendor.o(($event) => changeMoney(inCalc()))
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2f4867e"], ["__file", "D:/uni-css/src/pages/addBill/index.vue"]]);
wx.createPage(MiniProgramPage);
