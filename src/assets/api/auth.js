import axios from '../plugins/axios'

/*
  权限列表
*/
export const getAuths = () => axios({
  url: 'items',
  method: 'get'
})
