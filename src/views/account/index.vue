<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>

      <!-- 上传图片 -->
      <el-upload :http-request='uploadImg' class="head" action='' :show-file-list='false'>
        <img :src="formData.photo ? formData.photo : defaultImg " alt="">
      </el-upload>

      <!-- 表单 -->
      <el-form ref="myForm" :model='formData' :rules='rules' type='flex' label-width='100px'>
        <el-form-item label='用户名' prop='name'>
          <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='简介' prop='intro'>
          <el-input v-model="formData.intro" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='邮箱' prop='email'>
          <el-input v-model="formData.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item  disabled label='手机号'>
          <el-input disabled  v-model="formData.mobile" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">保存信息</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
// 引入公共事件
import eventBus from '../../util/eventBus'

export default {
  data () {
    return {
      loading: false,
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      // 校验规则
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名长度为1-7'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /(\S)+[@]{1}(\S)+[.]{1}(\w)+/,
          message: '邮箱格式不正确'
        }]
      },
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  methods: {

    // 上传图片
    uploadImg (params) {
      this.loading = true
      // 实例化对象
      let data = new FormData()
      // 加入参数
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        // 设置头像地址
        this.formData.photo = res.data.photo
        // 触发事件
        eventBus.$emit('getUserInfo')
        this.loading = false // 关闭弹层
      })
    },

    // 修改信息
    updateUserInfo () {
      // 校验表单数据是否OK
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          console.log(1)

          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(res => {
            // 保存成功
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
            eventBus.$emit('getUserInfo')
          })
        }
      })
    },
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
