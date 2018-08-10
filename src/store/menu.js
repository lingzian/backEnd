import { menuCollapse } from '../config'
import { getMenu } from '../assets/api'

export default {
  namespaced: true,
  state: {
    isCollapse: menuCollapse, // 是否水平折叠收起菜单
    pageMenu: {}, // 三级菜单
    mainMenu: [], // 一、二级主菜单
    menuBgColor: '#444', // 菜单背景颜色
    menuTextColor: '#fff' // 菜单字体颜色
  },
  mutations: {
    // 展开
    uncollapse (state) {
      state.isCollapse = false
    },
    // 收起
    collapse (state) {
      state.isCollapse = true
    }
  },
  actions: {
    // 获取菜单
    getMenu ({state}) {
      getMenu().then(res => {
        state.pageMenu = res.data.page_menu
        state.mainMenu = res.data.main_menu
      })
    }
  }
}
