<template>
    <view class="big-contaniner">
        柱状图
        <scroll-view class="uni-swiper-tab" scroll-x style="height:500rpx">
            <view class="scrollx_items">
                <qiun-data-charts type="column" width="5" :chartData="chartData1" />
            </view>
            <view class="scrollx_items">
                <qiun-data-charts type="column" width="5" :chartData="chartData" />
            </view>
        </scroll-view>
        <view class="scrollx_items">
            <qiun-data-charts type="column" width="5" :chartData="chartData2" />
        </view>
    </view>
</template>


<script setup lang="ts">
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