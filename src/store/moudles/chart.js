import * as types from '../mutation-types'

let state={
    // 曲线
    chartOption:{
        legend:{
            data:[],
            show:true,
        },
        toolbox:{
            show:true,
            feature:{
                saveAsImage:{
                    show:true,
                }
            }
        },
        dataZoom:[{
            type:'inside'
        },{
            type:'slider',
            show:true,
            start:0,
            end:100,
        }],
        tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
        },
        xAxis:[{
            type:'category',
            data:[],
            name:'时间(s)',
            axisLabel:{
                interval:3119,
            },
            axisTick:{
                interval:3119,
            },
        }],
        yAxis:[
            {
                name:'温度(t)',
                type:'value',
            },
            {
                name:'dT/dt',
                type:'value',
            }
        ],
        series:[]
    },
    // 电势数据
    potential:[],
    // 温度数据
    temp:[],
    // 微分数据
    dfTemp:[],
    // 文件数量
    index:0,
    // 曲线数量
    chartIndex:0,
    // 数据表格
    dataTable:[],
    // chartOption变化次数
    changeIndex:0,
}

let mutations = {
    [types.READ_FILE](state,{potential}){
        state.potential=potential
    },
    [types.SET_XAXIS](state,{xAxis}){
        // 文件数加一
        state.index++
        // 曲线数加二
        state.chartIndex+=2
        // 采集点总数
        let len = xAxis.length
        len=parseInt(len)
        // 第二份文件曲线时间若比第二个文件曲线短，则不需要重新赋值
        if(len<state.chartOption.xAxis[0].data.length){
            return
        }
        // 采集频率为0.0125秒,数据所花费的时间
        let time=(len/80).toFixed()
        let timeX=[] //横坐标
        for(let i =0;i<time;i++){
            for(let j=0;j<80;j++){
                let num=j*0.0125+i
                num=num.toFixed(4)
                timeX.push(num)
            }
        }
        
        // 曲线X轴数据赋值
        state.chartOption.xAxis[0].data=timeX
    },
    [types.SET_TEMP](state,{potential}){
        // 清空之前的数据
        state.temp=[]
        state.dfTemp=[]
        let temp=state.temp //温度
        let dfTemp=state.dfTemp //微分数值
        state.potential=potential
        potential.forEach(ele=>{
            // string转化为Number
            ele=parseFloat(ele)
            // 电势转化为温度
            ele=0.0659+24.9829*ele-0.0365*ele*ele
            ele=ele.toFixed(2)
            // string转化为Number
            ele=parseFloat(ele)
            temp.push(ele)
        })
        // 求微分
        for(let i = 0 ;i<temp.length;i++){
            let df=(temp[i+80]-temp[i])/1
            df=df.toFixed(2)
            df=parseFloat(df)
            dfTemp.push(df)
        }
        // 对微分进行滤波
        let avDfTemps=[]
        for(let i = 0;i<dfTemp.length;i++){
            if(i>=4){
                let avDfTemp=(dfTemp[i-4]+dfTemp[i-3]+dfTemp[i-2]+dfTemp[i-1]+dfTemp[i]+dfTemp[i+1]+dfTemp[i+2]+dfTemp[i+3]+dfTemp[i+4])/9
                avDfTemp=avDfTemp.toFixed(2)
                avDfTemp=parseFloat(avDfTemp)
                avDfTemps.push(avDfTemp)
            }
            else{
                switch (i) {
                    case 0:{
                    let avDfTemp=dfTemp[i]
                    avDfTemp=avDfTemp.toFixed(2)
                    avDfTemp=parseFloat(avDfTemp)
                    avDfTemps.push(avDfTemp)
                        break;
                    }
                    case 1:{
                    let avDfTemp=(dfTemp[i-1]+dfTemp[i]+dfTemp[i+1])/3
                    avDfTemp=avDfTemp.toFixed(2)
                    avDfTemp=parseFloat(avDfTemp)
                    avDfTemps.push(avDfTemp)
                        break;
                    }
                    case 2:{
                    let avDfTemp=(dfTemp[i-2]+dfTemp[i-1]+dfTemp[i]+dfTemp[i+1]+dfTemp[i+2])/5
                    avDfTemp=avDfTemp.toFixed(2)
                    avDfTemp=parseFloat(avDfTemp)
                    avDfTemps.push(avDfTemp)
                        break;
                    }
                    case 3:{
                    let avDfTemp=(dfTemp[i-3]+dfTemp[i-2]+dfTemp[i-1]+dfTemp[i]+dfTemp[i+1]+dfTemp[i+2]+dfTemp[i+3])/7
                    avDfTemp=avDfTemp.toFixed(2)
                    avDfTemp=parseFloat(avDfTemp)
                    avDfTemps.push(avDfTemp)
                            break;
                    }
                }
            }
            this.dfTemp=avDfTemps
        }
        // 增加legend
        let str1=`温度曲线${state.index}`
        let str2=`微分曲线${state.index}`
        state.chartOption.legend.data.push(str1)
        state.chartOption.legend.data.push(str2)
        // 温度数据显示至dbTable组件中
        let obj={
            name:str1,
            data:temp,
        }
        state.dataTable.push(obj)
        // Y轴数据
        let series1={
            type:'line',
            name:`${str1}`,
            data:[],
        }
        let series2={
            type:'line',
            name:`${str2}`,
            data:[],
            yAxisIndex:1,
        }
        state.chartOption.series.push(series1)
        state.chartOption.series.push(series2)
        state.chartOption.series[state.chartIndex-2].data=temp
        state.chartOption.series[state.chartIndex-1].data=dfTemp
        // 表示chartOption变化完成，便于getters识别
        state.changeIndex++
    },
    [types.CLEAR_DATA](state){
        state.chartOption.xAxis[0].data=[]
        state.chartOption.series=[]
        state.chartOption.legend.data=[]
        state.chartIndex=0
        state.index=0
        state.dataTable=[]
        state.changeIndex++
    }
}

let getters={
    getChange:state=>state.changeIndex,
}

export default {
    state,
    mutations,
    getters,
}