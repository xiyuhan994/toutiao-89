// 左边栏单独写一个组件
import layoutAside from '../components/home/layout-aside'

// 右侧栏的头部
import layoutHeader from '../components/home/layout-header'

// 面包屑
import breadCrumb from './commond/bread-crumd'

// 引入quill组件
import { quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)// 全局注册富文本编辑器
  }
}
