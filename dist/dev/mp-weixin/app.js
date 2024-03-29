"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const piniaStore_index = require("./pinia-store/index.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
const uni_modules_uviewPlus_3_1_23_index = require("./uni_modules/uview-plus_3.1.23/index.js");
require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/vk-uview-ui/libs/request/index.js");
require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/vk-uview-ui/libs/function/deepClone.js");
require("./uni_modules/vk-uview-ui/libs/function/test.js");
require("./uni_modules/vk-uview-ui/libs/function/queryParams.js");
require("./uni_modules/vk-uview-ui/libs/function/route.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/vk-uview-ui/libs/function/guid.js");
require("./uni_modules/vk-uview-ui/libs/function/color.js");
require("./uni_modules/vk-uview-ui/libs/function/type2icon.js");
require("./uni_modules/vk-uview-ui/libs/function/randomArray.js");
require("./uni_modules/vk-uview-ui/libs/function/addUnit.js");
require("./uni_modules/vk-uview-ui/libs/function/random.js");
require("./uni_modules/vk-uview-ui/libs/function/trim.js");
require("./uni_modules/vk-uview-ui/libs/function/toast.js");
require("./uni_modules/vk-uview-ui/libs/function/getParent.js");
require("./uni_modules/vk-uview-ui/libs/function/_parent.js");
require("./uni_modules/vk-uview-ui/libs/function/sys.js");
require("./uni_modules/vk-uview-ui/libs/function/debounce.js");
require("./uni_modules/vk-uview-ui/libs/function/throttle.js");
require("./uni_modules/vk-uview-ui/libs/config/config.js");
require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
require("./uni_modules/uview-plus_3.1.23/libs/mixin/mixin.js");
require("./uni_modules/uview-plus_3.1.23/libs/mixin/mpMixin.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/Request.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/dispatchRequest.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/adapters/index.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/helpers/buildURL.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/utils.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/buildFullPath.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/helpers/isAbsoluteURL.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/helpers/combineURLs.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/settle.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/InterceptorManager.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/mergeConfig.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/core/defaults.js");
require("./uni_modules/uview-plus_3.1.23/libs/luch-request/utils/clone.js");
require("./uni_modules/uview-plus_3.1.23/libs/util/route.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/colorGradient.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/test.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/debounce.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/throttle.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/index.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/digit.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/config.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/actionSheet.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/album.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/alert.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/avatar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/avatarGroup.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/backtop.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/badge.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/button.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/calendar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/carKeyboard.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/cell.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/cellGroup.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/checkbox.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/checkboxGroup.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/circleProgress.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/code.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/codeInput.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/col.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/collapse.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/collapseItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/columnNotice.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/countDown.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/countTo.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/datetimePicker.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/divider.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/empty.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/form.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/formItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/gap.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/grid.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/gridItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/icon.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/image.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/indexAnchor.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/indexList.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/input.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/keyboard.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/line.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/lineProgress.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/link.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/list.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/listItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/loadingIcon.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/loadingPage.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/loadmore.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/modal.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/navbar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/color.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/noNetwork.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/noticeBar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/notify.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/numberBox.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/numberKeyboard.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/overlay.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/parse.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/picker.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/popup.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/radio.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/radioGroup.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/rate.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/readMore.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/row.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/rowNotice.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/scrollList.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/search.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/section.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/skeleton.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/slider.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/statusBar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/steps.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/stepsItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/sticky.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/subsection.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/swipeAction.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/swipeActionItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/swiper.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/swipterIndicator.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/switch.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/tabbar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/tabbarItem.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/tabs.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/tag.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/text.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/textarea.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/toast.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/toolbar.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/tooltip.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/transition.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/props/upload.js");
require("./uni_modules/uview-plus_3.1.23/libs/config/zIndex.js");
require("./uni_modules/uview-plus_3.1.23/libs/function/platform.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/index/index.js";
  "./pages/statistics/index.js";
  "./pages/my/index.js";
  "./pages/billDetial/index.js";
  "./pages/addBill/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni-css/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(piniaStore_index.store);
  app.use(uni_modules_vkUviewUi_index.uView);
  app.use(uni_modules_uviewPlus_3_1_23_index.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
