import { createSSRApp } from "vue";
import pstore from './pinia-store';
import App from "./App.vue";
import uView from "@/uni_modules/vk-uview-ui";
//font-class方式引入图标，单色
import '@/style/iconfont/iconfont.css';
import uviewPlus from '@/uni_modules/uview-plus_3.1.23';
import SvgIcon from '@/components/SvgIcon.vue';
//svg方式引入图标（保留颜色）
import './assets/iconfont.js';

// import common from './utils/tool'

// // 挂载
// uni.$common = common

export function createApp() {
  const app = createSSRApp(App);
  app.use(pstore)
  app.use(uView)
  app.use(uviewPlus)
  app.component('SvgIcon', SvgIcon);
  return {
    app,
  };
}
