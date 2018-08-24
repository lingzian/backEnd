import i18n from '../plugins/i18n'

/*
  活动状态 0 禁用 1 可用
*/
export const activeOptions = [
  {
    label: i18n.t('status.enable'),
    value: 1
  },
  {
    label: i18n.t('status.disable'),
    value: 0
  }
]

/*
  地区 1 澳门 2 氹仔
*/
export const macauAreaOptions = [
  {
    label: '澳门',
    value: 1
  },
  {
    label: '氹仔',
    value: 2
  }
]

/*
  语言
*/
export const languageOptions = [
  {
    value: 'cn',
    label: '简体中文'
  },
  {
    value: 'tw',
    label: '繁體中文'
  }
]
