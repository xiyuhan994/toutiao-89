// 负责对axios处理
import axios from 'axios'

// 单独引用
import { Message } from 'element-ui'

// 引入路由
import router from '../router'

// 赋值默认的黑马头条的地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截
axios.interceptors.request.use(function (config) {
  // config是要发送请求的配置信息
  // 获取token
  let token = window.localStorage.getItem('user-token')
  // 统一注入token
  config.headers.Authorization = `Bearer ${token}`
  // 返回config就会作为新的请求选项去进行请求
  return config
},
function () {

})

// 相应拦截
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '账号或者发送码错误'
      break
    case 403:
      // 强制回登陆 强制跳转登录页
      router.push('/login')
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // token过期
      router.push('/login')
      break
    case 404:
      message = 's手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message: message })
})
export default axios
