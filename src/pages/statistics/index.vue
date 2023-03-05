<template>
	<view class="container">
		<view class="head ">
			<view class="icon-l">
				<u-icon name="arrow-left" size="20"></u-icon>
			</view>
			收支报表
		</view>
		<view class="content" v-if="ready">
			<histogram :myData="myHistogramData" :rangeData="histogramRangeData" @changeYearGroup="changeYearGroup" />
			<LineChart :myData="myLineData" :rangeData="LineRangeData" @changeMonthGroup="changeMonthGroup"></LineChart>
			<sectorChart :myData="mySectorData" :rangeData="LineRangeData" @changeMonthGroup="changeClassifyMonth" />
			<view class="classifyList">
				<view v-for="item in classifyList" class="classifyItem" @click="toClassifyListDetial(item.classify)">
					<view class="flex">
						<BillTypeIconVue :classify="item.classify" />
						{{ filters.billTypeFilter(item.classify) }}
						<span>{{ item.count }}笔</span>
					</view>
					<view class="flex">
						-{{ item.sums }}￥
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view v-if="noBill" class="noBill">
			<i class="iconfont icon-zanwushuju1" style="font-size:300rpx"></i>
			<p>暂无账单</p>
			<view @click="goAddBill" class="addBill"><u-icon name="edit-pen-fill" size="25" color="#2979FF"></u-icon>
				<p>记一笔</p>
			</view>
			<!-- <u-empty text="暂无账单-">
			</u-empty> -->
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
import BillTypeIconVue from '../../components/billTypeIcon.vue'
const loginStore = useloginStore()
const storeUserID = loginStore.userID

interface yearGroupItem {
	// x轴
	date: string,
	// 图表数据
	sums: number,
	count: number,
}

interface classifyItem {
	// x轴
	classify: number,
	// 图表数据
	sums: number,
	count: number,
}

const ready = ref(false),
	noBill = ref(false),
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
	}),
	//分类列表
	classifyList = ref<classifyItem[]>([]),
	currentClassifyMonth = ref(0)

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
},
	columns = [
		['2022', '2023'],
		['01', '02']
	]


const getYearGroupData = async () => {
	const params = { userID: storeUserID, groupType: "year", billType: -1 }
	const res = await billServer.getBillChartData(params)
	let arr = res.data.map((item: yearGroupItem) => item.date)
	histogramRangeData.value?.push(arr)
	const params2 = { userID: storeUserID, groupType: "month", billType: -1 }
	const res2 = await billServer.getBillChartData(params2)
	let arr2 = res2.data.map((item: yearGroupItem) => item.date.slice(5))
	LineRangeData.value.push(arr2)
	console.log('有数据的年\月份信息', histogramRangeData.value, LineRangeData.value)
},
	getMonthGroupData = async (year: string) => {
		// 每次切换年份，初始化图表数据
		myHistogramData.value.series = []
		let temp: interSeries = { name: '', data: [] }
		temp.name = year + '支出情况'
		temp.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		myHistogramData.value.series.push(temp)
		// 请求该年份的账单数据
		let params = { userID: storeUserID, groupType: "month", billType: -1, year: year }
		const res = await billServer.getBillChartData(params)
		for (let i = 0, len = res.data.length; i < len; i++) {
			// 如果是今年的数据按月份分组的话，顺便记录下有数据的月份信息
			// arr.push(res.data[i].date.slice(5))
			let index = Number(res.data[i].date.slice(5)) - 1
			myHistogramData.value.series[0].data[index] = res.data[i].sums
		}
	},
	initDayGroupData = (month: string) => {
		// 每次切换月份，初始化图表数据
		myLineData.value.categories = []
		myLineData.value.series = []
		// 获取这个月的天数
		let days = formattereTools.getMonthDays(new Date().getFullYear() + '-' + month + '-01')
		let temp: interSeries = { name: '', data: [] }
		// 图表名
		temp.name = month + '月支出'
		for (let i = 1; i < days + 1; i++) {
			// 初始化x轴
			let str = month + '/' + i
			myLineData.value?.categories.push(str)
			// 初始化Y轴
			temp.data.push(0)
		}
		myLineData.value.series.push(temp)
		console.log('初始化月度数据表格', myLineData.value)
	},
	getDayGroupData = async (month: string) => {
		initDayGroupData(month)
		console.log('yyyyyyyyyyyyyy', LineRangeData.value[0], month, LineRangeData.value[0].includes(month))
		const params = { userID: Number(storeUserID), groupType: "day", billType: -1, month: month }
		const res = await billServer.getBillChartData(params)
		console.log('结果month', res.data)
		for (let i = 0; i < res.data.length; i++) {
			let index = Number(res.data[i].date.slice(8)) - 1
			myLineData.value.series[0].data[index] = res.data[i].sums
		}
		console.log('结果month2', myLineData.value)
	},
	getClassifyGroupData = async (month: string) => {
		// 每次切换月份，初始化图表数据
		mySectorData.value.categories = []
		mySectorData.value.series = []
		const params = { userID: Number(storeUserID), groupType: "classify", billType: -1, month: month }
		const res = await billServer.getBillChartData(params)
		let temp2: sectorSeries = {
			name: month + '月分类',
			data: []
		}
		console.log('分类图表', res.data)
		classifyList.value = res.data
		for (let i = 0; i < res.data.length; i++) {
			mySectorData.value.categories.push(filters.billTypeFilter(res.data[i].classify))
			// series部分
			temp2.data.push({ name: filters.billTypeFilter(res.data[i].classify), value: res.data[i].sums })
		}
		mySectorData.value.series.push(temp2)

		console.log('classify2', mySectorData.value)
		ready.value = true
	},
	changeYearGroup = (e: any) => {
		console.log(e, typeof e)
		getMonthGroupData(e)
	},
	changeMonthGroup = (e: any) => {
		console.log(e, typeof e)
		getDayGroupData(e)
	},
	changeClassifyMonth = (e: any) => {
		console.log(e, typeof e)
		currentClassifyMonth.value = Number(e)
		getClassifyGroupData(e)
	},
	goAddBill = () => {
		uni.navigateTo({
			url: '/pages/addBill/index'
		})
	},
	toClassifyListDetial = (classify: number) => {
		uni.navigateTo({
			// url: '/pages/billDetial/index'
			url: `/pages/billDetial/classifyList?classify=${classify}&month=${currentClassifyMonth.value}`
		})
	}


onMounted(() => {
	// 如果用户账单总数为0就return
	if (loginStore.info.bill_count) {
		getYearGroupData()
		let year = new Date().getFullYear() + ''
		getMonthGroupData(year)
		let month = new Date().getMonth() + 1
		let mm = month < 10 ? '0' + month : '' + month
		currentClassifyMonth.value = Number(mm)
		getDayGroupData(mm)
		getClassifyGroupData(mm)
	} else {
		noBill.value = true
	}
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
		padding: 0 0 40rpx 0;

		.classifyList {
			padding: 0 70rpx;
			margin-top: 40rpx;

			.classifyItem {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;

				.flex {
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.noBill {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding-top: 100rpx;

		.addBill {
			display: flex;
			margin-top: 20rpx;

			p {
				height: 20px;
				font-size: 30rpx;
				line-height: 25px;
				// border-bottom: 1px solid #2979FF;
				color: #2979FF;
				text-decoration: underline;
			}

		}

		p,
		i {
			color: #c0c4cc;
		}
	}
}
</style>
