<template>
    <view class="my-container">
        <headTop>
            <template v-slot:title>
                个人信息
            </template>
        </headTop>
        <view class="content">
            <view class="menu-item">头像<image style="width: 80rpx; height: 80rpx; border-radius: 50%;" :src="avaSrc"
                    mode="aspectFill" @click="choosePic" title="点击修改头像"></image>
            </view>
            <view class="menu-item">账号名<view class="icon">{{ loginStore.info.user_name }}
                    <svg-icon title="复制" iconName="icon-fuzhi" @click="copyBtn(loginStore.info.user_name)"></svg-icon>
                </view>
            </view>
            <view class="menu-item">账号ID <view class="icon">{{ loginStore.userID }}
                    <svg-icon title="复制" iconName="icon-fuzhi" @click="copyBtn(loginStore.userID)"></svg-icon>
                    <!-- <i class="iconfont icon-fuzhi" title="复制" @click="copyBtn(loginStore.userID)"></i> -->
                </view>
            </view>
            <view class="menu-item" @click="toEditName">昵称
                <view class="icon">{{ name }}<u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <!-- <view class="menu-item" @click="toEditCode">修改密码 <u-icon name="arrow-right"></u-icon></view> -->
            <view class="menu-item" @click="toEditCode">记账笔数 <span>{{ loginStore.info.bill_count }}笔</span>
            </view>
            <view class="menu-item" @click="toEditCode">注册时间 <span>{{ datefilters.dateFormattimes(timestamp, 'full')
            }}</span>
            </view>
        </view>
        <view>
            <view class="cancellation" @click="loginOut">退出登录</view>
            <view class="cancellation" @click="cancellationAcount">注销账号</view>
        </view>
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
import { pathToBase64, base64ToPath } from '@/uni_modules/image-tools/index.js'
const loginStore = useloginStore()
const name = ref(loginStore.info.nickname)
const timestamp = loginStore.info.register_timestamp
const avaSrc = ref('')
onMounted(() => {
    if (loginStore.avatar.length)
        avaSrc.value = loginStore.avatar
    else
        avaSrc.value = '/static/img/defaultAvatar.png'
})

const imgSrc = ref('')
//@/style/iconPng/img1.jpg

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
}, copyBtn = (data: any) => {
    uni.setClipboardData({
        data: data,
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
}, toMy = () => {
    console.log('back')
    uni.switchTab({
        url: '/pages/my/index'
    })
}
//选择照片
function choosePic() {
    uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        success: function (res) {
            const tempFilePaths = res.tempFilePaths[0];
            console.log('tempFilePaths---', res.tempFilePaths, tempFilePaths)
            // uni.uploadFile({
            //     url: BASE_API + '/userInfo/userAvatar/upload',
            //     filePath: tempFilePaths,
            //     name: 'file',
            //     header: { "Content-Type": "multipart/form-data" },
            //     success: (myres) => {
            //         var jsonObject = JSON.parse(myres.data);
            //         console.log('成功！！！')
            //     }
            // });
            //需要使用uni,getImageInfo获取图片的本地存储路径
            uni.getImageInfo({
                src: res.tempFilePaths[0],
                success: (path) => {
                    pathToBase64(path.path).then(async (base64: any) => {
                        console.log('base64--', base64); // 这就是转为base64格式的图片
                        imgSrc.value = base64
                        avaSrc.value = base64
                        loginStore.setAvatar(base64)
                        // const params = {
                        //     name: 'yy',
                        //     base64: base64
                        // }
                        // const res = await userInfoServer.uploadImg(params)
                        // console.log('res---', res.data)
                    })
                        .catch((error: any) => {
                            console.error(error)
                        })
                }
            })
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
.my-container {
    height: 100vh;
    background-color: var(--pickerContent);
    color: var(--textColor);
    padding-bottom: 100rpx;

    .content {
        padding: 120rpx 20px 20rpx;

        .menu-item {
            padding: 0 40rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10rpx;
            height: 100rpx;
            background-color: var(--menuItem);
            margin-bottom: 20rpx;

            .icon {
                display: flex;
                align-items: center;
                justify-content: center;

                .u-icon,
                i {
                    margin-left: 10rpx;
                }

                .svg-icon {
                    margin-left: 3px;
                }
            }

            &:last-child {
                margin-bottom: 0;
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
        background: var(--buttonBg);
        border-radius: 6rem;
        font-weight: bold;
        font-size: 30rpx;
    }

}
</style>