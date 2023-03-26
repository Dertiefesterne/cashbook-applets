<template>
    <view class="big-contaniner">
        <view class="month-picker" @click="show = true">
            {{ chooseValue }}月
            <u-icon :name="show ? 'arrow-down' : 'arrow-right'"></u-icon>
        </view>
        <u-picker :show="show" :columns="rangeData" closeOnClickOverlay @close="show = false"
            @confirm="chooseMonth"></u-picker>
        <!-- <scroll-view class="uni-swiper-tab" scroll-x style="height:500rpx">
            <view class="scrollx_items">
                <qiun-data-charts type="line" width="5" :chartData="chartData1" />
            </view>
            <view class="scrollx_items">
                <qiun-data-charts type="line" width="5" :chartData="chartData" />
            </view>
        </scroll-view> -->
        <view class="scrollx_items">
            <qiun-data-charts type="line" :background="theme" width="5" :chartData="myData" :opts="opts2" />
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { chart, interSeries, chooseEven } from '@/entity/chart'
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()

const theme = loginStore.theme == 'light' ? '#fff' : '#101010'



const emit = defineEmits(['update:modelValue', 'changeMonthGroup']),
    props = defineProps({
        rangeData: {
            type: Array<Array<String>>,
            default: [[0]]
        },
        myData: {
        }
    })

const show = ref(false),
    chooseValue = ref<String>()

const opts2 = {
    dataLabel: false, // 是否显示图表区域内数据点上方的数据文案
    "xAxis": {
        "disabled": true,  //是否启用 不绘制X轴
    },
}, opts = {
    color: ["#1890FF"],
    padding: [15, 25, 10, 10],
    rotate: false, //横屏模式
    animation: true, // 是否动画展示图表
    dataLabel: false, // 是否显示图表区域内数据点上方的数据文案
    dataPointShape: true, //是否显示数据点的图形标识
    dataPointShapeType: 'hollow', //图形标识点显示类型，可选值：'solid'实心,'hollow'空心
    legend: {
        show: false
    },
    xAxis: {
        disabled: false, // 不绘制X轴 默认false
        disableGrid: true, // 不绘制纵向网格
        axisLineColor: '#0f5681', // 坐标轴轴线颜色
        calibration: false, // 坐标轴刻度线
        fontColor: '#FFFFFF', // 字体颜色
        fontSize: 13, // 字体大小
        rotateLabel: false, //【旋转】数据点（刻度点）文字
        rotateAngle: 45, //开启上面旋转功能后，文字旋转的角度，取值范围(-90至90)
        // labelCount: ,//数据点文字（刻度点）单屏幕限制显示的数量
        scrollShow: false, // 是否显示滚动条，配合拖拽滚动使用（即仅在启用【基本配置】的 enableScroll 时有效）
        boundaryGap: 'justify', //折线图、区域图起画点结束点方法，可选值：'center'两端留空,'justify'两端对齐
    },
    yAxis: {
        disabled: false, //不绘制Y轴
        disableGrid: false,//不绘制横向向网格(即默认绘制网格)
        gridType: "dash", // 横向向网格线型，可选值：'solid'实线,'dash'虚线
        dashLength: 8, //横向网格为虚线时，单段虚线长度
        gridColor: '#0f5681',
        showTitle: true,
        data: [ // 多Y轴配置
            {
                axisLineColor: '#0f5681', // 坐标轴轴线颜色，默认#CCCCCC
                calibration: false, // 刻度线是否显示
                fontColor: '#FFFFFF', // 数据点（刻度点）字体颜色，默认#666666
                fontSize: 13, // 数据点（刻度点）字体大小
                textAlign: 'right', //数据点（刻度点）相对轴线的对齐方式，可选值：'left','right','center'
                title: 'PUE值', // 当前Y轴标题（需要上面showTitle设置为true）
                titleFontSize: 13, // 标题字体大小
                titleOffsetY: -2, // 标题纵向偏移距离，负数为向上偏移，正数向下偏移
                titleOffsetX: 0, // 标题横向偏移距离，负数为向左偏移，正数向右偏移
                titleFontColor: '#FFFFFF', //标题字体颜色，默认#666666
                unit: '', //Y轴刻度值后附加单位
            }
        ]
    },
    extra: {
        area: {
            type: "straight", // 区域图类型，可选值："straight"尖角折线模式,"curve"曲线圆滑模式,"step"时序图模式
            opacity: 0.1, // 	区域图透明度
            addLine: true, // 是否叠加相应的折线
            width: 2, // 叠加的折线宽度
            gradient: true, // 是否开启区域图渐变色
            activeType: "hollow" // 激活指示点类型，可选值："none"不启用激活指示点,"hollow"空心点模式,"solid"实心点模式
        }
    }
}

const chooseMonth = (e: chooseEven) => {
    show.value = false
    chooseValue.value = e.value[0] + ''
    console.log('改变月份', chooseValue.value)
    emit('changeMonthGroup', e.value[0] + '')
}
watch(
    props.rangeData,
    (newProps) => {
        if (newProps.length) {
            // console.log('新增值月度范围数据', newProps)
            chooseValue.value = newProps[0][0]
        }
    },
    // 强制立即执行回调
    { deep: true, immediate: true }
);
onMounted(() => {
})
</script>

<style lang="less" scoped>
.big-contaniner {
    .month-picker {
        padding: 10rpx 20rpx 0;
        display: flex;
        float: right;
    }

    .charts-box {
        // width: 100%;
        height: 500rpx;
    }

    .uni-swiper-tab {
        white-space: nowrap;
    }

    .scrollx_items {
        text-align: center;
        display: inline-block;
        width: 100%;
        height: 500rpx;
    }
}
</style>