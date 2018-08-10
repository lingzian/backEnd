import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { isProduction, cookie, messageTips } from '../../js/utils'
import { formatLanguage } from '../../js/format'
import { developmentAPI, productionAPI } from '../../../config'

const token = cookie.get('token')

const languageLocale = cookie.get('language')

const baseURL = isProduction ? productionAPI : developmentAPI

const publicAxios = axios.create({
  baseURL: baseURL,
  params: {
    'access-token': token,
    'language': formatLanguage(languageLocale)
  }
})

// 请求拦截器
publicAxios.interceptors.request.use(config => {
  let method = config.method
  if (method !== 'get') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
publicAxios.interceptors.response.use(response => {
  let code = parseInt(response.data.code)
  let message = response.data.message
  if (code !== 1000) {
    messageTips(message, 'error')
    return Promise.reject(new Error(`${code}: ${message}`))
  } else {
    return response.data
  }
}, error => {
  return Promise.reject(error)
})

if (!Vue.prototype.axios) {
  Vue.prototype.axios = publicAxios
}

export default publicAxios
