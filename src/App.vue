<script setup lang="ts">
import { useloginStore } from '@/pinia-store/login'
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import cut from '@/utils/publicStyle'
const loginStore = useloginStore()
onLaunch(() => {

  console.log("App Launch", uni.getStorageSync('userID'), loginStore.userID, uni.getStorageSync('info'), loginStore.info,);
  if (uni.getStorageSync('theme')) {
    // 全局保存用户ID
    loginStore.setTheme(uni.getStorageSync('theme'))
    if (loginStore.theme == 'light') {
      cut(true)
      uni.setTabBarStyle({
        "color": "#bfbfbf", // tab 上的文字默认颜色
        "selectedColor": "#3376e5", // tab 上的文字选中时的颜色
        "borderStyle": "black", // tabbar 上边框的颜色，可选值 black/white
        "backgroundColor": "#ffffff", // tab 的背景色
      })
    }
    else {
      uni.setTabBarStyle({
        "color": "#cfcfcf", // tab 上的文字默认颜色
        "selectedColor": "#3376e5", // tab 上的文字选中时的颜色
        "borderStyle": "white", // tabbar 上边框的颜色，可选值 black/white
        "backgroundColor": "#1d1d1d", // tab 的背景色
      })
      cut(false)
    }
  }
  else {
    cut(true)
  }
  if (uni.getStorageSync('userID')) {
    // 全局保存用户ID
    loginStore.login(uni.getStorageSync('userID'))
  }
  if (uni.getStorageSync('info')) {
    // 全局保存用户ID
    loginStore.setInfo(uni.getStorageSync('info'))
  }
  if (uni.getStorageSync('avatar')) {
    // 全局保存用户ID
    loginStore.setAvatar(uni.getStorageSync('avatar'))
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
@import '@/assets/theme.css'
// @import './style/iconfont/iconfont.css';
</style>
