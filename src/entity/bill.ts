/**  获取招聘企业管理详情  v1/recruit/enterprise/manage/detail/${id} */
export interface EnterpriseInfo {
	/** 审核意见 */
	auditOpinion?: string
	/**  审核状态（0：待审核，1：通过，2：已驳回） */
	auditStatus: number
	/** 积分赠送时间 */
	availablePointGiftTime: string
	/** 公司对接负责人ID */
	chargePersonId: string
	/** 公司对接负责人昵称 */
	chargePersonName: string
	/** 添加时间 */
	createTime?: string
	/** 创建人ID */
	createrId?: string
	/** 可查收简历数 */
	deliverableCount: number
	/** 公司地址 */
	etpAddress: string
	/** 公司形象图 */
	etpCover: string
	/** 企业ID */
	etpId: string
	/** 公司工作氛围图 */
	etpImages: string
	/** 公司简介 */
	etpIntroduction: string
	/** 公司LOGO */
	etpLogo: string
	/** 公司名 */
	etpName: string
	/** 企业规模（1：020人，2：2099人，3：100499人，4：500999人，5：1000~9999人，6：10000人以上） */
	etpScale: number
	/** 公司标签 */
	etpTags: string
	/** 公司封面形象图 */
	etpVisualize: string
	/** 融资阶段（0：未融资，1：天使轮，2：A轮，3：B轮，4：C轮，5：D轮及以上，6：已上市，7：不需要融资） */
	financingStage: number
	/** 地理纬度 */
	geographicalLatitude: string
	/** 地理经度 */
	geographicalLongitude: string
	/** 招聘企业ID */
	id: string
	/** 是否显示（0：隐藏，1：显示）	 */
	isDisplay: boolean
	/** 操作人ID */
	operatorId: string
	/** 记录状态：1.正常, 0.已删除	 */
	recordStatus: boolean
	/** 发布岗位数 */
	recruitPositionCount: number
	/** 简历投递数 */
	resumeCount: number
	/** 排序 */
	sort: number
	/** 修改时间 */
	updateTime?: number
	/** 浏览量（PV） */
	visitCount: number
}

export interface Bill {
	/**  投递状态（0：未投递，1：已投递，2：已查收，3：沟通中，4：超时未处理，5：已拒绝（已退回），10：已完成） */
	bill_id: number
	/**  期望岗位 */
	user_id: number
	/**  期望岗位类型ID */
	bill_type: null
	/**  姓名 */
	data_time: Date
	time: string
	/**  最高学历（1：本科，2：大专，3：高中，4：初中及以下，5：硕士，6：博士，7：博士后） */
	timestamp: string
	/**  照片 */
	money: number
	/**  (求职状态（1：离职-随时到岗，2：在职-考虑机会，3：在职-月内到岗，4：在职-暂不考虑，5：应届毕业生） */
	matter: string
	/**  招聘简历ID */
	classify: number
	/**  期望薪资下限 */
	notes: string
	/**  期望薪资上限 */
	full_sentences: string
}

export interface groupBill {
	date: Date,
	sums: number,
	count: number
}

/**
 * 获取用户关联企业信息 /enterprise/getUserAffiliateEnterprise
 * 据了解, 用来获取用户是否有创建过企业, 以及是否有加入过企业
 * 审核状态（0：待审核，1：已通过，2：已驳回） ! 并不准确
 * 审核状态具体以  v1/recruit/enterprise/manage/detail/${id} 为准
 *  */
export interface UserAffiliateEnterprise {
	/** 企业ID */
	id: number
	/**  创建人ID */
	createrId?: number
	/**  操作人ID */
	operatorId: number
	/**  创建时间 */
	createTime?: number
	/**  更新时间 */
	updateTime?: number
	/** 记录状态（0：已删除，1：正常） */
	recordStatus: boolean
	/**  关联用户ID */
	userId: number
	/** 审核状态（0：待审核，1：已通过，2：已驳回） */
	auditStatus: number
	/**  审核意见 */
	auditOpinion?: string
	/**  企业名称 */
	etpName: string
	/**  企业官网 */
	etpWebsiteUrl: string
	/**  企业简介 */
	etpIntroduction: string
	/** 需求类型（1：游戏相关，2：动画相关，3：漫画相关，4：宣传相关，5：其他领域） */
	demandType: number
	/**  营业执照图片URL */
	businessLicence: string
	/**  负责人姓名 */
	leadingOfficialName: string
	/**  负责人手机号 */
	leadingOfficialPhone: number
	/**  其他联系方式 */
	otherContactWay: number
	/** 是否对公转账充值（1：是，0：否） */
	isTransferRechargePublish: boolean
}

/** 
 * 获取当前用户招聘团队信息 
 * /v1/recruit/team/manager/current/user
 */
export interface Team {
	/**  记录ID */
	id: string
	/** 是否招聘团队负责人：1.是,0.否	 */
	isTeamMaster: boolean
	/**  招聘企业ID */
	recruitEnterpriseId: string
	/**  招聘成员ID */
	recruitMemberId: string
	/**  招聘团队ID */
	recruitTeamId: string
	/**  用户头像 */
	userAvater: string
	/**  用户电子邮箱 */
	userEmail: string
	/**  用户ID */
	userId: string
	/**  用户昵称 */
	userNickname: string
	/** 用户手机号	 */
	userPhone: number
}

/** 获取当前用户招聘团队信息 obj == null 时 */
export interface TeamAttributes {
	// * 用户存在关联企业
	auditPassRate: number // 审核通过率
	auditPassCount: number // 审核通过数
	/**  待审核数 */
	unauditedCount: number

	// * 用户无关联企业
	/** 审核状态（0：待审核，1：已通过，2：已驳回） */
	auditStatus: [null, number]
	/**  是否存在关联企业 */
	isAffiliate: boolean
}

/** 招聘职位列表  /recruitPosition/getEnterpriseRecruitPositionList */
export interface EnterpriseList {
	/**  审核意见 */
	auditOpinion?: string
	/**  审核状态（0：待审核，1：通过，2：已驳回） */
	auditStatus: number
	/**  发布者头像 */
	chargePersonAvater: string
	/**  发布者ID */
	chargePersonId: string
	/**  发布者昵称 */
	chargePersonName: string
	/**  添加时间 */
	createTime?: string
	/**  创建人ID */
	createrId?: string
	/**  投递简历状态（0：未投递，1：已投递） */
	deliverResumeStatus: boolean
	/**  学历要求（0：不限，1：初中及以下，2：中专/	 中技，3：高中，4：大专，5：本科，6：硕士，7：博士） */
	educationRequirements: number
	/**  企业ID */
	etpId: string
	/**  企业招聘ID */
	etpRecruitId: string
	/**  公司LOGO */
	etpRecruitLogo: string
	/**  公司名称 */
	etpRecruitName: string
	/** 经验要求（0：不限，1：1年以内，2：1-3年，3：3-5年，4：5年 10年，5：10年以上）	 */
	experienceRequirements: number
	/**  地理纬度 */
	geographicalLatitude: string
	/**  地理经度 */
	geographicalLongitude: string
	/**  招聘岗位ID */
	id: string
	/** 是否关注（0：未关注，1：已关注）	 */
	isAttention: boolean
	/** 是否显示（0：隐藏，1：显示）	 */
	isDisplay: boolean
	/** 是否薪资面议（0：自定义，1：面议）	 */
	isSalaryNegotiable: boolean
	/**  操作人ID */
	operatorId: string
	/**  职位负责人ID */
	positionMasterId: string
	/** 记录状态：1.正常,0.已删除	 */
	recordStatus: boolean
	/** 招聘企业信息 */
	recruitEnterpriseInfo: PlatRecruitEnterpriseEntity
	/**  职位描述 */
	recruitIntroduction: string
	/**  职位名称 */
	recruitName: string
	/**  招聘岗位标签 */
	recruitPositionTags: string
	/**  招聘岗位类型ID */
	recruitPositionTypeId: string
	/**  简历投递数	 */
	resumeCount: number
	/**  薪资范围下限	 */
	salaryLowerLimit: number
	/**  薪资范围类型（1：1000-5000，2：5001000，3：1000015000，4：1500025000，5：2500050000，6：50000~10000，7：100000以上） */
	salaryType: number
	/**  薪资范围上限	 */
	salaryUpperLimit: number
	/**  排序	 */
	sort: number
	/**  修改时间 */
	updateTime?: number
	/**  工作地点 */
	workAddress: string
	/**  工作城市 */
	workCity: string
	/** 工作省份 */
	workProvince: string
}

/** 招聘企业信息 */
interface PlatRecruitEnterpriseEntity {
	/**  审核意见 */
	auditOpinion?: string
	/**  审核状态（0：待审核，1：通过，2：已驳回）	 */
	auditStatus: number
	/**  公司对接负责人ID */
	chargePersonId: string
	/**  公司对接负责人昵称 */
	chargePersonName: string
	/**  添加时间 */
	createTime?: string
	/**  创建人ID */
	createrId?: string
	/**  可查收简历数	 */
	deliverableCount: number
	/**  公司地址 */
	etpAddress: string
	/**  公司形象图 */
	etpCover: string
	/**  企业ID */
	etpId: string
	/**  公司工作氛围图 */
	etpImages: string
	/**  公司简介 */
	etpIntroduction: string
	/**  公司LOGO */
	etpLogo: string
	/**  公司名 */
	etpName: string
	/**  企业规模（1：020人，2：2099人，3：100499人，4：500999人，5：1000~	 9999人，6：10000人以上）	 */
	etpScale: number
	/**  公司标签 */
	etpTags: string
	/**  公司封面形象图 */
	etpVisualize: string
	/**  融资阶段（0：未融资，1：天使轮，2：A轮，3：B轮，4：C轮，5：D轮及以上，6：已上市，7：不需要融资）	 */
	financingStage: number
	/**  地理纬度 */
	geographicalLatitude: string
	/**  地理经度 */
	geographicalLongitude: string
	/**  招聘企业ID */
	id: string
	/** 是否显示（0：隐藏，1：显示）	 */
	isDisplay: boolean
	/**  操作人ID */
	operatorId: string
	/** 记录状态：1.正常,0.已删除	 */
	recordStatus: boolean
	/**  发布岗位数	 */
	recruitPositionCount: number
	/**  简历投递数	 */
	resumeCount: number
	/**  排序	 */
	sort: number
	/**  修改时间 */
	updateTime?: number
	/**  浏览量（PV）	 */
	visitCount: number
}
