<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "./uni_modules/vk-uview-ui/index.scss";
@import "@/uni_modules/uview-plus_3.1.23/index.scss";
// @import './style/iconfont/iconfont.css';
</style>
