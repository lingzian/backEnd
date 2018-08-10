import axios from '../plugins/axios'

/*
  登录
*/
export const signIn = data => axios({
  url: 'accounts/login',
  method: 'post',
  data: data
})

/*
  获取菜单
*/
export const getMenu = () => axios({
  url: 'account-items',
  method: 'get'
})

/*
  角色列表
*/
export const getRoles = () => axios({
  url: 'roles',
  method: 'get'
})
