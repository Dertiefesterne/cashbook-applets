"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_3_1_23_components_uDatetimePicker_props = require("./props.js");
const uni_modules_uviewPlus_3_1_23_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_3_1_23_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props.js");
require("../../libs/config/config.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
function times(n, iteratee) {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
const _sfc_main = {
  name: "datetime-picker",
  mixins: [uni_modules_uviewPlus_3_1_23_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_3_1_23_libs_mixin_mixin.mixin, uni_modules_uviewPlus_3_1_23_components_uDatetimePicker_props.props],
  data() {
    return {
      columns: [],
      innerDefaultIndex: [],
      innerFormatter: (type, value) => value
    };
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue) {
        this.updateColumnValue(this.innerValue);
      }
    },
    propsChange() {
      this.init();
    }
  },
  computed: {
    propsChange() {
      return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter];
    }
  },
  mounted() {
    this.init();
  },
  emits: ["close", "cancel", "confirm", "change"],
  methods: {
    init() {
      this.innerValue = this.correctValue(this.modelValue);
      this.updateColumnValue(this.innerValue);
    },
    setFormatter(e) {
      this.innerFormatter = e;
    },
    close() {
      if (this.closeOnClickOverlay) {
        this.$emit("close");
      }
    },
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm", {
        value: this.innerValue,
        mode: this.mode
      });
      this.$emit("update:modelValue", this.innerValue);
    },
    intercept(e, type) {
      let judge = e.match(/\d+/g);
      if (judge.length > 1) {
        common_vendor.index.$u.error("\u8BF7\u52FF\u5728\u8FC7\u6EE4\u6216\u683C\u5F0F\u5316\u51FD\u6570\u65F6\u6DFB\u52A0\u6570\u5B57");
        return 0;
      } else if (type && judge[0].length == 4) {
        return judge[0];
      } else if (judge[0].length > 2) {
        common_vendor.index.$u.error("\u8BF7\u52FF\u5728\u8FC7\u6EE4\u6216\u683C\u5F0F\u5316\u51FD\u6570\u65F6\u6DFB\u52A0\u6570\u5B57");
        return 0;
      } else {
        return judge[0];
      }
    },
    change(e) {
      const { indexs, values } = e;
      let selectValue = "";
      if (this.mode === "time") {
        selectValue = `${this.intercept(values[0][indexs[0]])}:${this.intercept(values[1][indexs[1]])}`;
      } else {
        const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
        const month = parseInt(this.intercept(values[1][indexs[1]]));
        let date = parseInt(values[2] ? this.intercept(values[2][indexs[2]]) : 1);
        let hour = 0, minute = 0;
        const maxDate = common_vendor.dayjs(`${year}-${month}`).daysInMonth();
        if (this.mode === "year-month") {
          date = 1;
        }
        date = Math.min(maxDate, date);
        if (this.mode === "datetime") {
          hour = parseInt(this.intercept(values[3][indexs[3]]));
          minute = parseInt(this.intercept(values[4][indexs[4]]));
        }
        selectValue = Number(new Date(year, month - 1, date, hour, minute));
      }
      selectValue = this.correctValue(selectValue);
      this.innerValue = selectValue;
      this.updateColumnValue(selectValue);
      this.$emit("change", {
        value: selectValue,
        mode: this.mode
      });
    },
    updateColumnValue(value) {
      this.innerValue = value;
      this.updateColumns();
      this.updateIndexs(value);
    },
    updateIndexs(value) {
      let values = [];
      const formatter = this.formatter || this.innerFormatter;
      const padZero = common_vendor.index.$u.padZero;
      if (this.mode === "time") {
        const timeArr = value.split(":");
        values = [formatter("hour", timeArr[0]), formatter("minute", timeArr[1])];
      } else {
        values = [
          formatter("year", `${common_vendor.dayjs(value).year()}`),
          formatter("month", padZero(common_vendor.dayjs(value).month() + 1))
        ];
        if (this.mode === "date") {
          values.push(formatter("day", padZero(common_vendor.dayjs(value).date())));
        }
        if (this.mode === "datetime") {
          values.push(formatter("day", padZero(common_vendor.dayjs(value).date())), formatter("hour", padZero(common_vendor.dayjs(value).hour())), formatter("minute", padZero(common_vendor.dayjs(value).minute())));
        }
      }
      const indexs = this.columns.map((column, index) => {
        return Math.max(0, column.findIndex((item) => item === values[index]));
      });
      this.innerDefaultIndex = indexs;
    },
    updateColumns() {
      const formatter = this.formatter || this.innerFormatter;
      const results = this.getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)));
      this.columns = results;
    },
    getOriginColumns() {
      const results = this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, (index) => {
          let value = range[0] + index;
          value = type === "year" ? `${value}` : common_vendor.index.$u.padZero(value);
          return value;
        });
        if (this.filter) {
          values = this.filter(type, values);
        }
        return { type, values };
      });
      return results;
    },
    generateArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    correctValue(value) {
      const isDateMode = this.mode !== "time";
      if (isDateMode && !common_vendor.index.$u.test.date(value)) {
        value = this.minDate;
      } else if (!isDateMode && !value) {
        value = `${common_vendor.index.$u.padZero(this.minHour)}:${common_vendor.index.$u.padZero(this.minMinute)}`;
      }
      if (!isDateMode) {
        if (String(value).indexOf(":") === -1)
          return common_vendor.index.$u.error("\u65F6\u95F4\u9519\u8BEF\uFF0C\u8BF7\u4F20\u9012\u598212:24\u7684\u683C\u5F0F");
        let [hour, minute] = value.split(":");
        hour = common_vendor.index.$u.padZero(common_vendor.index.$u.range(this.minHour, this.maxHour, Number(hour)));
        minute = common_vendor.index.$u.padZero(common_vendor.index.$u.range(this.minMinute, this.maxMinute, Number(minute)));
        return `${hour}:${minute}`;
      } else {
        value = common_vendor.dayjs(value).isBefore(common_vendor.dayjs(this.minDate)) ? this.minDate : value;
        value = common_vendor.dayjs(value).isAfter(common_vendor.dayjs(this.maxDate)) ? this.maxDate : value;
        return value;
      }
    },
    getRanges() {
      if (this.mode === "time") {
        return [
          {
            type: "hour",
            range: [this.minHour, this.maxHour]
          },
          {
            type: "minute",
            range: [this.minMinute, this.maxMinute]
          }
        ];
      }
      const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary("max", this.innerValue);
      const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary("min", this.innerValue);
      const result = [
        {
          type: "year",
          range: [minYear, maxYear]
        },
        {
          type: "month",
          range: [minMonth, maxMonth]
        },
        {
          type: "day",
          range: [minDate, maxDate]
        },
        {
          type: "hour",
          range: [minHour, maxHour]
        },
        {
          type: "minute",
          range: [minMinute, maxMinute]
        }
      ];
      if (this.mode === "date")
        result.splice(3, 2);
      if (this.mode === "year-month")
        result.splice(2, 3);
      return result;
    },
    getBoundary(type, innerValue) {
      const value = new Date(innerValue);
      const boundary = new Date(this[`${type}Date`]);
      const year = common_vendor.dayjs(boundary).year();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = common_vendor.dayjs(value).daysInMonth();
        hour = 23;
        minute = 59;
      }
      if (common_vendor.dayjs(value).year() === year) {
        month = common_vendor.dayjs(boundary).month() + 1;
        if (common_vendor.dayjs(value).month() + 1 === month) {
          date = common_vendor.dayjs(boundary).date();
          if (common_vendor.dayjs(value).date() === date) {
            hour = common_vendor.dayjs(boundary).hour();
            if (common_vendor.dayjs(value).hour() === hour) {
              minute = common_vendor.dayjs(boundary).minute();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    }
  }
};
if (!Array) {
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  _easycom_u_picker2();
}
const _easycom_u_picker = () => "../u-picker/u-picker.js";
if (!Math) {
  _easycom_u_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("picker", "0ed97923-0"),
    b: common_vendor.o($options.close),
    c: common_vendor.o($options.cancel),
    d: common_vendor.o($options.confirm),
    e: common_vendor.o($options.change),
    f: common_vendor.p({
      show: _ctx.show,
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      columns: $data.columns,
      title: _ctx.title,
      itemHeight: _ctx.itemHeight,
      showToolbar: _ctx.showToolbar,
      visibleItemCount: _ctx.visibleItemCount,
      defaultIndex: $data.innerDefaultIndex,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0ed97923"], ["__file", "D:/uni-css/src/uni_modules/uview-plus_3.1.23/components/u-datetime-picker/u-datetime-picker.vue"]]);
wx.createComponent(Component);
