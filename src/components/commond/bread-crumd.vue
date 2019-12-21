<template>
    <el-breadcrumb >
      <el-breadcrumb-item to='/home'>首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- 具名插槽 -->
        <slot name="title">评论列表</slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
