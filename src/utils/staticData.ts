import userInfoApi from "@/api/userInfoApi"
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
export interface classify {
    classifyId: number,
    classifyDesc: string,
    status: string,
    icon: string,
    color: string
}

export interface customClassify {
    allCustomOutput: classify[],
    inuseCustomOutput: classify[],
    allCustomInput: classify[],
    inuseCustomInput: classify[]
}

export const defaultOutputClassify: classify[] = [
    {
        classifyId: 0,
        classifyDesc: '消费',
        status: 'Y',
        icon: 'icon-xianxing-15',
        color: '#abecfe',
    },
    {
        classifyId: 1,
        classifyDesc: '餐饮',
        status: 'Y',
        icon: 'icon-canyin text-#fce681',
        color: '#fce681;',
    },
    {
        classifyId: 2,
        classifyDesc: '购物',
        status: 'Y',
        icon: 'icon-shaogouwu',
        color: '#f5cffe',
    },
    {
        classifyId: 3,
        classifyDesc: '住房',
        status: 'Y',
        icon: 'icon-zhuyezhufang',
        color: '#d8d6fe',
    },
    {
        classifyId: 4,
        classifyDesc: '交通',
        status: 'Y',
        icon: 'icon-jiaotong',
        color: '#8bfaca',
    },
    {
        classifyId: 5,
        classifyDesc: '娱乐',
        status: 'Y',
        icon: 'icon-yule',
        color: '#fbd5b8',
    },
    {
        classifyId: 6,
        classifyDesc: '医疗',
        status: 'Y',
        icon: 'icon-yiliao',
        color: '#e2f4a8',
    },
]
//自定义的支出分类从8开始
export function inuseCustomOutputClassify() {
    const params = {
        userID: loginStore.userID
    }
    return new Promise((resolve, reject) => {
        userInfoApi.getClassifyList(params).then(res => {
            if (res.statusCode == 200) {
                let CustomOutputClassify = {
                    allCustomOutput: [],
                    inuseCustomOutput: [],
                    allCustomInput: [],
                    inuseCustomInput: []
                }
                CustomOutputClassify.allCustomOutput = res.data.filter((e: any) => e.type == -1).map((e: any) => ({ classifyId: e.classify_id, classifyDesc: e.classify_name, icon: 'icon-jushoucang' }))
                CustomOutputClassify.inuseCustomOutput = res.data.filter((e: any) => e.type == -1 && e.status == 'Y').map((e: any) => ({ classifyId: e.classify_id, classifyDesc: e.classify_name, icon: 'icon-jushoucang' }))
                CustomOutputClassify.allCustomInput = res.data.filter((e: any) => e.type == 1).map((e: any) => ({ classifyId: e.classify_id, classifyDesc: e.classify_name, icon: 'icon-jushoucang' }))
                CustomOutputClassify.inuseCustomInput = res.data.filter((e: any) => e.type == 1 && e.status == 'Y').map((e: any) => ({ classifyId: e.classify_id, classifyDesc: e.classify_name, icon: 'icon-jushoucang' }))
                resolve(CustomOutputClassify)
            }
        })
    })
}




export const defaultInputClassify: classify[] = [
    {
        classifyId: 0,
        classifyDesc: '其他',
        status: 'Y',
        icon: 'icon-qita',
        color: '#d8d6fe',
    },
    {
        classifyId: 1,
        classifyDesc: '工资',
        status: 'Y',
        icon: 'icon-gongzi',
        color: '#92dfbf',
    },
    {
        classifyId: 2,
        classifyDesc: '投资',
        status: 'Y',
        icon: 'icon-qutouzi',
        color: '#e2f4a8',
    },
    {
        classifyId: 3,
        classifyDesc: '理财',
        status: 'Y',
        icon: 'icon-licai',
        color: '#fce681',
    },
    {
        classifyId: 4,
        classifyDesc: '红包',
        status: 'Y',
        icon: 'icon-hongbao',
        color: '#fd9489',
    }
]
//自定义的收入分类从5开始

