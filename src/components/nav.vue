<template>
  <div class="nav">
      <!-- 选择文件 -->
      <input type="file" class="fileEle" ref='file' @change="readFile">
      <el-button class="selectFile" type='info' round icon="el-icon-upload" @click="selectFile">选择文件</el-button>
      <!-- 显示数据 -->
      <el-button class="showData" type="info" round icon="el-icon-document" @click="goData">显示数据</el-button>
      <!-- 变质效果 -->
      <el-button class="showModifier" type="info" round icon="el-icon-info" @click='showResult'>变质效果</el-button>
      
      <!-- 显示变质效果弹框 -->
      <el-button class="selectFile" type='info' round icon="el-icon-delete" @click="clearChart">清除数据</el-button>
      
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
        readFile(){
            // 选择 input dom元素选择的file
            let selectFile=this.$refs.file.files[0]
            // 新建一个fileReader类
            let file=new FileReader()
            // 以text的方式读取input选择的文件内容
            file.readAsText(selectFile)
            // 异步，当file读取完成后执行,并用变量vue指代this变量，方便onload函数使用
            let vue = this
            file.onload=function(){
                // 将读取的string以回车符号分割成每一行数据，并存为数组
                let data=file.result.split('\r')
                vue.getData(data)
            }
            
        },
        getData(data){
            let xAxis=[] //横坐标时间
            let potential = [] //电势
            data.forEach(ele=>{
                // 每行元素以tab符号分割
                let arr=ele.split('\t')
                // 取第二个元素作为x轴坐标
                xAxis.push(arr[1])
                // 取第三个元素，即电势
                potential.push(arr[2])
            })
            // 设置x轴
            this.$store.commit('SET_XAXIS',{xAxis})
            // 设置温度
            this.$store.commit('SET_TEMP',{potential})
        },
        selectFile(){
            // 选择input dom元素并触发click事件
            let input = this.$refs.file
            input.click()
        },
        goData(){
            this.$router.push('/data')
        },
        showResult(){
            let boolean = true
            this.$store.commit('TRIGGLE_DIALOG',boolean)
        },
        showDfData(){
            this.$store.commit('COMPUTE_DIFF')
        },
        clearChart(){
            this.$store.commit('CLEAR_DATA')
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
    margin-top: 20px;
    margin-left: 120px;
    margin-bottom: 20px;
}
.nav .fileEle{
    display: none;
}
</style>
