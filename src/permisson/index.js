// 导入
import router from '../router'
// 进度条
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫 每一个路由发生改变之前 触发这个事件
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
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
// 加载完成时关闭
router.afterEach(function () {
  // 关闭进度条
  setTimeout(() => progress.done(), 500)
})
