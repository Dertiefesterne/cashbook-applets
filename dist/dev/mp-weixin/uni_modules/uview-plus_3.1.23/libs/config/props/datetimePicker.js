"use strict";
const DatetimePicker = {
  datetimePicker: {
    show: false,
    showToolbar: true,
    value: "",
    title: "",
    mode: "datetime",
    maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: "\u53D6\u6D88",
    confirmText: "\u786E\u8BA4",
    cancelColor: "#909193",
    confirmColor: "#3c9cff",
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: () => []
  }
};
exports.DatetimePicker = DatetimePicker;
