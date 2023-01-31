"use strict";
const common_vendor = require("../../../common/vendor.js");
const piniaStore_login = require("../../../pinia-store/login.js");
const utils_dataUtils = require("../../../utils/dataUtils.js");
const utils_filters = require("../../../utils/filters.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "billDate",
  props: {
    msg2: String,
    msg: {
      type: String,
      default: ""
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    dayDate: {
      type: Array,
      default: () => []
    }
  },
  emits: ["chooseValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    piniaStore_login.useloginStore();
    const dataListSum = common_vendor.computed$1(() => {
      return props.dayDate.reduce((sum, e) => sum + Number(e.money || 0), 0).toFixed(2);
    });
    common_vendor.ref([]);
    common_vendor.ref("");
    const toBillDetial = (billID) => {
      common_vendor.index.navigateTo({
        url: `/pages/billDetial/index?billID=${billID}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(utils_dataUtils.formattereTools).dateFormatString(__props.dayDate[0].time)),
        b: common_vendor.t(common_vendor.unref(dataListSum)),
        c: common_vendor.f(__props.dayDate, (item, k0, i0) => {
          return {
            a: common_vendor.n(common_vendor.unref(utils_filters.filters).billTypeIcon(item.classify)),
            b: common_vendor.s(common_vendor.unref(utils_filters.filters).billTypeColor(item.classify)),
            c: common_vendor.t(item.matter),
            d: common_vendor.t(common_vendor.unref(utils_filters.filters).billTypeFilter(item.classify)),
            e: common_vendor.t(common_vendor.unref(utils_dataUtils.formattereTools).dateFormatString(item.time, "time")),
            f: common_vendor.t(item.money),
            g: common_vendor.o(($event) => toBillDetial(item.bill_id))
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c5a12818"], ["__file", "D:/uni-css/src/pages/index/component/billDate.vue"]]);
wx.createComponent(Component);
