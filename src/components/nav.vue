<template>
  <div class="nav">
      <!-- 选择文件 -->
      <input type="file" class="fileEle">
      <el-button class="selectFile" type='primary' round icon="el-icon-upload">选择文件</el-button>
      <!-- 显示数据 -->
      <el-button class="showData" type="primary" round icon="el-icon-document" @click=goData()>显示数据</el-button>
      <!-- 查看微分曲线 -->
      <el-button class="showDfChart" type='primary' round icon="el-icon-tickets">微分曲线</el-button>
      <!-- 变质效果 -->
      <el-button class="showModifier" type="primary" round icon="el-icon-info" @click='showResult'>变质效果</el-button>
      
      <!-- 显示变质效果弹框 -->
      
  </div>
</template>

<script>
export default {
    data:function(){
        return {
            dialogFormVisible: false,
        }
    },
    methods:{
        goData(){
            this.$router.push('/data')
        },
        showResult(){
            let boolean = true
            this.$store.commit('TRIGGLE_DIALOG',boolean)
        }
    }
}
</script>

<style>
.nav{
    padding-top: 20px;
}
.nav .el-button{
    display: block;
    margin: 20px auto 20px auto;
}
.nav .fileEle{
    display: none;
}
</style>
