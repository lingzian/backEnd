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
  登出
*/
export const logout = () => axios({
  url: 'accounts/logout',
  method: 'post'
})
