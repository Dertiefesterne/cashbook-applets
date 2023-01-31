<template>
	<view class="container">
		<view class="head ">
			<view class="icon-l">
				<u-icon name="arrow-left" size="20"></u-icon>
			</view>
			收支报表
		</view>
		<view class="content" v-if="ready">
			<histogram :data1="chartData" />
			<LineChart :myData="myData"></LineChart>
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


const ready = ref(false),
	myData = ref<chart>({
		categories: [],
		series: []
	}),
	mySectorData = ref<sector>({
		categories: [],
		series: []
	})

const chartData2 = {
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
}, chartData = {
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


const loginOut = () => {
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
}

const getYearData = async () => {
	const params = { userID: Number(loginStore.userID), groupType: "month", billType: -1 }
	const res = await billServer.getBillChartData(params)
	console.log('结果', res.data)
	for (let i = 0; i < res.data.length; i++) {
		console.log(res.data[i].date)
		console.log(res.data[i].date.slice(5))
		console.log(Number(res.data[i].date.slice(5)))
		let index = Number(res.data[i].date.slice(5)) - 1
		chartData.series[0].data[index] = res.data[i].sums
	}
	console.log('结果', chartData)
},
	initMonthData = () => {
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
			myData.value?.categories.push(str)
			// 初始化Y轴
			temp.data.push(0)
		}
		myData.value?.series.push(temp)
		console.log('初始化数据表格', temp, myData.value)
	},
	getMonthData = async () => {
		const params = { userID: Number(loginStore.userID), groupType: "day", billType: -1 }
		const res = await billServer.getBillChartData(params)
		console.log('结果month', res.data)
		for (let i = 0; i < res.data.length; i++) {
			// console.log(res.data[i].date)
			// console.log(res.data[i].date.slice(5))
			console.log(Number(res.data[i].date.slice(8)))
			let index = Number(res.data[i].date.slice(8)) - 1
			myData.value.series[0].data[index] = res.data[i].sums
		}
		console.log('结果month2', myData.value)
	},
	getClassifyData = async () => {
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
	}


onMounted(() => {
	initMonthData()
	getYearData()
	getMonthData()
	getClassifyData()
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
