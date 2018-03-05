<template>
  <div class="chart">
      <!-- 温度曲线 -->
      <div class="tempChart" ref='tempChart'></div>
      <!-- 微分曲线 -->
      <div class="dfChart" ref="dfChart"></div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import echarts from 'echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
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
            chartOption1:state=>state.chart.chartOption1,
            chartOption2:state=>state.chart.chartOption2,
        }),
        ...mapGetters([
            'getChange'
        ])
    },
    watch:{
        // 更新dom
        getChange:function(){
            this.drawLine()
        }
    },
    methods:{
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let tempChart=this.$refs.tempChart
            let dfChart=this.$refs.dfChart
            tempChart = echarts.init(tempChart)
            dfChart = echarts.init(dfChart)
            // 绘制图表
            tempChart.setOption(this.chartOption1)
            dfChart.setOption(this.chartOption2)
        }
    },
    mounted(){
        this.drawLine()
    },
}
</script>

<style>
.chart .tempChart,
.chart .dfChart{
    width: 1000px;
    height:400px;
}
</style>
