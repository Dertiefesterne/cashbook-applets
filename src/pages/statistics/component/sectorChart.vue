<template>
    <view class="big-contaniner">
        扇形图
        <view class="charts-box">
            <qiun-data-charts type="pie" :chartData="myData" />
        </view>
    </view>
</template>


<script setup lang="ts">

const emit = defineEmits(['update:modelValue', 'addBill']),
    props = defineProps({
        myData: {}
    })
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

</script>

<style lang="less" scoped>
.big-contaniner {

    /* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
    .charts-box {
        width: 100%;
        height: 300px;
    }
}
</style>