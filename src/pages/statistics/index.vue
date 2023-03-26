<template>
	<view class="container">
		<view class="head">
			<view class="icon-l" @click="back">
				<u-icon name="arrow-left" size="20"></u-icon>
			</view>
			<view class="text" :class="{ 'chooseBorder': chooseType == -1 }" @click="changeChoose(-1)">
				支出</view>
			<view class="text" :class="{ 'chooseBorder': chooseType == 1 }" @click="changeChoose(1)">
				收入</view>
		</view>
		<view class="content" v-if="ready">
			<histogram :myData="myHistogramData" :rangeData="histogramRangeData" @changeYearGroup="changeYearGroup" />
			<LineChart :myData="myLineData" :rangeData="LineRangeData" @changeMonthGroup="changeMonthGroup"></LineChart>
			<sectorChart :myData="mySectorData" :rangeData="LineRangeData" @changeMonthGroup="changeClassifyMonth" />
			<view class="classifyList">
				<view v-for="(item, index) in classifyList" class="classifyItem"
					@click="toClassifyListDetial(item.classify, filterClassifyName(chooseType, item.classify))">
					<view class="flex">
						<BillTypeIconVue :icon="filterClassifyIcon(chooseType, item.classify)" type="small"
							:bg-color="filters.billTypeColor2(index)" />
						{{ filterClassifyName(chooseType, item.classify) }}
						<span>{{ item.count }}笔</span>
					</view>
					<view class="flex">
						-{{ item.sums.toFixed(2) }}￥
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
import { ref, onMounted, computed } from 'vue'
import billServer from '@/api/billApi'
import { useloginStore } from '@/pinia-store/login'
import { chart, interSeries, sector, sectorSeries, sectorSeriesData } from '@/entity/chart'
import filters from '@/utils/filters'
import formattereTools from '@/utils/dataUtils'
import histogram from './component/histogramChart.vue'
import LineChart from './component/LineChart.vue';
import sectorChart from './component/sectorChart.vue';
import BillTypeIconVue from '../../components/billTypeIcon.vue'
import { classifyType, defaultOutputClassify, defaultInputClassify, customClassifyType, CustomClassify } from '@/utils/staticData'
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

const allClassify = ref<customClassifyType>(
	{
		allOutput: [],
		inuseOutput: [],
		allInput: [],
		inuseInput: []
	}
)


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
	currentClassifyMonth = ref(0),
	chooseType = ref<number>(-1)

const year = new Date().getFullYear() + ''


const getYearGroupData = async (year: string, mon: string) => {
	const params = { userID: storeUserID, groupType: "year", billType: chooseType.value }
	const res = await billServer.getBillChartData(params)
	let arr = res.data.map((item: yearGroupItem) => item.date)
	histogramRangeData.value.push(arr)
	const params2 = { userID: storeUserID, groupType: "month", billType: chooseType.value }
	const res2 = await billServer.getBillChartData(params2)
	let arr2 = res2.data.map((item: yearGroupItem) => item.date)
	LineRangeData.value.push(arr2)
	if (!histogramRangeData.value[0].includes(year))
		histogramRangeData.value[0].push(year)
	if (!LineRangeData.value[0].includes(mon))
		LineRangeData.value[0].unshift(mon)
	console.log('有数据的年\月份信息', histogramRangeData.value, LineRangeData.value)
},
	getMonthGroupData = async (year: string) => {
		// 每次切换年份，初始化图表数据
		myHistogramData.value.series = []
		let temp: interSeries = { name: '', data: [] }
		temp.name = chooseType.value == -1 ? `${year}支出情况` : `${year}收入情况`
		temp.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		myHistogramData.value.series.push(temp)
		// 请求该年份的账单数据
		let params = { userID: storeUserID, groupType: "month", billType: chooseType.value, year: year }
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
		temp.name = chooseType.value == -1 ? `${month}月支出` : `${month}月收入`
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
		const params = { userID: Number(storeUserID), groupType: "day", billType: chooseType.value, month: month }
		const res = await billServer.getBillChartData(params)
		for (let i = 0; i < res.data.length; i++) {
			let index = Number(res.data[i].date.slice(8)) - 1
			myLineData.value.series[0].data[index] = res.data[i].sums
		}
		console.log('折线图数据', myLineData.value)
	},
	getClassifyGroupData = async (month: string) => {
		// 每次切换月份，初始化图表数据
		mySectorData.value.categories = []
		mySectorData.value.series = []
		const params = { userID: Number(storeUserID), groupType: "classify", billType: chooseType.value, month: month }
		const res = await billServer.getBillChartData(params)
		let temp2: sectorSeries = {
			name: month + '月分类',
			data: []
		}
		classifyList.value = res.data
		for (let i = 0; i < res.data.length; i++) {
			mySectorData.value.categories.push(filterClassifyName(chooseType.value, res.data[i].classify))
			// series部分
			temp2.data.push({ name: filterClassifyName(chooseType.value, res.data[i].classify), value: res.data[i].sums })
		}
		mySectorData.value.series.push(temp2)
		console.log('圆饼图数据', mySectorData.value)
		setTimeout(() => { ready.value = true })
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
	toClassifyListDetial = (classify: number, name: string) => {
		console.log('name---', name)
		uni.navigateTo({
			// url: '/pages/billDetial/index'
			url: `/pages/billDetial/classifyList?classify=${classify}&classify_name=${name}&month=${currentClassifyMonth.value}&billType=${chooseType.value}`
		})
	}, back = () => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}, changeChoose = (type: number) => {
		chooseType.value = type
		reload()
	},
	reload = () => {
		let month = new Date().getMonth() + 1
		let mm = month < 10 ? '0' + month : '' + month
		getYearGroupData(year, mm)
		getMonthGroupData(year)
		currentClassifyMonth.value = Number(mm)
		getDayGroupData(mm)
		getClassifyGroupData(mm)
	}

async function getCustomClassify() {
	allClassify.value = await CustomClassify()
}

function filterClassifyName(billType: number, id: number) {
	if (billType == -1) {
		let index = allClassify.value.allOutput.findIndex(e => e.classify_id == id)
		if (index != -1)
			return allClassify.value.allOutput[index].classify_name
		else
			return "自定义";
	}
	else {
		let index = allClassify.value.allInput.findIndex(e => e.classify_id == id)
		if (index != -1)
			return allClassify.value.allInput[index].classify_name
		else
			return "自定义";
	}
}

function filterClassifyIcon(billType: number, id: number) {
	if (billType == -1) {
		let index = allClassify.value.allOutput.findIndex(e => e.classify_id == id)
		if (index != -1)
			return allClassify.value.allOutput[index].icon
		else
			return "icon-jushoucang";
	}
	else {
		let index = allClassify.value.allInput.findIndex(e => e.classify_id == id)
		if (index != -1)
			return allClassify.value.allInput[index].icon
		else
			return "icon-jushoucang";
	}
}




onMounted(() => {
	// 如果用户账单总数为0就return
	if (loginStore.info.bill_count) {
		getCustomClassify()
		reload()
	} else {
		noBill.value = true
	}
})

</script>

<style lang="less" scoped>
.container {
	width: 100%;
	padding-top: 100rpx;
	background-color: var(--pickerContent);
	// .head {
	// 	width: 100%;
	// 	height: 100rpx;
	// 	padding: 0 40rpx;
	// 	position: fixed;
	// 	top: 0;
	// 	background: #dfdfe1;
	// 	z-index: 2;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;

	// 	.icon-l {
	// 		position: absolute;
	// 		left: 20rpx;
	// 	}

	// 	.icon-r {
	// 		position: absolute;
	// 		right: 20rpx;
	// 	}
	// }

	.head {
		width: 100%;
		height: 100rpx;
		padding: 0 40rpx;
		position: fixed;
		top: 0;
		background: var(--headBg);
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;

		.text {
			line-height: 100rpx;
			height: 100%;
			margin: 0 40rpx;
		}

		.icon-l {
			position: absolute;
			left: 20rpx;
		}

		.icon-r {
			position: absolute;
			right: 20rpx;
		}
	}

	.chooseBorder {
		// border-bottom: 2px solid #559eff;
		border-bottom: 2px solid var(--addBtnColor);
	}

	.content {
		width: 100%;
		padding: 0 0 40rpx 0;

		.classifyList {
			padding: 60rpx 70rpx 0;
			background-color: var(--pickerContent);

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
				color: var(--addBtnColor);
				text-decoration: underline;
			}

		}

		p,
		i {
			color: var(--lightColor);
		}
	}
}
</style>
