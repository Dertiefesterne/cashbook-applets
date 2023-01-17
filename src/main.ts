import { createSSRApp } from "vue";
import pstore from './pinia-store';
import App from "./App.vue";
import uView from "@/uni_modules/vk-uview-ui";
import 'uno.css';
import '@/style/iconfont/iconfont.css';
import uviewPlus from '@/uni_modules/uview-plus_3.1.23'

// import common from './utils/tool'

// // 挂载
// uni.$common = common

export function createApp() {
  const app = createSSRApp(App);
  app.use(pstore)
  app.use(uView)
  app.use(uviewPlus)
  return {
    app,
  };
}
