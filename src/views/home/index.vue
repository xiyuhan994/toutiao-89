<template>
  <div class="login">
    <el-card class="login-card">
      <el-form :model="loginForm" :rules='loginRules'>
        <!-- 图片 -->
        <img src="../../assets/img/logo_index.png" alt />
        <!-- 输入值 -->
        <el-form-item v-model="loginForm.moblie" prop='moblie'>
          <el-input class="input" :model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item v-model="loginForm.code" prop='code'>
          <el-input class="inputmiddle" v-model="input" placeholder="请输入内容"></el-input>
          <el-button class="buttonmiddle">发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item v-model="loginForm.logCheck" prop='logCheck'>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" class="loginbutton">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        logCheck: false
      },
      loginRules: {

      }
    }
  }
}

</script>

<style lang='less' scoped>
.login {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;

  .login-card {
    width: 400px;
    height: 350px;
  }

  .input {
    margin-top: 20px;
  }

  .inputmiddle {
    margin-top: 20px;
    width: 230px;
    float: left;
  }

  .buttonmiddle {
    margin-top: 20px;
    float: right;
  }

  .loginbutton {
    width: 300px;
  }
}
</style>
