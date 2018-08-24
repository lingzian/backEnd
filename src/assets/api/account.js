import axios from '../plugins/axios'

/*
  获取账号列表
*/
export const getAccounts = data => axios({
  url: 'accounts',
  method: 'get',
  params: data || {}
})

/*
  新增账号
*/
export const addAccount = data => axios({
  url: 'accounts',
  method: 'post',
  data: data
})

/*
  删除账号
*/
export const deleteAccount = id => axios({
  url: `accounts/${id}`,
  method: 'delete'
})

/*
  更新账号
*/
export const updateAccount = (id, data) => axios({
  url: `accounts/${id}`,
  method: 'put',
  data: data
})

/*
  获取账号
*/
export const getAccount = id => axios({
  url: `accounts/${id}`,
  method: 'get'
})
