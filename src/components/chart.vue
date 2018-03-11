<template>
  <div class="chart">
      <!-- 曲线 -->
      <div class="myChart" ref='myChart'></div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import echarts from 'echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
export default {
    data:function(){
        return {
            
        }
    },
    computed:{
        ...mapState({
            xAxis:state=>state.chart.xAxis,
            chartOption:state=>state.chart.chartOption,
        }),
        ...mapGetters([
            'getChange',
        ])
    },
    watch:{
        // 更新dom
        getChange:{
            handler:function(){
            let newOption=this.chartOption
            let myChart = echarts.getInstanceByDom(this.$refs.myChart)
            let noMerge=true
            myChart.setOption(newOption,noMerge)
        },
        deep:true,
        },
    },
    methods:{
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart=this.$refs.myChart
            myChart = echarts.init(myChart)
            // 绘制图表
            myChart.setOption(this.chartOption)
        }
    },
    mounted(){
        this.drawLine()
    },
}
</script>

<style>
.chart .myChart,
.chart .dfChart{
    width: 1000px;
    height:720px;
}
</style>
