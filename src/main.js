import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 引入初始化
import './styles/index.less'

// 引入自己封装的axios
import axios from '../src/util/request'

// 引入组件
import component from './components/index'

// 引入守卫
import './permisson/index'

Vue.config.productionTip = false

// 注册全局组件
Vue.use(component)

// 注册事件
Vue.use(ElementUI)

// 赋值给全局属性
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
