"use strict";
const filters = {
  billTypeFilter(index) {
    switch (index) {
      case 1:
        return "\u9910\u996E";
      case 2:
        return "\u8D2D\u7269";
      case 3:
        return "\u4F4F\u623F";
      case 4:
        return "\u4EA4\u901A";
      case 5:
        return "\u5A31\u4E50";
      case 6:
        return "\u6559\u80B2";
      case 7:
        return "\u533B\u7597";
      default:
        return "\u6D88\u8D39";
    }
  },
  billTypeIcon(index) {
    switch (index) {
      case 1:
        return "icon-canyin text-#fce681";
      case 2:
        return "icon-gouwu";
      case 3:
        return "icon-zhuyezhufang";
      case 4:
        return "icon-jiaotong";
      case 5:
        return "icon-yule";
      case 6:
        return "icon-jiaoyu";
      case 7:
        return "icon-yiliao";
      default:
        return "icon-xianxing-15";
    }
  },
  billTypeColor(index) {
    switch (index) {
      case 1:
        return "background:#fce681;";
      case 2:
        return "background:#f5cffe";
      case 3:
        return "background:#d8d6fe";
      case 4:
        return "background:#8bfaca";
      case 5:
        return "background:#fbd5b8";
      case 6:
        return "background:#99fbf2";
      case 7:
        return "background:#e2f4a8";
      default:
        return "background:#abecfe";
    }
  }
};
exports.filters = filters;
