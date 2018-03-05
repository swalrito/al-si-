<template>
  <div class="wrap">
      <result></result>
      <el-container>
          <!-- 顶部栏 -->
          <el-header>
              <top></top>
          </el-header>
        <el-container>
          <!-- 导航 -->
            <el-aside>
                <side></side>
            </el-aside>
            <!-- 主内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-container>
            <el-footer>
                <foot></foot>
            </el-footer>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import top from './header'
import side from './nav'
import foot from './footer'
import result from './result'
export default {
    components:{
        top,side,foot,result,
        }
}
</script>

<style>
.wrap{
    width: 1400px;
    overflow: scroll;
    margin: auto;
    border-left: 1px solid rgb(22, 134, 226);
    border-right: 1px solid rgb(22, 134, 226);
    border-bottom: 1px solid rgb(22, 134, 226);
}
.wrap .el-header{
    padding: 0;
}
</style>
