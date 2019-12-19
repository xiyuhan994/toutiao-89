<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 图片 -->
      <img src="../../assets/img/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" ref="myForm">
        <!-- 输入值 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" class="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input class="inputmiddle" v-model="loginForm.code" placeholder="请输入内容"></el-input>
          <el-button class="buttonmiddle">发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item prop="logCheck">
          <el-checkbox v-model="loginForm.logCheck">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button @click="sumbitLogin" type="primary" class="loginbutton">登录</el-button>
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
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请输入手机号' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ],
        // rule当前规则
        logCheck: [
          {
            validator: function (rule, value, callback) {
              // 用value来进行校验
              // 如果成功往下执行
              if (value) {
                callback()
              } else {
                // 校验不通过
                callback(new Error('请先同意'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 提交登陆
    sumbitLogin () {
      // el-form实例 validate方法 里有两个参数 1是否校验成功 未校验成功的字段
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          })
            .then(res => {
              console.log(res)
              // 把令牌存起来
              window.localStorage.setItem('user-token', res.data.data.token)
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
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
