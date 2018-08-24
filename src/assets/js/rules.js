import i18n from '../plugins/i18n'
import { cloneObject } from '../js/utils'

const noRequired = arr => {
  let newArr = cloneObject(arr, true)
  newArr.forEach(ele => {
    ele.required = false
  })
  return newArr
}

/*
  名称
*/
export const name = [
  {
    required: true,
    message: i18n.t('tips.pleaseInputName'),
    trigger: 'blur'
  }
]

/*
  账号
*/
export const account = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '') {
        callback(new Error(i18n.t('tips.pleaseInputAccount')))
      } else if (!/^[0-9a-zA-Z]{3,20}$/.test(value)) {
        callback(new Error(i18n.t('tips.accountFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  密码
*/
export const password = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '') {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputPassword')))
        } else {
          callback()
        }
      } else if (!/^[0-9a-zA-Z!@#$%^&*()_+,.]{6,20}$/.test(value)) {
        callback(new Error(i18n.t('tips.passwordFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  密码(非必填)
*/
export const passwordNoRequire = noRequired(password)

/*
  角色选择
*/
export const roleSelect = [
  {
    required: true,
    message: i18n.t('tips.pleaseSelectRole'),
    trigger: 'change'
  }
]

/*
  电话
*/
export const mobile = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '') {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputMobile')))
        } else {
          callback()
        }
      } else if (!/^[0-9]{11}$|^[6][0-9]{7}/.test(value)) {
        callback(new Error(i18n.t('tips.mobileFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  电话(非必填)
*/
export const mobileNoRequire = noRequired(mobile)

/*
  邮箱
*/
export const email = [
  {
    required: true,
    validator (rule, value, callback) {
      if (value === '') {
        if (this.required) {
          callback(new Error(i18n.t('tips.pleaseInputEmail')))
        } else {
          callback()
        }
      } else if (!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)) {
        callback(new Error(i18n.t('tips.emailFormatError')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

/*
  邮箱(非必填)
*/
export const emailNoRequire = noRequired(email)

/*
  排序
*/
export const sorting = [
  {
    required: true,
    message: i18n.t('tips.pleaseInputSort'),
    trigger: 'blur'
  }
]
