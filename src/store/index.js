import Vue from 'vue'
import Vuex from 'vuex'

import menu from './menu'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    menu: menu,
    user: user
  }
})

export default store
