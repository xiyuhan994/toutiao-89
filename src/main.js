import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 引入初始化
import './styles/index.less'

// 引入axios
import axios from 'axios'

Vue.config.productionTip = false

// 注册事件
Vue.use(ElementUI)
// 赋值默认的黑马头条的地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 赋值给全局属性
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')