import userInfoApi from "@/api/userInfoApi"
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
export interface classifyType {
    classify_id: number,
    classify_name: string,
    status: string,
    icon: string,
    color: string,
    isSys: string,
    classify_type: number
}

export interface customClassifyType {
    allOutput: classifyType[],
    inuseOutput: classifyType[],
    allInput: classifyType[],
    inuseInput: classifyType[]
}

export const defaultOutputClassify: classifyType[] = [
    {
        classify_id: 1,
        classify_name: '消费',
        status: 'Y',
        icon: 'icon-xianxing-15',
        color: '#abecfe',
        isSys: 'Y',
        classify_type: -1
    },
    {
        classify_id: 2,
        classify_name: '餐饮',
        status: 'Y',
        icon: 'icon-canyin text-#fce681',
        color: '#fce681;',
        isSys: 'Y',
        classify_type: -1
    },
    {
        classify_id: 3,
        classify_name: '购物',
        status: 'Y',
        icon: 'icon-shaogouwu',
        color: '#f5cffe',
        isSys: 'Y',
        classify_type: -1
    },
    {
        classify_id: 4,
        classify_name: '住房',
        status: 'Y',
        icon: 'icon-zhuyezhufang',
        color: '#d8d6fe',
        isSys: 'Y',
        classify_type: -1
    },
    {
        classify_id: 5,
        classify_name: '交通',
        status: 'Y',
        icon: 'icon-jiaotong',
        color: '#8bfaca',
        isSys: 'Y',
        classify_type: -1
    },
    {
        classify_id: 6,
        classify_name: '娱乐',
        status: 'Y',
        icon: 'icon-yule',
        color: '#fbd5b8',
        isSys: 'Y',
        classify_type: -1
    },
    {
        classify_id: 7,
        classify_name: '医疗',
        status: 'Y',
        icon: 'icon-yiliao',
        color: '#e2f4a8',
        isSys: 'Y',
        classify_type: -1
    },
]

export function CustomClassify() {
    const params = {
        userID: loginStore.userID
    }
    return new Promise<customClassifyType>((resolve, reject) => {
        userInfoApi.getClassifyList(params).then(res => {
            if (res.statusCode == 200) {
                let CustomClassify: customClassifyType = {
                    allOutput: [],
                    inuseOutput: [],
                    allInput: [],
                    inuseInput: []
                }
                CustomClassify.allOutput = res.data.filter((e: any) => e.classify_type == -1)
                CustomClassify.inuseOutput = res.data.filter((e: any) => e.classify_type == -1 && e.status == 'Y')
                CustomClassify.allInput = res.data.filter((e: any) => e.classify_type == 1)
                CustomClassify.inuseInput = res.data.filter((e: any) => e.classify_type == 1 && e.status == 'Y')
                resolve(CustomClassify)
            }
        })
    })
}




export const defaultInputClassify: classifyType[] = [
    {
        classify_id: 8,
        classify_name: '其他',
        status: 'Y',
        icon: 'icon-qita',
        color: '#d8d6fe',
        isSys: 'Y',
        classify_type: 1
    },
    {
        classify_id: 9,
        classify_name: '工资',
        status: 'Y',
        icon: 'icon-gongzi',
        color: '#92dfbf',
        isSys: 'Y',
        classify_type: 1
    },
    {
        classify_id: 10,
        classify_name: '投资',
        status: 'Y',
        icon: 'icon-qutouzi',
        color: '#e2f4a8',
        isSys: 'Y',
        classify_type: 1
    },
    {
        classify_id: 11,
        classify_name: '理财',
        status: 'Y',
        icon: 'icon-licai',
        color: '#fce681',
        isSys: 'Y',
        classify_type: 1
    },
    {
        classify_id: 12,
        classify_name: '红包',
        status: 'Y',
        icon: 'icon-hongbao',
        color: '#fd9489',
        isSys: 'Y',
        classify_type: 1
    }
]
//自定义的收入分类从5开始

