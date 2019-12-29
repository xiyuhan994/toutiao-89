<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside :style="{width:collaspse? '60px':'230px'}" style=" backgroundColor:#323745;min-height:100vh">
      <layout-aside :collapse='collaspse'></layout-aside>
    </el-aside>
    <!-- 右侧边栏 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 内容部分 -->
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../util/eventBus'

export default {
  data () {
    return {
      // 是否折叠
      collaspse: false
    }
  },
  created () {
    eventBus.$on('changecoll', () => {
      this.collaspse = !this.collaspse
    })
  }
}
</script>

<style>
</style>
