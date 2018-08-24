import axios from '../plugins/axios'

/*
  菜系列表
*/
export const getCuisines = data => axios({
  url: 'cuisines',
  method: 'get',
  params: data || {}
})

/*
  新增菜系
*/
export const addCuisine = data => axios({
  url: 'cuisines',
  method: 'post',
  data: data
})

/*
  删除菜系
*/
export const deleteCuisine = id => axios({
  url: `cuisines/${id}`,
  method: 'delete'
})

/*
  更新菜系
*/
export const updateCuisine = (id, data) => axios({
  url: `cuisines/${id}`,
  method: 'put',
  data: data
})

/*
  获取菜系
*/
export const getCuisine = id => axios({
  url: `cuisines/${id}`,
  method: 'get'
})
