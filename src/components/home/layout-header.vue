<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <!-- 左侧 -->
    <el-col :span="6" class="left">
      <i  @click="changeCollapse"  :class="{'el-icon-s-unfold':collapse,' el-icon-s-fold':!collapse}"></i>
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
// 引入公共事件
import eventBus from '../../util/eventBus'

export default {
  data: function () {
    return {
      // 折叠状态
      collapse: false,
      // 创建一个空对象准备存放值
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  created () {
    // 更新数据
    this.getCount()
    eventBus.$on('getUserInfo', () => {
      this.getCount()
    })
  },
  methods: {
    // 折叠状态
    changeCollapse () {
      // 折叠取反
      this.collapse = !this.collapse
      // 通知要改变宽度的组件
      eventBus.$emit('changecoll')
    },

    // 查询数据
    getCount () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
      // 获取个人信息
        this.userInfo = res.data
      })
    },

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

<style scoped>
.layout-header {
  height: 60px;
}
.el-icon-s-unfold {
  margin-left: 20px;
  font-size: 23px;
  /* margin-top: 25px; */
}

.el-icon-s-fold {
  margin-left: 20px;
  font-size: 23px;
  /* margin-top: 25px; */
}
img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 5px;
}
</style>
