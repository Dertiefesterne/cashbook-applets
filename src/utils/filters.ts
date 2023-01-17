/**
 * Filters对象
 */
export default {

	billTypeFilter(index: number) {
		// 业务类型（0：未知，1：求职用户，2：企业HR，9：消息通知，10：其他）
		switch (index) {
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
			case 6:
				return '教育';
			case 7:
				return '医疗';
			default:
				return '消费';
		}
	},
	billTypeIcon(index: number) {
		// 业务类型（0：未知，1：求职用户，2：企业HR，9：消息通知，10：其他）
		switch (index) {
			case 1:
				return 'icon-canyin text-#fce681';
			case 2:
				return 'icon-gouwu';
			case 3:
				return 'icon-zhuyezhufang';
			case 4:
				return 'icon-jiaotong';
			case 5:
				return 'icon-yule';
			case 6:
				return 'icon-jiaoyu';
			case 7:
				return 'icon-yiliao';
			default:
				return 'icon-xianxing-15';
		}
	},
	billTypeColor(index: number) {
		switch (index) {
			case 1:
				return 'background:#fce681;';
			case 2:
				return 'background:#f5cffe';
			case 3:
				return 'background:#d8d6fe';
			case 4:
				return 'background:#8bfaca';
			case 5:
				return 'background:#fbd5b8';
			case 6:
				return 'background:#99fbf2';
			case 7:
				return 'background:#e2f4a8';
			default:
				return 'background:#abecfe';
		}
	}
}
