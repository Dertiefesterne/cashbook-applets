/**
 * Filters对象
 */
export default {

	billTypeFilter(index: number) {
		// 业务类型（0：未知，1：求职用户，2：企业HR，9：消息通知，10：其他）
		switch (index) {
			case -1:
				return '添加';
			case 0:
				return '消费';
			case 1:
				return '餐饮';
			case 2:
				return '购物';
			case 3:
				return '住房';
			case 4:
				return '交通';
			case 5:
				return '娱乐';
			// case 6:
			// 	return '教育';
			case 6:
				return '医疗';

			case 8:
				return '其他';
			case 9:
				return '工资';
			case 10:
				return '投资';
			case 11:
				return '理财';
			case 12:
				return '红包';
			default:
				return '自定义';
		}
	},
	billTypeIcon(index: number) {
		// 业务类型（0：未知，1：求职用户，2：企业HR，9：消息通知，10：其他）
		switch (index) {
			case -1:
				return 'icon-tianjia';
			case 0:
				return 'icon-xianxing-15';
			case 1:
				return 'icon-canyin text-#fce681';
			case 2:
				return 'icon-shaogouwu';
			case 3:
				return 'icon-zhuyezhufang';
			case 4:
				return 'icon-jiaotong';
			case 5:
				return 'icon-yule';
			// case 6:
			// 	return 'icon-jiaoyu';
			case 6:
				return 'icon-yiliao';

			case 8:
				return 'icon-qita';
			case 9:
				return 'icon-gongzi';
			case 10:
				return 'icon-qutouzi';
			case 11:
				return 'icon-licai';
			case 12:
				return 'icon-hongbao';
			default:
				return 'icon-jushoucang';
		}
	},
	billTypeColor(index: number) {
		switch (index) {
			case -1:
				return '#b9b9b9;';
			case 0:
				return '#abecfe';
			case 1:
				return '#fce681;';
			case 2:
				return '#f5cffe';
			case 3:
				return '#d8d6fe';
			case 4:
				return '#8bfaca';
			case 5:
				return '#fbd5b8';
			case 6:
				return '#e2f4a8';

			case 7:
				return '#99fbf2';



			case 8:
				return '#d8d6fe';
			case 9:
				return '#92dfbf';
			case 10:
				return '#e2f4a8';
			case 11:
				return '#fce681';
			case 12:
				return '#fd9489';
			default:
				return '#abecfe';
		}
	},
	//图表颜色顺序
	billTypeColor2(index: number) {
		switch (index) {
			case 0:
				return 'rgba(24,144,255,0.6)';
			case 1:
				return 'rgba(145,203,116,0.6)';
			case 2:
				return 'rgba(250,200,88,0.6)';
			case 3:
				return 'rgba(238,102,102,0.6)';
			case 4:
				return 'rgba(115,192,222,0.6)';
			case 5:
				return 'rgba(60,162,114,0.6)';
			case 6:
				return 'rgba(252,132,82,0.6)';
			case 7:
				return 'rgba(154,96,180,0.6)';
			case 8:
				return 'rgba(234,124,204,0.6)';
			case 9:
				return 'rgba(24,144,255,0.6)';
			case 10:
				return 'rgba(145,203,116,0.6)';
			case 11:
				return 'rgba(250,200,88,0.6)';
			case 12:
				return 'rgba(238,102,102,0.6)';
			default:
				return '#abecfe';
		}
	},
	customBillTypeColor(index: number) {
		switch (index) {
			case 0:
				return '#fce681;';
			case 1:
				return '#f5cffe';
			case 2:
				return '#d8d6fe';
			default:
				return '#99fbf2';
		}
	}
}
