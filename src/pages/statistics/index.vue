<template>
	<view class="container">
		<view class="head ">
			<view class="icon-l">
				<u-icon name="arrow-left" size="20"></u-icon>
			</view>
			收支报表
		</view>
		<view class="content" v-if="ready">
			<histogram :data1="myHistogramData" :rangeData="histogramRangeData" @changeYearGroup="changeYearGroup" />
			<LineChart :myData="myLineData" :rangeData="LineRangeData" @changeMonthGroup="changeMonthGroup"></LineChart>
			<sectorChart :myData="mySectorData" />
			<!-- <view class="text-area">
			<view @tap="loginOut" v-if="loginStore.userID != -1">退出登录</view>
		</view> -->
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import { chart, interSeries, sector, sectorSeries, sectorSeriesData } from '@/entity/chart'
import filters from '@/utils/filters'
import formattereTools from '@/utils/dataUtils'
import histogram from './component/histogramChart.vue'
import LineChart from './component/LineChart.vue';
import sectorChart from './component/sectorChart.vue';
const loginStore = useloginStore()

interface yearGroupItem {
	// x轴
	date: String,
	// 图表数据
	sums: Number,
	count: Number,
}


const ready = ref(false),
	myHistogramData = ref<chart>({
		categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		series: []
	}),
	myLineData = ref<chart>({
		categories: [],
		series: []
	}),
	histogramRangeData = ref<Array<Array<String>>>([]),
	LineRangeData = ref<Array<Array<String>>>([]),
	mySectorData = ref<sector>({
		categories: [],
		series: []
	})

const chartData = {
	categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	series: [
		{
			name: '支出',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}
	]
}, chartData3 = {
	categories: ['1班', '2班', '3班', '4班', '5班'],
	series: [
		{
			name: '支出',
			data: [{ "name": "一班", "value": 50 }, { "name": "二班", "value": 30 }, { "name": "三班", "value": 20 }, { "name": "四班", "value": 18 }, { "name": "五班", "value": 8 }]
		}
	]
}


const getYearGroupData = async () => {
	const params = { userID: Number(loginStore.userID), groupType: "year", billType: -1 }
	const res = await billServer.getBillChartData(params)
	let arr = res.data.map((item: yearGroupItem) => item.date)
	console.log('年结果2', arr)
	histogramRangeData.value?.push(arr)
	console.log('年结果3', histogramRangeData.value)
},
	getMonthGroupData = async (year: String) => {
		// 每次切换年份，初始化图表数据
		myHistogramData.value.series = []
		let temp: interSeries = { name: '', data: [] }
		temp.name = year + '支出情况'
		temp.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		myHistogramData.value.series.push(temp)
		// 请求该年份的账单数据
		let params = { userID: Number(loginStore.userID), groupType: "month", billType: -1, year: year }
		const res = await billServer.getBillChartData(params)
		// console.log('月分组结果', res.data)
		// 将有支出的月份计入
		let arr: Array<String> = []
		for (let i = 0; i < res.data.length; i++) {
			// 如果是今年的数据按月份分组的话，顺便记录下有数据的月份信息
			arr.push(res.data[i].date.slice(5))
			let index = Number(res.data[i].date.slice(5)) - 1
			myHistogramData.value.series[0].data[index] = res.data[i].sums
		}
		if (year == new Date().getFullYear() + '') {
			LineRangeData.value = []
			LineRangeData.value.push(arr)
		}
		console.log('月分组结果', myHistogramData.value, LineRangeData.value)
	},
	initDayGroupData = () => {
		let yy = new Date().getFullYear()
		let month = new Date().getMonth() + 1
		let mm = month < 10 ? '0' + month : month
		// 获取这个月的天数
		let days = formattereTools.getMonthDays(yy + '-' + mm + '-01')
		let temp: interSeries = { name: '', data: [] }
		// 图表名
		temp.name = mm + '月支出'
		for (let i = 1; i < days + 1; i++) {
			// 初始化x轴
			let str = month + '/' + i
			myLineData.value?.categories.push(str)
			// 初始化Y轴
			temp.data.push(0)
		}
		myLineData.value?.series.push(temp)
		console.log('初始化数据表格', temp, myLineData.value)
	},
	getDayGroupData = async () => {
		const params = { userID: Number(loginStore.userID), groupType: "day", billType: -1 }
		const res = await billServer.getBillChartData(params)
		console.log('结果month', res.data)
		for (let i = 0; i < res.data.length; i++) {
			// console.log(res.data[i].date)
			// console.log(res.data[i].date.slice(5))
			// console.log(Number(res.data[i].date.slice(8)))
			let index = Number(res.data[i].date.slice(8)) - 1
			myLineData.value.series[0].data[index] = res.data[i].sums
		}
		console.log('结果month2', myLineData.value)
	},
	getClassifyGroupData = async () => {
		const params = { userID: Number(loginStore.userID), groupType: "classify", billType: -1 }
		const res = await billServer.getBillChartData(params)
		console.log('结果classify', res.data)
		let temp2: sectorSeries = {
			name: '本月分类',
			data: []
		}
		for (let i = 0; i < res.data.length; i++) {
			mySectorData.value.categories.push(filters.billTypeFilter(res.data[i].classify))
			// series部分
			temp2.data.push({ name: filters.billTypeFilter(res.data[i].classify), value: res.data[i].sums })
		}
		mySectorData.value.series.push(temp2)
		console.log('结果classify2', mySectorData.value)
		ready.value = true
	},
	changeYearGroup = (e: any) => {
		console.log(e, typeof e)
		getMonthGroupData(e)
	},
	changeMonthGroup = (e: any) => {
		console.log(e, typeof e)
	}


onMounted(() => {
	initDayGroupData()
	getYearGroupData()
	let yy = new Date().getFullYear() + ''
	getMonthGroupData(yy)
	getDayGroupData()
	getClassifyGroupData()
})

</script>

<style lang="less" scoped>
.container {
	width: 100%;
	padding-top: 100rpx;

	.head {
		width: 100%;
		height: 100rpx;
		padding: 0 40rpx;
		position: fixed;
		top: 0;
		background: #dfdfe1;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;

		.icon-l {
			position: absolute;
			left: 20rpx;
		}

		.icon-r {
			position: absolute;
			right: 20rpx;
		}
	}

	.content {
		width: 100%;
	}

}
</style>
