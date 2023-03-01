export interface classify {
    classifyId: number,
    classifyDesc: string
}

export const defaultOutputClassify: classify[] = [
    {
        classifyId: 0,
        classifyDesc: '消费'
    },
    {
        classifyId: 1,
        classifyDesc: '餐饮'
    },
    {
        classifyId: 2,
        classifyDesc: '购物'
    },
    {
        classifyId: 3,
        classifyDesc: '住房'
    },
    {
        classifyId: 4,
        classifyDesc: '交通'
    },
    {
        classifyId: 5,
        classifyDesc: '娱乐'
    },
    {
        classifyId: 6,
        classifyDesc: '教育'
    },
    {
        classifyId: 7,
        classifyDesc: '医疗'
    },
]


export const defaultInputClassify: classify[] = [
    {
        classifyId: 8,
        classifyDesc: '其他'
    },
    {
        classifyId: 9,
        classifyDesc: '工资'
    },
    {
        classifyId: 10,
        classifyDesc: '投资'
    },
    {
        classifyId: 11,
        classifyDesc: '理财'
    },
    {
        classifyId: 12,
        classifyDesc: '红包'
    }
]