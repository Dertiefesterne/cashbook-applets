/*
 * @Author: 1378279152@qq.com
 * @Date: 2022-08-06 17:25:53
 * @LastEditors: 1378279152@qq.com
 * @LastEditTime: 2022-08-20 16:52:49
 * @FilePath: \src\utils\publicStyle.js
 * @Description:
 *
 * Copyright (c) 2022 by Guangzhou Qidian Technology Co., Ltd, All Rights Reserved.
 */
//  主题切换
const cut = (cutcheack: Boolean) => {
    document.getElementsByTagName('body')[0].style.setProperty('--primaryColor', cutcheack ? '#aed0ee' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--borderColor', cutcheack ? '#C9C9C9' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--weightBorderColor', cutcheack ? '#3A3A3A' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--warmBg', cutcheack ? '#fef5ec' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--warnColor', cutcheack ? '#FF0000' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--buttonBg', cutcheack ? 'rgba(174, 208, 238, 0.5)' : '#454340')
    document.getElementsByTagName('body')[0].style.setProperty('--cancelButtonBg', cutcheack ? 'rgba(221, 222, 224, 0.5)' : 'rgba(221, 222, 224, 0.5)')

    document.getElementsByTagName('body')[0].style.setProperty('--headBg', cutcheack ? '#dfdfe1' : '#1d1d1d')
    document.getElementsByTagName('body')[0].style.setProperty('--addBtnBg', cutcheack ? '#bcd4e7' : '#343434')
    document.getElementsByTagName('body')[0].style.setProperty('--addBtnColor', cutcheack ? '#2979ff' : '#2979ff')
    document.getElementsByTagName('body')[0].style.setProperty('--modelBg', cutcheack ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)')

    document.getElementsByTagName('body')[0].style.setProperty('--pickerContent', cutcheack ? '#fff' : '#101010')

    document.getElementsByTagName('body')[0].style.setProperty('--billBg', cutcheack ? '#f6f7f8' : '#343434')
    document.getElementsByTagName('body')[0].style.setProperty('--billSumBg', cutcheack ? '#d0e2fa' : '#f3e4b9')
    document.getElementsByTagName('body')[0].style.setProperty('--maskBg', cutcheack ? 'rgba(255, 255, 255, 0.4)' : '#999')

    document.getElementsByTagName('body')[0].style.setProperty('--textLightColor', cutcheack ? '#999999' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--lightColor', cutcheack ? '#c0c4cc' : '#fff')

    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradBg', cutcheack ? '#f8f8fa' : '#282828')
    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradHead', cutcheack ? '#d0e2fa' : '#1d1d1d')
    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradBtn', cutcheack ? '#fff' : '#585858')
    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradShadow', cutcheack ? '#dfdfe1' : '#000')

    document.getElementsByTagName('body')[0].style.setProperty('--imageShadow', cutcheack ? 'rgba(101, 101, 101, 0.4)' : 'rgba(125, 125, 125, 0.4)')
    document.getElementsByTagName('body')[0].style.setProperty('--textColor', cutcheack ? '#282828' : '#d2d2d2')
    document.getElementsByTagName('body')[0].style.setProperty('--textSecondColor', cutcheack ? '#282828' : '#fefefe')
    document.getElementsByTagName('body')[0].style.setProperty('--textThirdColor', cutcheack ? '#282828' : '#eeeeee')

    document.getElementsByTagName('body')[0].style.setProperty('--menuItem', cutcheack ? '#f8f8fa' : '#181818')






    document.getElementsByTagName('body')[0].style.setProperty('--leftBgcColor', cutcheack ? '#0f0f10' : '#fff')
    document.getElementsByTagName('body')[0].style.setProperty('--rightBgcColor', cutcheack ? '#070707' : '#F4F4F4')

    // 文字颜色
    document.getElementsByTagName('body')[0].style.setProperty('--textFourthColor', cutcheack ? '#fff' : '#999999')
    document.getElementsByTagName('body')[0].style.setProperty('--textFifthColor', cutcheack ? '#999999' : '#fff')
    document.getElementsByTagName('body')[0].style.setProperty('--textSixthColor', cutcheack ? '#7c7c83' : '#787878')
    document.getElementsByTagName('body')[0].style.setProperty('--textBorderColor', cutcheack ? '#1a1a1f' : '#EEEEEE')
    document.getElementsByTagName('body')[0].style.setProperty('--textHoverColor', cutcheack ? '#4D699A' : '#4D699A')

    //按钮颜色
    document.getElementsByTagName('body')[0].style.setProperty('--editButton', cutcheack ? '#23252b' : '#ED3938')
    document.getElementsByTagName('body')[0].style.setProperty('--iconBorderColor', cutcheack ? '#242429' : '#7c7c7c')
    document.getElementsByTagName('body')[0].style.setProperty('--alreadyAttentionBgc', cutcheack ? '#23252b' : '#EEEEEE ')
    document.getElementsByTagName('body')[0].style.setProperty('--alreadyAttentionBorder', cutcheack ? '#4a4a51' : '#BFBFBF')
    document.getElementsByTagName('body')[0].style.setProperty('--cancelButtonBorder', cutcheack ? '#202022' : '#DDDDDD')
    document.getElementsByTagName('body')[0].style.setProperty('--paginationBorderColor', cutcheack ? '#38373d' : '#DDDDDD')

    //表单颜色
    document.getElementsByTagName('body')[0].style.setProperty('--formBgcColor', cutcheack ? '#070707' : '#F4F4F4')
    document.getElementsByTagName('body')[0].style.setProperty('--formBorderColor', cutcheack ? '#232329' : '#DDDDDD')
    document.getElementsByTagName('body')[0].style.setProperty('--formSwitchBgc', cutcheack ? '#282828' : '#BFBFBF')
    document.getElementsByTagName('body')[0].style.setProperty('--formCollapseBgc', cutcheack ? '#0c0c0e' : '#EEEEEE')

    //弹窗颜色
    document.getElementsByTagName('body')[0].style.setProperty('--collectionDialogBgc', cutcheack ? '#151517' : '#F4F4F4 ')
    document.getElementsByTagName('body')[0].style.setProperty('--collectionDialogBorder', cutcheack ? '#1c1c21' : '#DDDDDD')
    document.getElementsByTagName('body')[0].style.setProperty('--collectionDialogInput', cutcheack ? '#2b2b31' : '#EEEEEE')
    document.getElementsByTagName('body')[0].style.setProperty('--collectionDialogButton', cutcheack ? '#2b2b31' : '#999999')

    //"上传认证"按钮颜色
    document.getElementsByTagName('body')[0].style.setProperty('--certificationLabelBgc', cutcheack ? '#23252b' : '#fff')
    document.getElementsByTagName('body')[0].style.setProperty('--certificationLabelBorder', cutcheack ? '#292930' : '#BFBFBF')

    //七点专聘部分颜色
    document.getElementsByTagName('body')[0].style.setProperty('--changeTitleBgc', cutcheack ? '#18181d' : '#fff')
    document.getElementsByTagName('body')[0].style.setProperty('--changeChoiceBgc', cutcheack ? '#131314' : '#BFBFBF')

    //头像框颜色
    document.getElementsByTagName('body')[0].style.setProperty('--avaterBgcColor', cutcheack ? 'rgba(40,40,46,0.3)' : 'rgba(221,221,221,0.3)')

    // 我的资料部分颜色
    //document.getElementsByTagName("body")[0].style.setProperty("--materialAvaterTip", cutcheack ? "#86868d" : "#282828");
}
export default cut
