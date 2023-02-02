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
