/*
  vue 全局注册的组件
*/
import Vue from 'vue'
import breadCrumb from './common/breadcrumb'
import pagination from './common/pagination'

/*
  面包屑
*/
Vue.component('breadCrumb', breadCrumb)

/*
  列表页 分页选择器
*/
Vue.component('pagination', pagination)
