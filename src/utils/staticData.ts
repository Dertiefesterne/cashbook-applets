import userInfoApi from "@/api/userInfoApi"
import { useloginStore } from '@/pinia-store/login'
const loginStore = useloginStore()
export interface classifyType {
    classifyId: number,
    classifyName: string,
    status: string,
    icon: string,
    color: string
}

export interface customClassifyType {
    allCustomOutput: classifyType[],
    inuseCustomOutput: classifyType[],
    allCustomInput: classifyType[],
    inuseCustomInput: classifyType[]
}

export const defaultOutputClassify: classifyType[] = [
    {
        classifyId: 0,
        classifyName: '消费',
        status: 'Y',
        icon: 'icon-xianxing-15',
        color: '#abecfe',
    },
    {
        classifyId: 1,
        classifyName: '餐饮',
        status: 'Y',
        icon: 'icon-canyin text-#fce681',
        color: '#fce681;',
    },
    {
        classifyId: 2,
        classifyName: '购物',
        status: 'Y',
        icon: 'icon-shaogouwu',
        color: '#f5cffe',
    },
    {
        classifyId: 3,
        classifyName: '住房',
        status: 'Y',
        icon: 'icon-zhuyezhufang',
        color: '#d8d6fe',
    },
    {
        classifyId: 4,
        classifyName: '交通',
        status: 'Y',
        icon: 'icon-jiaotong',
        color: '#8bfaca',
    },
    {
        classifyId: 5,
        classifyName: '娱乐',
        status: 'Y',
        icon: 'icon-yule',
        color: '#fbd5b8',
    },
    {
        classifyId: 6,
        classifyName: '医疗',
        status: 'Y',
        icon: 'icon-yiliao',
        color: '#e2f4a8',
    },
]
//自定义的支出分类从8开始
export function CustomClassify() {
    const params = {
        userID: loginStore.userID
    }
    return new Promise<customClassifyType>((resolve, reject) => {
        userInfoApi.getClassifyList(params).then(res => {
            if (res.statusCode == 200) {
                let CustomClassify: customClassifyType = {
                    allCustomOutput: [],
                    inuseCustomOutput: [],
                    allCustomInput: [],
                    inuseCustomInput: []
                }
                CustomClassify.allCustomOutput = res.data.filter((e: any) => e.type == -1).map((e: any) => ({ classifyId: e.classify_id, classifyName: e.classify_name, status: e.status, icon: 'icon-jushoucang', color: '#d8d6fe' }))
                CustomClassify.inuseCustomOutput = res.data.filter((e: any) => e.type == -1 && e.status == 'Y').map((e: any) => ({ classifyId: e.classify_id, classifyName: e.classify_name, status: e.status, icon: 'icon-jushoucang', color: '#d8d6fe' }))
                CustomClassify.allCustomInput = res.data.filter((e: any) => e.type == 1).map((e: any) => ({ classifyId: e.classify_id, classifyName: e.classify_name, status: e.status, icon: 'icon-jushoucang', color: '#d8d6fe' }))
                CustomClassify.inuseCustomInput = res.data.filter((e: any) => e.type == 1 && e.status == 'Y').map((e: any) => ({ classifyId: e.classify_id, classifyName: e.classify_name, status: e.status, icon: 'icon-jushoucang', color: '#d8d6fe' }))
                resolve(CustomClassify)
            }
        })
    })
}




export const defaultInputClassify: classifyType[] = [
    {
        classifyId: 0,
        classifyName: '其他',
        status: 'Y',
        icon: 'icon-qita',
        color: '#d8d6fe',
    },
    {
        classifyId: 1,
        classifyName: '工资',
        status: 'Y',
        icon: 'icon-gongzi',
        color: '#92dfbf',
    },
    {
        classifyId: 2,
        classifyName: '投资',
        status: 'Y',
        icon: 'icon-qutouzi',
        color: '#e2f4a8',
    },
    {
        classifyId: 3,
        classifyName: '理财',
        status: 'Y',
        icon: 'icon-licai',
        color: '#fce681',
    },
    {
        classifyId: 4,
        classifyName: '红包',
        status: 'Y',
        icon: 'icon-hongbao',
        color: '#fd9489',
    }
]
//自定义的收入分类从5开始

