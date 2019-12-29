<template>
  <div>
    <div class="img">
      <img :src="collapse?defaultImgSmall:defaultImg" alt />
    </div>

    <el-menu
      router
      background-color="#323745"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      style="border-right:none"
      :collapse="collapse"
      :style="{width:collapse? '60px':'230px;'}"
    >
      <!-- 一级路由 -->
      <el-menu-item style="margin-top:20px" index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>

      <!-- 二级路由 -->

      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>

        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>

      </el-submenu>

      <!-- 二级路由 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslife">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>

      <!-- 一级路由 -->
      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import eventBus from '../../util/eventBus'
export default {
  props: ['collapse'],
  data () {
    return {
      defaultImg: require('../../assets/img/logo_admin.png'),
      defaultImgSmall: require('../../assets/img/toutiao.png')
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.img {
  background-color: #2e2f32;
  text-align: center;
  padding: 10px 0;
  height: 60px;
  img {
   height: 40px;
  }
}

.title {
  padding: 20px 0;
}
</style>
