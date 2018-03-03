<template>
  <div class="result">
      <el-dialog title="变质效果" :visible.sync="dialog">
        <div>
            <p>过冷度：</p>
            <p>变质效果：</p>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hiddenDialog()">取 消</el-button>
            <el-button type="primary" @click="hiddenDialog">确 定</el-button>
        </div>
    </el-dialog>
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
            dialog:state=> state.result.dialogShow
        })
    },
    methods:{
        hiddenDialog(){
            this.$store.commit('TRIGGLE_DIALOG',false)
        }
    }
}
</script>

<style>

</style>
