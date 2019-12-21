// 左边栏单独写一个组件
import layoutAside from '../components/home/layout-aside'

// 右侧栏的头部
import layoutHeader from '../components/home/layout-header'

// 面包屑
import breadCrumb from './commond/bread-crumd'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
