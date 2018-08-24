import axios from '../plugins/axios'

/*
  获取角色列表
*/
export const getRoles = data => axios({
  url: 'roles',
  method: 'get',
  params: data || {}
})

/*
  新增角色
*/
export const addRole = data => axios({
  url: 'roles',
  method: 'post',
  data: data
})

/*
  删除角色
*/
export const deleteRole = id => axios({
  url: `roles/${id}`,
  method: 'delete'
})

/*
  获取角色
*/
export const getRole = id => axios({
  url: `roles/${id}`,
  method: 'get'
})

/*
  更新角色
*/
export const updateRole = (id, data) => axios({
  url: `roles/${id}`,
  method: 'put',
  data: data
})

/*
  获取角色菜单
*/
export const getRoleMenus = () => axios({
  url: 'account-items',
  method: 'get'
})
