import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)

let language = localStorage.getItem('language')
if (language === 'tw') {
  let lang = require('element-ui/lib/locale/lang/zh-TW').default
  let locale = require('element-ui/lib/locale').default
  locale.use(lang)
}
