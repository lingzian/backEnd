import { menuCollapse, menuBgColor, menuTextColor } from '../config'
import { getRoleMenus } from '../assets/api/role'
import menuIcon from '../config/menu.icon.js'

export default {
  namespaced: true,
  state: {
    isCollapse: menuCollapse, // 是否水平折叠收起菜单
    pageMenu: {}, // 三级菜单
    mainMenu: [], // 一、二级主菜单
    menuBgColor: menuBgColor, // 菜单背景颜色
    menuTextColor: menuTextColor, // 菜单字体颜色
    path: [] // 用于页面面包屑显示
  },
  mutations: {
    // 展开
    uncollapse (state) {
      state.isCollapse = false
    },
    // 收起
    collapse (state) {
      state.isCollapse = true
    },
    // 面包屑路径
    setPath (state, path) {
      state.path = path
    }
  },
  actions: {
    // 获取菜单
    getMenus ({ state }) {
      getRoleMenus().then(res => {
        res.data.main_menu.forEach(ele => {
          ele.icon = menuIcon[ele.name]
        })
        console.log(res.data)
        state.mainMenu = res.data.main_menu
        state.pageMenu = res.data.page_menu
      })
    }
  }
}
