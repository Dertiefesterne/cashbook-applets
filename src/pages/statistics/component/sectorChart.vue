<template>
    <view class="big-contaniner">
        <view class="month-picker" @click="show = true">
            {{ chooseValue }}月
            <u-icon :name="show ? 'arrow-down' : 'arrow-right'"></u-icon>
        </view>
        <u-picker :show="show" :columns="rangeData" closeOnClickOverlay @close="show = false"
            @confirm="chooseMonth"></u-picker>
        <view class="charts-box" v-if="myData?.categories.length">
            <qiun-data-charts type="pie" :background="theme" :chartData="myData" />
        </view>
        <view class="no-charts" v-else>
            <i class="iconfont icon-zanwushuju" style="font-size:200rpx"></i>
            <p>本月暂无账单</p>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import { chooseEven } from '@/entity/chart'
import { sector } from '@/entity/chart'

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
            type: Object as PropType<sector>
        }
    })
const show = ref(false),
    chooseValue = ref<String>()

const opts = {
    color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
    padding: [5, 5, 5, 5],
    enableScroll: false,
    extra: {
        pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF"
        }
    }
}, chartData2 = {
    categories: ['1班', '2班', '3班', '4班', '5班'],
    series: [
        {
            name: '支出',
            data: [{ "name": "一班", "value": 50 }, { "name": "二班", "value": 30 }, { "name": "三班", "value": 20 }, { "name": "四班", "value": 18 }, { "name": "五班", "value": 8 }]
        }
    ]
}, data2 = [{ "name": "一班", "value": 50 }, { "name": "二班", "value": 30 }, { "name": "三班", "value": 20 }, { "name": "四班", "value": 18 }, { "name": "五班", "value": 8 }]

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


</script>

<style lang="less" scoped>
.big-contaniner {
    .month-picker {
        padding: 10rpx 20rpx 0;
        display: flex;
        float: right;
    }

    /* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
    .charts-box {
        width: 100%;
        height: 300px;
    }

    .no-charts {
        width: 100%;
        margin-top: 100rpx;
        display: flex;
        align-items: center;
        flex-direction: column;

        p,
        i {
            color: var(--lightColor);
        }
    }
}
</style>