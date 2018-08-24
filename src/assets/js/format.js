import i18n from '../plugins/i18n'

/*
  转换系统  0 未知設備 1 android 2 ios 3 windows 4 macOS
*/
export const formatSystem = system => {
  if (system === 'macOS') {
    return 4
  } else if (system === 'windows') {
    return 3
  } else {
    return 0
  }
}

/*
  转换语言 1 简体中文(默认) 2 繁体中文 3 英文
*/
export const formatLanguage = locale => {
  if (locale === 'tw') {
    return 1
  } else if (locale === 'en') {
    return 3
  } else {
    return 2
  }
}

/*
  转换活动状态 0 禁用 1 可用
*/
export const formatActive = status => {
  status = parseInt(status)
  if (status === 0) {
    return i18n.t('status.disable')
  } else if (status === 1) {
    return i18n.t('status.enable')
  } else {
    return ''
  }
}

/*
  转换澳门地区 1 澳门 2 氹仔
*/
export const formatMacauArea = area => {
  area = parseInt(area)
  if (area === 1) {
    return '澳门'
  } else if (area === 2) {
    return '氹仔'
  } else {
    return ''
  }
}

/*
  秒位时间戳 转换日期
*/
export const formatDate = timestamp => {
  timestamp = parseInt(timestamp) * 1000
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  let dateRes = `${year}-${month}-${day}`
  return dateRes
}

/*
  秒位时间戳 转换日期时间
*/
export const formatTime = timestamp => {
  let dateRes = formatDate(timestamp)
  timestamp = parseInt(timestamp) * 1000
  let date = new Date(timestamp)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${dateRes} ${hours}:${minutes}:${seconds}`
}
