import Vue from 'vue'
import I18n from 'vue-i18n'
import zhtw from './zhtw'
import zhcn from './zhcn'
let locale = localStorage.getItem('language')

// 如果用户没设置过语言，取系统默认语言
if (!locale) {
  let systemLanguage = navigator.language.toLocaleLowerCase().replace(/-/g, '')
  if (systemLanguage.includes('tw')) {
    locale = 'tw'
  } else {
    locale = 'cn'
  }
}

Vue.use(I18n)

export default new I18n({
  locale: locale,
  messages: {
    cn: zhcn,
    tw: zhtw
  }
})
