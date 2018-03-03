<template>
  <div class="chart">
      <!-- 温度曲线 -->
      <e-charts :options='chartOption1' :initOptions='initOption'></e-charts>
      <!-- 微分曲线 -->
      <e-charts :options='chartOption2' :initOptions='initOption'></e-charts>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
export default {
    data:function(){
        return {
            initOption:{
                width:1000,
                height:400,
            },
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
                    data:[],
                    type:'value',
                    name:'时间(s)',
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
                    data:[],
                    type:'value',
                    name:'时间(s)',
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
            }
        }
    },
    components:{
        ECharts,
    }
}
</script>

<style>

</style>
