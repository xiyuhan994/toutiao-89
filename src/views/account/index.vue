<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>

      <!-- 上传图片 -->
      <el-upload class="head" action='' :show-file-list='false'>
        <img :src="formData.photo ? formData.photo : defaultImg " alt="">
      </el-upload>

      <!-- 表单 -->
      <el-form type='flex' label-width='100px'>
        <el-form-item label='用户名'>
          <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='简介'>
          <el-input v-model="formData.intro" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='邮箱'>
          <el-input v-model="formData.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item  disabled label='手机号'>
          <el-input  v-model="formData.mobile" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存信息</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  methods: {

    // 获取用户信息
    getUserinfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserinfo()
  }
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
