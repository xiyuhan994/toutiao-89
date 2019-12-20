// 左边栏单独写一个组件
import layoutAside from '../components/home/layout-aside'

// 右侧栏的头部
import layoutHeader from '../components/home/layout-header'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
