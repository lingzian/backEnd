import axios from '../plugins/axios'

/*
  地区列表
*/
export const getAreas = data => axios({
  url: 'areas',
  method: 'get',
  params: data || {}
})

/*
  获取地区
*/
export const getArea = id => axios({
  url: `areas/${id}`,
  method: 'get'
})

/*
  删除地区
*/
export const deleteArea = id => axios({
  url: `areas/${id}`,
  method: 'delete'
})

/*
  新增地区
*/
export const addArea = data => axios({
  url: 'areas',
  method: 'post',
  data: data
})

/*
  更新地区
*/
export const updateArea = (id, data) => axios({
  url: `areas/${id}`,
  method: 'put',
  data: data
})
