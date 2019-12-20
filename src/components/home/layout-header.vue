<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <!-- 左侧 -->
    <el-col :span="6" class="left">
      <i class="el-icon-s-unfold"></i>
      <span style="margin-left:5px;font-size:16px">江苏传智播客教育科技股份有限公司</span>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="4">
       <el-row class="layout-header" type="flex" align="middle" justify="end">
          <!-- 添加图片 -->
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt />

        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.name}}
          </span>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item command="info" >个人信息</el-dropdown-item>
            <el-dropdown-item command="git" >Git地址</el-dropdown-item>
            <el-dropdown-item command="exit" >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data: function () {
    return {
      // 创建一个空对象准备存放值
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  created () {
    //   获取令牌
    let token = window.localStorage.getItem('user-token')
    // 查询数据
    this.$axios({
      url: '/user/profile',
      //   请求参数
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      // 获取个人信息
      this.userInfo = res.data.data
    })
  },
  methods: {
    handleCommand (a) {
      if (a === 'exit') {
        //   清除用户的令牌
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (a === 'git') {
        window.location.href = 'https://github.com/xiyuhan994/toutiao-89/commits/master'
      }
    }
  }
}
</script>

<style>
.layout-header {
  height: 60px;
}
.el-icon-s-unfold {
  margin-left: 20px;
  font-size: 18px;
  margin-top: 25px;
}
img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 5px;
}
</style>
