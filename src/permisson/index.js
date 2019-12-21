// 导入
import router from '../router'

// 全局前置守卫 每一个路由发生改变之前 触发这个事件
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
