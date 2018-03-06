import * as types from '../mutation-types'

let state={
    // 温度曲线
    chartOption1:{
        title:{
            text:'温度曲线',
        },
        legend:{
            data:['温度'],
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
            name:'时间(ms)',
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
            }
        ],
        series:[{
            type:'line',
            name:'温度',
            data:[],
        }]
    },
    // 微分曲线
    chartOption2:{
        title:{
            text:'微分曲线',
        },
        legend:{
            data:['微分值'],
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
            name:'时间(ms)',
            axisLabel:{
                interval:3119,
            },
            axisTick:{
                interval:3119,
            },
        }],
        yAxis:[
            {
                name:'dT/dt',
                type:'value',
            }
        ],
        series:[{
            type:'line',
            name:'温度(t)',
            data:[],
        }]
    },
    // 电势数据
    potential:[],
    // 温度数据
    temp:[],
    // 微分数据
    dfTemp:[],
}

let mutations = {
    [types.READ_FILE](state,{potential}){
        state.potential=potential
    },
    [types.SET_XAXIS](state,{xAxis}){
        // 采集点总数
        let len = xAxis.length
        len=parseInt(len)
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
        state.chartOption1.xAxis[0].data=timeX
        state.chartOption2.xAxis[0].data=timeX
    },
    [types.SET_TEMP](state,{potential}){
        // 清空之前的数据
        state.temp=[]
        let temp=state.temp //温度
        state.potential=potential
        potential.forEach(ele=>{
            // 电势转化为温度
            ele=0.0659+24.9829*ele-0.0365*ele*ele
            ele=ele.toFixed(2)
            temp.push(ele)
        })
        state.chartOption1.series[0].data=temp
    }
}

let getters={
    getChange:state=>state.chartOption1.xAxis[0].data
}

export default {
    state,
    mutations,
    getters,
}