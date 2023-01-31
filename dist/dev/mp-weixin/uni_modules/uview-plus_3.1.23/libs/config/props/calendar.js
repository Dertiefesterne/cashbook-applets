"use strict";
const Calendar = {
  calendar: {
    title: "\u65E5\u671F\u9009\u62E9",
    showTitle: true,
    showSubtitle: true,
    mode: "single",
    startText: "\u5F00\u59CB",
    endText: "\u7ED3\u675F",
    customList: () => [],
    color: "#3c9cff",
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER,
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: "\u786E\u5B9A",
    confirmDisabledText: "\u786E\u5B9A",
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER,
    rangePrompt: "",
    showRangePrompt: true,
    allowSameDay: false,
    round: 0,
    monthNum: 3
  }
};
exports.Calendar = Calendar;
