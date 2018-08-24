import axios from '../plugins/axios'

export const getMenus = data => axios({
  url: 'menus',
  method: 'get',
  params: data || {}
})

export const updateMenus = (id, data) => axios({
  url: `menus/${id}`,
  methods: 'put',
  data: data
})

export const DetailMenus = id => axios({
  url: `menus/${id}`,
  methods: 'get'
})

export const addMenus = data => axios({
  url: `menus`,
  methods: 'post',
  data: data
})

export const deleteMenus = data => axios({
  url: `menus`,
  methods: 'post',
  data: data
})
