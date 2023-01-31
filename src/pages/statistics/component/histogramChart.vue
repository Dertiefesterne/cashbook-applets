<template>
    <view class="big-contaniner">
        柱状图
        <scroll-view class="uni-swiper-tab" scroll-x style="height:500rpx">
            <view class="scrollx_items">
                <qiun-data-charts type="column" width="5" :chartData="chartData1" :opts="opts" />
            </view>
            <view class="scrollx_items">
                <qiun-data-charts type="column" width="5" :chartData="chartData" :opts="opts" />
            </view>
        </scroll-view>
        <view class="scrollx_items">
            <qiun-data-charts type="column" width="5" :chartData="data1" :opts="opts2" />
        </view>
    </view>
</template>


<script setup lang="ts">



const emit = defineEmits(['update:modelValue', 'addBill']),
    props = defineProps({
        data1: {}
    })
const chartData = {
    categories: ['7月', '8月', '9月', '10月', '11月', '12月'],
    series: [
        {
            name: '支出',
            data: [5036, 4831, 3933, 4513, 4934, 6782]
        }
    ]
}, chartData1 = {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
        {
            name: '支出',
            data: [13835, 5036, 4831, 3933, 4513, 4934]
        }
    ]
}, chartData2 = {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    series: [
        {
            name: '支出',
            data: [3835, 2036, 6831, 5133, 7213, 8134, 13835, 5036, 4831, 3933, 4513, 4934]
        }
    ]
}

const opts = {
    xAxis: {
        disableGrid: true, // 不绘制纵向网格
    },
    yAxis: {
        disabled: true, //不绘制Y轴
        // disableGrid: true,//不绘制横向向网格(即默认绘制网格)
        showTitle: true
    },
},
    opts2 = {
        dataLabel: false, // 是否显示图表区域内数据点上方的数据文案
    }
</script>

<style lang="less" scoped>
.big-contaniner {

    .charts-box {
        // width: 100%;
        height: 500rpx;
    }

    .uni-swiper-tab {
        white-space: nowrap;
    }

    .scrollx_items {
        display: inline-block;
        width: 100%;
        height: 500rpx;
    }
}
</style>