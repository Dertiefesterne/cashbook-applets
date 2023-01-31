"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "sectorChart",
  setup(__props) {
    const chartData2 = {
      categories: ["1\u73ED", "2\u73ED", "3\u73ED", "4\u73ED", "5\u73ED"],
      series: [
        {
          name: "\u652F\u51FA",
          data: [{ "name": "\u4E00\u73ED", "value": 50 }, { "name": "\u4E8C\u73ED", "value": 30 }, { "name": "\u4E09\u73ED", "value": 20 }, { "name": "\u56DB\u73ED", "value": 18 }, { "name": "\u4E94\u73ED", "value": 8 }]
        }
      ]
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "pie",
          chartData: chartData2
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-594b6faa"], ["__file", "D:/uni-css/src/pages/statistics/component/sectorChart.vue"]]);
wx.createComponent(Component);
