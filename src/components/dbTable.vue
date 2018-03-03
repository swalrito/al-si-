<template>
  <div class="dbTable">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/chart' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据显示</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="data">
        2017/5/10	22:17:03	15.2686768	mV
2017/5/10	22:17:03	15.3502197	mV
2017/5/10	22:17:03	15.4410400	mV
2017/5/10	22:17:03	15.5227051	mV
2017/5/10	22:17:03	15.6090088	mV
2017/5/10	22:17:03	15.6939697	mV
2017/5/10	22:17:03	15.7727051	mV
2017/5/10	22:17:03	15.8637695	mV
2017/5/10	22:17:03	15.9434814	mV
2017/5/10	22:17:03	16.0242920	mV
2017/5/10	22:17:03	16.1140137	mV
2017/5/10	22:17:04	16.1906738	mV
2017/5/10	22:17:04	16.2711182	mV
    </div>
  </div>
</template>

<script>
export default {
    data:function(){
        return {

        }
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
