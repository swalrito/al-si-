<template>
  <div class="chart">
      <!-- 曲线 -->
      <div class="tempChart" ref='tempChart'></div>
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
            'getChange','getDfChange'
        ])
    },
    watch:{
        // 更新dom
        getChange:function(){
            this.drawLine()
        },
        getDfChange:function(){
            this.drawLine()
        }
    },
    methods:{
        drawLine(){
            // 移除实例
            echarts.disconnect()
            // 基于准备好的dom，初始化echarts实例
            let tempChart=this.$refs.tempChart
            tempChart = echarts.init(tempChart)
            // 绘制图表
            tempChart.setOption(this.chartOption)
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
    height:720px;
}
</style>
