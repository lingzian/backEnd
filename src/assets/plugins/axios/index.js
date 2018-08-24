import Vue from 'vue'
import router from '../../../router'
import Axios from 'axios'
import qs from 'qs'
import { isProduction, cookie, messageTips } from '../../js/utils'
import { formatLanguage } from '../../js/format'
import { developmentAPI, productionAPI } from '../../../config'
import user from '../../../store/user'

const token = user.state.token

const languageLocale = localStorage.getItem('language')

const baseURL = isProduction ? productionAPI : developmentAPI

const axios = Axios.create({
  baseURL: baseURL,
  params: {
    accessToken: token,
    language: formatLanguage(languageLocale)
  }
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let method = config.method
    if (method !== 'get') {
      config.data = qs.stringify(config.data)
    }
    if (config.url.includes('accounts/login')) {
      delete config.params.accessToken
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (typeof response.data !== 'object') {
      return Promise.reject(new Error('Server exception'))
    }
    let code = parseInt(response.data.code)
    let message = response.data.message
    // token异常
    if (code === 1016) {
      cookie.del('token')
      router.replace({
        name: 'SignIn'
      })
    }
    if (code !== 1000) {
      messageTips(message, 'error')
      return Promise.reject(new Error(`${code}: ${message}`))
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

if (!Vue.prototype.axios) {
  Vue.prototype.axios = axios
}
export default axios
