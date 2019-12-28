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
    children: [
      {
        path: '',
        component: Home2
      },
      {
        // 二级路由可以写相对地址 // 引入评论列表二级容器
        path: 'comment',
        component: () => import('../views/comment')
      },
      // 引入素材管理二级容器
      {
        path: 'material',
        component: () => import('../views/material')
      },
      // 引入内容列表二级容器
      {
        path: 'articles',
        component: () => import('../views/articles')
      },
      // 发布文章
      {
        path: 'publish',
        component: () => import('../views/publish')
      },
      // 修改文章
      {
        path: 'publish/:articleId',
        component: () => import('../views/publish')
      },
      // 账号信息
      {
        path: 'account',
        component: () => import('../views/account')
      }
    ]
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
