import { createUUID, cookie } from '../assets/js/utils'
import { signIn } from '../assets/api'

let browserUUID = localStorage.getItem('browserUUID')
if (!browserUUID) {
  browserUUID = createUUID()
  localStorage.setItem('browserUUID', browserUUID)
}

let token = cookie.get('token') || ''

export default {
  namespaced: true,
  state: {
    browserUUID: browserUUID,
    token: token,
    account_id: ''
  },
  actions: {
    // 登录
    signIn ({state}, data) {
      return new Promise((resolve, reject) => {
        signIn(data).then(res => {
          state = Object.assign(state, {
            ...res.data
          })
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
