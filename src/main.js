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

// 引入过滤器
import './assets/js/filter'

// 全局注册组件
import './components'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
