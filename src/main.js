import Vue from 'vue'
import App from './App'

// 引入路由
import router from './router'

// 引入Vuex（全局狀態管理）
import store from './store'

// 引入element-ui
import './assets/plugins/element-ui'

// 引入vue-i18n
import i18n from './assets/plugins/i18n'

// 引入axios（ajax库）
import './assets/plugins/axios'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
