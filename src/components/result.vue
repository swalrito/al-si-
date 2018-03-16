<template>
  <div class="result">
      <el-dialog title="变质效果" :visible.sync="dialog">
        <div v-for="item in result" :key="item.gjTemp">
            <p>{{item.name1}},{{item.name2}} 特征值：</p>
            <p>未变质最低初晶温度:<span class="item">{{item.cjTempMin1}}</span>，变质最低初晶温度:<span class="item">{{item.cjTempMin2}}</span></p>
            <p>未变质初晶生长温度:<span class="item">{{item.cjTempMax1}}</span>，变质初晶生长温度:<span class="item">{{item.cjTempMax2}}</span></p>
            <p>未变质初晶再辉温升:<span class="item">{{item.cjTemp1}}</span>，变质初晶再辉温升:<span class="item">{{item.cjTemp2}}</span></p>
            <p>未变质共晶温度:<span class="item">{{item.gjTemp1}}</span>，变质共晶温度:<span class="item">{{item.gjTemp2}}</span></p>
            <p>未变质最低共晶温度:<span class="item">{{item.tempMin1}}</span>，变质最低共晶温度:<span class="item">{{item.tempMin2}}</span></p>
            <!-- <p>未变质共晶时间:<span class="item">{{item.gjTime1}}</span>，变质共晶时间:<span class="item">{{item.gjTime2}}</span></p> -->
            <p>未变质共晶再辉温升:<span class="item">{{item.zhTemp1}}</span>，变质共晶再辉温升:<span class="item">{{item.zhTemp2}}</span></p>
            <p>共晶温度差:<span class="item">{{item.gld}}</span></p>
            <p>变质效果:<span class="item">{{item.result}}</span></p>
            <p>---------------------------------------</p>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hiddenDialog()">取 消</el-button>
            <el-button type="primary" @click="hiddenDialog">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
    data:function(){
        return {
            result:[],
            cjTempMin1:'',//初晶最低温度
            cjTempMax1:'',//初晶最高温度
            cjTempMin2:'',//初晶最低温度
            cjTempMax2:'',//初晶最高温度
            gjTempMin1:'',//共晶最低温度
            gjTempMax1:'',//共晶温度
            gjTempMin2:'',//共晶最低温度
            gjTempMax2:'',//共晶温度
            gjBegin1:'',//共晶开始时间
            gjBegin2:'',//共晶开始时间
            gjFinish1:'',//共晶结束时间
            gjFinish2:'',//共晶结束时间
        }
    },
    computed:{
        ...mapState({
            dialog:state=> state.result.dialogShow,
            dataDB:state=>state.chart.dataTable
        }),
        ...mapGetters([
            'getChange',
        ])
    },
    watch:{
        getChange(){
            this.pushResult()
        }
    },
    methods:{
        getDfTemp(arr){
            let dfTemp=[]
            // 求微分
            for(let i = 0 ;i<arr.length;i++){
                let df=(arr[i+80]-arr[i])/1
                df=df.toFixed(2)
                df=parseFloat(df)
                dfTemp.push(df)
            }
            // 对微分进行滤波
            let avDfTemps=[]
            for(let i = 0;i<arr.length;i++){
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
            }
            return avDfTemps
        },
        hiddenDialog(){
            this.$store.commit('TRIGGLE_DIALOG',false)
        },
        pushResult(){
            this.result=[]
            this.cjTempMin1=0
            this.cjTempMax1=0
            this.cjTempMin2=0
            this.cjTempMax2=0
            this.gjTempMin1=0
            this.gjTempMax1=0
            this.gjTempMin2=0
            this.gjTempMax2=0
            this.gjBegin1=0
            this.gjBegin2=0
            this.gjFinish1=0
            this.gjFinish2=0
            let len = Math.floor(this.dataDB.length/2)
            for(let i = 0 ; i <len;i++){
                let obj = {}
                // 曲线名称
                obj.name1=this.dataDB[2*i].name
                obj.name2=this.dataDB[2*i+1].name
                
                // 温度数据
                let data1=this.dataDB[2*i].data
                let data2=this.dataDB[2*i+1].data

                // 求微分
                obj.dfTemp1=this.getDfTemp(this.dataDB[2*i].data)
                obj.dfTemp2=this.getDfTemp(this.dataDB[2*i+1].data)
                
                // 以曲线温度开始降低的第一个点作为起始点，方便后面计算
                let initIndex1=0
                for(let i = 0 ;i<3600;i++){
                    if(obj.dfTemp1[i]<0){
                        initIndex1=i
                        break
                    }
                }
                let initIndex2=0
                for(let i = 0 ;i<3600;i++){
                    if(obj.dfTemp2[i]<0){
                        initIndex2=i
                        break
                    }
                }
                // 初晶最低温度
                // 以45秒为界限，即，第3600个点，初晶平台出现在45秒之前
                let cjbreak1,cjbreak2
                for(let i = initIndex1;i<3600;i++){
                    if(obj.dfTemp1[i]>=0&&obj.dfTemp1[i+1]>=0&&obj.dfTemp1[i+2]>=0&&obj.dfTemp1[i+3]>=0){
                        this.cjTempMin1=data1[i]
                        cjbreak1=i
                        console.log('初晶最低温度1：'+this.cjTempMin1)
                        break
                    }
                }
                for(let i = initIndex2;i<3600;i++){
                    if(obj.dfTemp2[i]>=0&&obj.dfTemp2[i+1]>=0&&obj.dfTemp2[i+2]>=0&&obj.dfTemp2[i+3]>=0){
                        this.cjTempMin2=data2[i]
                        cjbreak2=i
                        console.log('初晶最低温度2：'+this.cjTempMin2)
                        break
                    }
                }
                obj.cjTempMin1=this.cjTempMin1
                obj.cjTempMin2=this.cjTempMin2
                //  初晶生长温度
                for(let i = cjbreak1;i<3600;i++){
                    if(obj.dfTemp1[i]<=0&&obj.dfTemp1[i+1]<=0&&obj.dfTemp1[i+2]<=0&&obj.dfTemp1[i+3]<=0&&obj.dfTemp1[i+4]<=0&&obj.dfTemp1[i+5]<=0&&obj.dfTemp1[i+6]<=0&&obj.dfTemp1[i+7]<=0&&obj.dfTemp1[i+8]<=0&&obj.dfTemp1[i+9]<=0){
                        this.cjTempMax1=data1[i]
                        console.log('初晶生长温度1：'+this.cjTempMax1)
                        break
                    }
                }
                for(let i = cjbreak2;i<3600;i++){
                    if(obj.dfTemp2[i]<=0&&obj.dfTemp2[i+1]<=0&&obj.dfTemp2[i+2]<=0&&obj.dfTemp2[i+3]<=0&&obj.dfTemp2[i+4]<=0&&obj.dfTemp2[i+5]<=0&&obj.dfTemp2[i+6]<=0&&obj.dfTemp2[i+7]<=0&&obj.dfTemp2[i+8]<=0&&obj.dfTemp2[i+9]<=0){
                        this.cjTempMax2=data2[i]
                        console.log('初晶生长温度2：'+this.cjTempMax2)
                        break
                    }
                }
                obj.cjTempMax1=this.cjTempMax1
                obj.cjTempMax2=this.cjTempMax2

                // 初晶温升
                obj.cjTemp1=this.cjTempMax1-this.cjTempMin1
                obj.cjTemp2=this.cjTempMax2-this.cjTempMin2
                obj.cjTemp1=Math.abs(obj.cjTemp1)
                obj.cjTemp2=Math.abs(obj.cjTemp2)
                obj.cjTemp1=obj.cjTemp1.toFixed(2)
                obj.cjTemp2=obj.cjTemp2.toFixed(2)

                // 共晶最低温度
                // 以45秒为界限，即，第3600个点，共晶平台出现在45秒之后
                // 拐点区域
                let break1,break2
                for(let i = 3600;i<obj.dfTemp1.length;i++){
                    if(obj.dfTemp1[i]>=0&&obj.dfTemp1[i+1]>=0&&obj.dfTemp1[i+2]>=0&&obj.dfTemp1[i+3]>=0&&obj.dfTemp1[i+4]>=0&&obj.dfTemp1[i+5]>=0&&obj.dfTemp1[i+6]>=0){
                        break1=i
                        this.gjTempMin1=data1[i]
                        console.log('共晶生长温度1：'+this.gjTempMin1)
                        break
                    }
                }
                for(let i = 3600;i<obj.dfTemp2.length;i++){
                    if(obj.dfTemp2[i]>=0&&obj.dfTemp2[i+1]>=0&&obj.dfTemp2[i+2]>=0&&obj.dfTemp2[i+3]>=0&&obj.dfTemp2[i+4]>=0&&obj.dfTemp2[i+5]>=0&&obj.dfTemp2[i+6]>=0){
                        this.gjTempMin2=data2[i]
                        this.gjBegin1=i*0.0125
                        console.log('共晶生长温度1：'+this.gjTempMin2)
                        break2=i
                        break
                    }
                }
                obj.tempMin1=this.gjTempMin1
                obj.tempMin2=this.gjTempMin2
                // 共晶温度
                for(let i = break1;i<obj.dfTemp1.length;i++){
                    if(obj.dfTemp1[i]<=0&&obj.dfTemp1[i+2]<=0&&obj.dfTemp1[i+3]<=0&&obj.dfTemp1[i+4]<=0&&obj.dfTemp1[i+5]<=0&&obj.dfTemp1[i+6]<=0&&obj.dfTemp1[i+7]<=0&&obj.dfTemp1[i+8]<=0&&obj.dfTemp1[i+9]<=0){
                        this.gjTempMax1=data1[i]
                        this.gjBegin2=i*0.0125
                        console.log('共晶温度1：'+this.gjTempMax1)
                        break
                    }
                }
                for(let i = break2;i<obj.dfTemp2.length;i++){
                    if(obj.dfTemp2[i]<=0&&obj.dfTemp2[i+2]<=0&&obj.dfTemp2[i+3]<=0&&obj.dfTemp2[i+4]<=0&&obj.dfTemp2[i+5]<=0&&obj.dfTemp2[i+6]<=0&&obj.dfTemp2[i+7]<=0&&obj.dfTemp2[i+8]<=0&&obj.dfTemp2[i+9]<=0){
                        this.gjTempMax2=data2[i]
                        console.log('共晶温度2：'+this.gjTempMax2)
                        break
                    }
                }
                obj.gjTemp1=this.gjTempMax1
                obj.gjTemp2=this.gjTempMax2
                // 再辉温度温升
                obj.zhTemp1=this.gjTempMax1-this.gjTempMin1
                obj.zhTemp2=this.gjTempMax2-this.gjTempMin2
                obj.zhTemp1=Math.abs(obj.zhTemp1)
                obj.zhTemp2=Math.abs(obj.zhTemp2)
                obj.zhTemp1=obj.zhTemp1.toFixed(2)
                obj.zhTemp2=obj.zhTemp2.toFixed(2)

                // // 选择200S以后的点，进行共晶平台结束的拐点
                // for(let i = 16000;i<obj.dfTemp1.length;i++){
                //     if(obj.dfTemp1[i]<=0&&obj.dfTemp1[i+2]<=0&&obj.dfTemp1[i+3]<=0&&obj.dfTemp1[i+4]<=0&&obj.dfTemp1[i+5]<=0&&obj.dfTemp1[i+6]<=0&&obj.dfTemp1[i+7]<=0&&obj.dfTemp1[i+8]<=0&&obj.dfTemp1[i+9]<=0&&obj.dfTemp1[i+10]<=0&&obj.dfTemp1[i+11]<=0&&obj.dfTemp1[i+12]<=0&&obj.dfTemp1[i+13]<=0&&obj.dfTemp1[i+14]<=0&&obj.dfTemp1[i+15]<=0&&obj.dfTemp1[i+16]<=0&&obj.dfTemp1[i+17]<=0&&obj.dfTemp1[i+18]<=0&&obj.dfTemp1[i+19]<=0&&obj.dfTemp1[i+20]<=0){
                //         this.gjFinish1=i*0.0125
                //         console.log('共晶结束时间1：'+this.gjFinish1)
                //         break
                //     }
                // }
                // for(let i = 16000;i<obj.dfTemp2.length;i++){
                //     if(obj.dfTemp2[i]<=0&&obj.dfTemp2[i+2]<=0&&obj.dfTemp2[i+3]<=0&&obj.dfTemp2[i+4]<=0&&obj.dfTemp2[i+5]<=0&&obj.dfTemp2[i+6]<=0&&obj.dfTemp2[i+7]<=0&&obj.dfTemp2[i+8]<=0&&obj.dfTemp2[i+9]<=0&&obj.dfTemp2[i+10]<=0&&obj.dfTemp2[i+11]<=0&&obj.dfTemp2[i+12]<=0&&obj.dfTemp2[i+13]<=0&&obj.dfTemp2[i+14]<=0&&obj.dfTemp2[i+15]<=0&&obj.dfTemp2[i+16]<=0&&obj.dfTemp2[i+17]<=0&&obj.dfTemp2[i+18]<=0&&obj.dfTemp2[i+19]<=0&&obj.dfTemp2[i+20]<=0){
                //         this.gjFinish2=i*0.0125
                //         console.log('共晶结束时间2：'+this.gjFinish2)
                //         break
                //     }
                // }
                // obj.gjTime1=this.gjFinish1-this.gjBegin1
                // obj.gjTime2=this.gjFinish2-this.gjBegin2
                // obj.gjTime1=obj.gjTime1.toFixed(2)
                // obj.gjTime2=obj.gjTime2.toFixed(2)

                // 共晶温度差
                obj.gld=obj.gjTemp2-obj.gjTemp1
                obj.gld=Math.abs(obj.gld)
                obj.gld=obj.gld.toFixed(2)
                // 变质效果
                if(obj.gld<4){
                    obj.result='变质不足'
                }
                else if(obj.gld>=4&&obj.gld<=7){
                    obj.result='变质中等'
                }
                else if(obj.gld>7){
                    obj.result='变质良好'
                }

                this.result.push(obj)
            }

        }
    }
}
</script>

<style>
.item{
    color: red;
}
</style>
