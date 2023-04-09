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
    document.getElementsByTagName('body')[0].style.setProperty('--warmBg', cutcheack ? '#fef5ec' : '#fef5ec')
    document.getElementsByTagName('body')[0].style.setProperty('--warnColor', cutcheack ? '#FF0000' : '#FF0000')
    document.getElementsByTagName('body')[0].style.setProperty('--buttonBg', cutcheack ? 'rgba(174, 208, 238, 0.5)' : '#454340')
    document.getElementsByTagName('body')[0].style.setProperty('--buttonBg2', cutcheack ? 'rgba(174, 208, 238, 0.5)' : '#80b8f8')
    document.getElementsByTagName('body')[0].style.setProperty('--cancelButtonBg', cutcheack ? 'rgba(221, 222, 224, 0.5)' : 'rgba(221, 222, 224, 0.5)')

    document.getElementsByTagName('body')[0].style.setProperty('--headBg', cutcheack ? '#dfdfe1' : '#1d1d1d')
    document.getElementsByTagName('body')[0].style.setProperty('--addBtnBg', cutcheack ? '#bcd4e7' : '#343434')
    document.getElementsByTagName('body')[0].style.setProperty('--addBtnColor', cutcheack ? '#2979ff' : '#2979ff')
    document.getElementsByTagName('body')[0].style.setProperty('--modelBg', cutcheack ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)')

    document.getElementsByTagName('body')[0].style.setProperty('--pickerContent', cutcheack ? '#fff' : '#101010')

    document.getElementsByTagName('body')[0].style.setProperty('--billBg', cutcheack ? '#f6f7f8' : '#343434')
    document.getElementsByTagName('body')[0].style.setProperty('--billSumBg', cutcheack ? '#d0e2fa' : '#f3e4b9')
    document.getElementsByTagName('body')[0].style.setProperty('--billSumBg2', cutcheack ? 'rgba(208,226,250,0.4)' : 'rgba(243,228,185,0.7)')
    document.getElementsByTagName('body')[0].style.setProperty('--billSumColor', cutcheack ? '#2979ff' : '#f3e4b9')
    document.getElementsByTagName('body')[0].style.setProperty('--maskBg', cutcheack ? 'rgba(255, 255, 255, 0.4)' : '#999')

    document.getElementsByTagName('body')[0].style.setProperty('--textLightColor', cutcheack ? '#999999' : '#999')
    document.getElementsByTagName('body')[0].style.setProperty('--lightColor', cutcheack ? '#c0c4cc' : '#7e7f80')

    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradBg', cutcheack ? '#f8f8fa' : '#282828')
    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradHead', cutcheack ? '#d0e2fa' : '#1d1d1d')
    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradBtn', cutcheack ? '#fff' : '#585858')
    document.getElementsByTagName('body')[0].style.setProperty('--keyBoradShadow', cutcheack ? '#dfdfe1' : '#000')

    document.getElementsByTagName('body')[0].style.setProperty('--imageShadow', cutcheack ? 'rgba(101, 101, 101, 0.4)' : 'rgba(125, 125, 125, 0.4)')
    document.getElementsByTagName('body')[0].style.setProperty('--textColor', cutcheack ? '#282828' : '#d2d2d2')
    document.getElementsByTagName('body')[0].style.setProperty('--textSecondColor', cutcheack ? '#282828' : '#fefefe')
    document.getElementsByTagName('body')[0].style.setProperty('--textThirdColor', cutcheack ? '#282828' : '#eeeeee')
    document.getElementsByTagName('body')[0].style.setProperty('--textFourthColor', cutcheack ? '#282828' : '#b6b6b6')


    document.getElementsByTagName('body')[0].style.setProperty('--menuItem', cutcheack ? '#f8f8fa' : '#181818')

}
export default cut
