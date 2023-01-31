// 折现图数据类型
export interface chart {
    // x轴
    categories: Array<string>,
    // 图表数据
    series: Array<interSeries>
}

export interface interSeries {
    // 图表名
    name: string,
    // 图表数据
    data: Array<number>
}


// 扇形图数据类型
export interface sector {
    // x轴
    categories: Array<string>,
    // 图表数据
    series: Array<sectorSeries>
}

export interface sectorSeries {
    // 图表名
    name: string,
    // 图表数据
    data: Array<sectorSeriesData>
}

export interface sectorSeriesData {
    // 分类名
    name: string,
    // 图表数据
    value: number
}

chartData3 = {
    categories: ['1班', '2班', '3班', '4班', '5班'],
    series: [
        {
            name: '支出',
            data: [{ "name": "一班", "value": 50 }, { "name": "二班", "value": 30 }, { "name": "三班", "value": 20 }, { "name": "四班", "value": 18 }, { "name": "五班", "value": 8 }]
        }
    ]
}