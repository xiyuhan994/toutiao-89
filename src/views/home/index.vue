<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside style=" background-color:#353b4e;height:100vh">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧边栏 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 内容部分 -->
      <el-main>内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 左边栏单独写一个组件
import layoutAside from '../../components/home/layout-aside'

// 右侧栏的头部
import layoutHeader from '../../components/home/layout-header'

export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>
</style>
