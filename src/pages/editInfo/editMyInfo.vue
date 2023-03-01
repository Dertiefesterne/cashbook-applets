<template>
    <view class="container">
        <headTop> <template v-slot:title>
                个人信息
            </template></headTop>
        <view class="content">
            <view class="menu-item">我的头像<image style="width: 80rpx; height: 80rpx; border-radius: 50%;"
                    src="@/style/iconPng/img1.jpg" mode="aspectFill" @click="previewImg(src)"></image>
            </view>
            <view class="menu-item">我的账号 <view class="icon">{{ loginStore.userID }}<u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="menu-item" @click="toEditName">我的昵称 <u-icon name="arrow-right"></u-icon></view>
            <view class="menu-item">修改密码 <u-icon name="arrow-right"></u-icon></view>
            <view class="menu-item">退出登录</view>
        </view>
        <view>注销账号</view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoServer from '@/api/userInfoApi';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const src = "http://cdn.uviewui.com/uview/empty/car.png"
onMounted(() => {
    // name.value = loginStore.info.nickname
    // console.log('用户昵称', loginStore.info.nickname)
})

const modifyNickName = async () => {
    console.log('modifyNickName', name.value)
    const params = { userID: loginStore.userID, nickname: name.value }
    const res = await userInfoServer.updateInfo(params)
    if (res.statusCode == 200) {
        uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
        })
        loginStore.setInfoName(name.value)
        uni.switchTab({
            url: '/pages/my/index'
        })
    }
}, toEditName = () => {
    uni.navigateTo({
        url: '/pages/editInfo/editName'
    })
}, previewImg = (photoImg: any) => {
    let imgsArray = [];
    imgsArray[0] = photoImg;
    uni.previewImage({
        current: 0,
        urls: imgsArray
    });
}
// , multPreviewImage = (index) => {
//     let photoList = photos.value.map(item => {
//         return item.src;
//     });
//     uni.previewImage({
//         current: index,
//         urls: photoList
//     });
// }
</script>


<style lang="less" scoped>
.container {

    .content {
        padding: 120rpx 20rpx 0;
        background-color: #f8f8fa;
        height: 100%;

        .menu-item {
            padding: 0 40rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100rpx;
            background-color: #fff;
            margin-bottom: 20rpx;

            .icon {
                display: flex;

                .u-icon {
                    margin-left: 10rpx;
                }
            }
        }
    }

}
</style>