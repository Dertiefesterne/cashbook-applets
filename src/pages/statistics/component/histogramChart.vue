<template>
    <view class="big-contaniner">
        <view class="year-picker" @click="show = true">
            {{ chooseValue }}年度
            <u-icon :name="show ? 'arrow-down' : 'arrow-right'"></u-icon>
        </view>
        <u-picker :show="show" :columns="rangeData" closeOnClickOverlay @close="show = false"
            @confirm="chooseYear"></u-picker>
        <!-- <scroll-view class="uni-swiper-tab" scroll-x style="height:500rpx">
            <view class="scrollx_items">
                <qiun-data-charts type="column" width="5" :chartData="chartData1" :opts="opts" />
            </view>
            <view class="scrollx_items">
                <qiun-data-charts type="column" width="5" :chartData="chartData" :opts="opts" />
            </view>
        </scroll-view> -->
        <view class="scrollx_items">
            <qiun-data-charts type="column" width="5" :chartData="data1" :opts="opts2" />
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { chooseEven } from '@/entity/chart'


const emit = defineEmits(['update:modelValue', 'changeYearGroup']),
    props = defineProps({
        rangeData: {
            type: Array<Array<String>>,
            default: [[0]]
        },
        defaultValue: {
            type: String,
            default: ''
        },
        data1: {}
    })

const show = ref(false),
    chooseValue = ref<String>()

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
},
    columns = [
        [{
            label: '雪月夜',
            // 其他属性值
            id: 2021
            // ...
        }, {
            label: '冷夜雨',
            id: 804
        }]
    ]


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

const chooseYear = (e: chooseEven) => {
    console.log('confirm', e)
    show.value = false
    chooseValue.value = e.value[0] + ''
    console.log('点击确认', chooseValue.value)
    emit('changeYearGroup', e.value[0] + '')
}

watch(
    props.rangeData,
    (newProps) => {
        if (newProps.length) {
            console.log('新增值年度范围数据', newProps)
            let index = newProps[0].length
            chooseValue.value = newProps[0][index - 1]
        }
    },
    // 强制立即执行回调
    { immediate: true }
);

onMounted(() => {

})
</script>

<style lang="less" scoped>
.big-contaniner {

    .year-picker {
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
        display: inline-block;
        width: 100%;
        height: 500rpx;
    }
}
</style>