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
  __name: "LineChart",
  setup(__props) {
    const chartData2 = {
      categories: ["12/1", "12/2", "12/3", "12/4", "12/5", "12/6", "12/7", "12/8", "12/9", "12/10", "12/11", "12/12", "12/13", "12/14", "12/15", "12/16", "12/17", "12/18", "12/19", "12/20", "12/21", "12/22", "12/23", "12/24", "12/25", "12/26", "12/27", "12/28", "12/29", "12/30", "12/31"],
      series: [
        {
          name: "\u652F\u51FA",
          data: [45, 67, 10, 89, 23, 76, 123, 56, 38, 95, 26, 72, 33, 75, 12, 44, 56, 86, 13, 465, 90, 53, 23, 65, 88, 346, 65, 134, 76, 12, 98]
        }
      ]
    }, opts2 = {
      dataLabel: false
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "line",
          width: "5",
          chartData: chartData2,
          opts: opts2
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b021aa9f"], ["__file", "D:/uni-css/src/pages/statistics/component/LineChart.vue"]]);
wx.createComponent(Component);
