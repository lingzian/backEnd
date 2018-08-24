import Main from '../../views'
import SignIn from '../../views/sign-in'
import Error from '../../views/error'
/* 首页 */
import Index from '../../pages/index'

// 商家
import merchant from './merchant'
// 订单
import order from './order'
// 团购
import groupon from './groupon'
// 报表
import report from './report'
// 系统
import system from './system'
// 地区
import basic from './basic'

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index
      },
      merchant,
      order,
      groupon,
      report,
      system,
      basic
    ]
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/Error',
    name: 'Error',
    component: Error
  }
]
