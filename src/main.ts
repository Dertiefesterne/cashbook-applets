import { createSSRApp } from "vue";
import pstore from './pinia-store';
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pstore)
  return {
    app,
  };
}
