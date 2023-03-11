<script setup lang="ts">
import { useloginStore } from '@/pinia-store/login'
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
const loginStore = useloginStore()
onLaunch(() => {
  console.log("App Launch", uni.getStorageSync('userID'), loginStore.userID, uni.getStorageSync('info'), loginStore.info,);
  if (uni.getStorageSync('userID')) {
    // 全局保存用户ID
    loginStore.login(uni.getStorageSync('userID'))
  }
  if (uni.getStorageSync('info')) {
    // 全局保存用户ID
    loginStore.setInfo(uni.getStorageSync('info'))
  }
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
@import "@/uni_modules/vk-uview-ui/index.scss";
@import "@/uni_modules/uview-plus_3.1.23/index.scss";
// @import './style/iconfont/iconfont.css';
</style>
