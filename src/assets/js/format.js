/*
  状态转换库
*/

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
    return 2
  } else if (locale === 'en') {
    return 3
  } else {
    return 1
  }
}
