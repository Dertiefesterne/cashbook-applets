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
  __name: "histogramChart",
  setup(__props) {
    const chartData = {
      categories: ["7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
      series: [
        {
          name: "\u652F\u51FA",
          data: [5036, 4831, 3933, 4513, 4934, 6782]
        }
      ]
    }, chartData1 = {
      categories: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708"],
      series: [
        {
          name: "\u652F\u51FA",
          data: [13835, 5036, 4831, 3933, 4513, 4934]
        }
      ]
    }, chartData2 = {
      categories: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
      series: [
        {
          name: "\u652F\u51FA",
          data: [3835, 2036, 6831, 5133, 7213, 8134, 13835, 5036, 4831, 3933, 4513, 4934]
        }
      ]
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "column",
          width: "5",
          chartData: chartData1
        }),
        b: common_vendor.p({
          type: "column",
          width: "5",
          chartData
        }),
        c: common_vendor.p({
          type: "column",
          width: "5",
          chartData: chartData2
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb3fa553"], ["__file", "D:/uni-css/src/pages/statistics/component/histogramChart.vue"]]);
wx.createComponent(Component);
