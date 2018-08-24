import axios from '../assets/plugins/axios'
import { getAccount } from '../assets/api/account'
import { signIn, logout } from '../assets/api/user'
import { cookie, createUUID, getOperatingSystem } from '../assets/js/utils'
import { formatSystem } from '../assets/js/format'
import md5 from 'js-md5'

// 浏览器辨识
let browserUUID = localStorage.getItem('browserUUID')
if (!browserUUID) {
  browserUUID = createUUID()
  localStorage.setItem('browserUUID', browserUUID)
}
// 用户信息
let user = localStorage.getItem('user')
user = user ? JSON.parse(user) : {}

export default {
  namespaced: true,
  state: {
    user: user,
    token: cookie.get('token') || '',
    browserUUID: browserUUID
  },
  actions: {
    getAccount ({state}, id) {
      getAccount(id).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.account))
        state.user = res.data.account
      })
    },
    signIn ({state, dispatch}, signInfo) {
      return new Promise((resolve, reject) => {
        let system = getOperatingSystem()
        signIn({
          account: signInfo.account,
          password: md5(signInfo.password),
          device: 'pc',
          operating_system: formatSystem(system),
          type: '0',
          unique: state.browserUUID
        }).then(res => {
          axios.defaults.params.accessToken = res.data.token
          dispatch('getAccount', res.data.account_id)
          cookie.set('token', res.data.token, 24)
          state.token = res.data.token
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout ({state}) {
      return new Promise(resolve => {
        logout().then(res => {
          delete axios.defaults.params.accessToken
          cookie.del('token')
          localStorage.removeItem('user')
          state.user = {}
          state.token = ''
          resolve(res)
        })
      })
    }
  }
}
