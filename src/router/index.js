import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { cookie } from '../assets/js/utils'
Vue.use(Router)

const router = new Router({
  routes: routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let token = cookie.get('token')
  if (!token && to.name !== 'SignIn') {
    next({
      name: 'SignIn',
      replace: true
    })
  }
  if (to.name === null || (to.name !== 'Index' && !to.path.includes(to.name))) {
    next({
      name: 'Error',
      replace: true
    })
  } else {
    next()
  }
})

export default router
