<template>
    <view class="container">
        <headTop> <template v-slot:title>
                个人信息
            </template></headTop>
        <view class="content">
            <view class="menu-item">头像<image style="width: 80rpx; height: 80rpx; border-radius: 50%;"
                    src="@/style/iconPng/img1.jpg" mode="aspectFill" @click="previewImg(src)"></image>
            </view>
            <view class="menu-item">ID <view class="icon">{{ loginStore.userID }}<u-icon name="arrow-right"
                        @click="copyBtn"></u-icon>
                </view>
            </view>
            <view class="menu-item" @click="toEditName">昵称
                <view class="icon">{{ name }}<u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="menu-item" @click="toEditCode">修改密码 <u-icon name="arrow-right"></u-icon></view>
            <view class="menu-item" @click="toEditCode">注册时间 <span>{{ datefilters.dateFormattimes(timestamp, 'full')
            }}</span>
            </view>
        </view>
        <view class="cancellation" @click="loginOut">退出登录</view>
        <view class="cancellation" @click="cancellationAcount">注销账号</view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import headTop from '@/components/headTop.vue';
import userInfoServer from '@/api/userInfoApi';
import userServer from '@/api/userApi';
import datefilters from '@/utils/dataUtils';
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const timestamp = loginStore.info.register_timestamp
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
}, toEditCode = () => {
    uni.navigateTo({
        url: '/pages/editInfo/editCode'
    })
}, loginOut = () => {
    uni.showModal({
        title: '提示',
        content: '是否确认退出登录',
        success: function (res) {
            if (res.confirm) {
                loginStore.logout()
                uni.navigateTo({
                    url: '/pages/login/index'
                })
            } else if (res.cancel) {
                return
            }
        }
    });
}, cancellationAcount = () => {
    //注销账号
    uni.showModal({
        title: '提示',
        content: '是否确认注销该账号(所有数据将会清空)',
        success: async function (res) {
            if (res.confirm) {
                const res = await userServer.cancellation({ userID: loginStore.userID })
                loginStore.logout()
                uni.navigateTo({
                    url: '/pages/login/index'
                })
                if (res.data == "注销成功") {
                    uni.showToast({
                        title: '注销成功',
                        icon: 'success',
                        duration: 1000
                    })
                }
            } else if (res.cancel) {
                return
            }
        }
    });
}, copyBtn = () => {
    uni.setClipboardData({
        data: '需要复制的内容',
        success: function () {
            uni.showToast({
                title: '复制成功',
            });
        },
        fail: function () {
            uni.showToast({
                title: '复制失败',
            });
        }
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

    .cancellation {
        margin: 0 auto;
        margin-top: 40rpx;
        width: 75%;
        line-height: 90rpx;
        text-align: center;
        height: 90rpx;
        background: rgba(174, 208, 238, 0.5);
        border-radius: 6rem;
        font-weight: bold;
        font-size: 30rpx;
    }

}
</style>