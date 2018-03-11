<template>
  <div class="dbTable">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/chart' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据显示</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="data">
        <div class="data-detail" v-for="item in data" :key="item.name">
            <p>{{item.name}}:</p>
            <p>{{item.data}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data:function(){
        return {

        }
    },
    computed:{
        ...mapState({
            data:state=>state.chart.dataTable
        })
    }
}
</script>

<style>
.dbTable .data{
    margin-top: 20px;
    text-align: left;
    overflow: scroll;
    border: 1px solid #000;
    width:800px;
    height: 500px;
}
</style>
