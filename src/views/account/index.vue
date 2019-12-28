<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>

      <!-- 上传图片 -->
      <el-upload class="head" action='' :show-file-list='false'>
        <img src="../../assets/img/header.jpg" alt="">
      </el-upload>

      <!-- 表单 -->
      <el-form type='flex' label-width='100px'>
        <el-form-item label='用户名'>
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='简介'>
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='邮箱'>
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item disabled label='手机号'>
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存信息</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>

  .head {
     position: absolute;
      right: 400px;
      top: 150px;
    img {
      height: 200px;
      width: 200px;
      border-radius: 50%;

    }
  }

</style>
