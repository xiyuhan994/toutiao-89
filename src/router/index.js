import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
// 引入登陆页面
import Login from '../views/login'

// 引入二级容器
import Home2 from '../views/home/home'

Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }]
  },

  {
    // 登陆
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
