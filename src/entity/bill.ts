
export interface Bill {
	/**  账单ID*/
	bill_id: number
	/**  用户ID */
	user_id: number
	/**  账单类型 */
	bill_type: number
	/**  账单时间 */
	data_time: Date
	/**  账单时间 yy-mm-dd hh:mm:ss 格式*/
	time: string
	/**  账单时间戳 */
	timestamp: string
	/**  账单金额 */
	money: number
	/**  账单事项 */
	matter: string
	/**  账单分类 */
	classify: number
	/**  账单备注 */
	notes: string
	/**  账单完整句子（一句话记账才会有值） */
	full_sentences: string
}

// 分组信息
export interface groupBill {
	/**  日期，按天分组 */
	date: Date,
	/**  该组金额总数 */
	sums: number,
	/**  该组账单数量 */
	count: number
}

// 请求返回信息
export interface responseType {
	/**  日期，按天分组 */
	code: number,
	/**  该组金额总数 */
	data: any
}


