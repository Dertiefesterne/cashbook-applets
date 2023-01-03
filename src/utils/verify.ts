interface condition {
	name: string // 方法名
	value: string // 值
	message: string // 提示信息
}

interface verifyResult {
	rule: RegExp // 校验规则
	message: string // 校验不通过默认弹窗, false 不弹窗只返回结果.传参可自定义弹窗消息内容
}

export default {
	/**
	 * 常用校验
	 * @param {string} name 校验类型
	 * @param {any} value 数据
	 * @param {boolean} message 校验不通过默认弹窗, false 不弹窗只返回结果.传参可自定义弹窗消息内容
	 * @returns boolean : 返回结果,只能是 false / true, 错误校验也返回 false
	 */
	check(verify: condition) {
		let bool = true, // 校验结果
			getRegInfo: verifyResult = getVerifyType(verify.name)

		// console.log('%c [ verify ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', verify)

		// 非空判断
		if (!verify.value) {
			console.log('错误校验: ', verify)
			bool = false
		} else {
			// 获取校验规则
			bool = getRegInfo.rule.test(verify.value)
		}

		// 默认弹窗
		if (!bool) {
			const title: string = verify.message || getRegInfo.message
			uni.showToast({ title, icon: 'none', mask: false, duration: 1500 })
		}
		return bool
	},
	/**
	 * 对比日期
	 * 第一个日期是否大于第二个日期
	 * return : first 大于 last 返回 false
	 */
	comparisonDate(fDate: string, lDate: string, message: string): boolean {
		let fTime = new Date(fDate).getTime(),
			lTime = new Date(lDate).getTime(),
			result = lTime > fTime

		if (message && !result) uni.showToast({ title: message, icon: 'none', mask: true, duration: 1000 })
		return result
	},
}

/**
 * 获取校验规则
 * * 命名保持简短
 */
function getVerifyType(name: string): verifyResult {
	let rule:RegExp, message:string
	switch (name) {
		case 'phone':
			// 完整验证手机号
			message = '请输入正确的手机号'
			rule = /^1[3456789]\d{9}$/
			break
		case 'email':
			// 验证邮箱
			message = '请输入正确的邮箱'
			rule = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
			break
		case 'number':
			// 验证字符串是否是数字
			message = '只能输入数字'
			rule = /^1[3456789]\d{9}$/
			break
		case 'input':
			message = '只能输入中英文、数字、“_”或-'
			rule = /^[0-9A-Za-z\u4e00-\u9fa5_\-]+$/
			break
		case 'chine':
			// 限制输入中文
			message = '只能输入中文'
			rule = /^[\u4e00-\u9fa5]+$/
			break
		case 'ce':
			// 只能是中文加字母
			message = '只能输入中英文'
			rule = /^[\u4E00-\u9FA5A-Za-z]+$/
			break
	}
	return { rule, message }
}
