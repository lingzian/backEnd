import Vue from 'vue'
import { formatTime, formatDate, formatActive, formatMacauArea } from './format'
import i18n from '../plugins/i18n'
/*
  过滤方法对象
*/
const filter = {
  formatTime (timestamp) {
    if (typeof timestamp === 'object') {
      timestamp = arguments[2]
    }
    return formatTime(timestamp)
  },
  formatDate (timestamp) {
    if (typeof timestamp === 'object') {
      timestamp = arguments[2]
    }
    return formatDate(timestamp)
  },
  formatActive (status) {
    if (typeof status === 'object') {
      status = arguments[2]
    }
    return formatActive(status)
  },
  formatMacauArea (area) {
    if (typeof area === 'object') {
      area = arguments[2]
    }
    return formatMacauArea(area)
  },
  formatDataNull (data) {
    if (typeof data === 'object') {
      data = arguments[2]
    }
    if (!data) {
      return i18n.t('data.noFillOut')
    } else {
      return data
    }
  }
}

/*
  添加全局过滤
*/
Object.keys(filter).forEach(key => {
  console.log(key)
  Vue.filter(key, filter[key])
})

/*
  添加原型方法
*/
Vue.prototype.tableFilter = filter
