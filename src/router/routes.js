import Main from '../views'
import SignIn from '../views/sign-in'
import Error from '../views/error'
/* 首页 */
import Index from '../pages/index'
/* 商家管理 */
import MerchantManagement from '../pages/merchant'
import MerchantPublicList from '../pages/merchant/public'
import MerchantPrivateList from '../pages/merchant/private'
/* 订单管理 */
import OrderManagement from '../pages/order'
/* 团购管理 */
import GrouponManagement from '../pages/groupon'
/* 报表管理 */
import ReportManagement from '../pages/report'
/* 系统管理 */
import SystemSetting from '../pages/system'

import RoleManagement from '../pages/system/role'
import AccountManagement from '../pages/system/account'
import AuthManagement from '../pages/system/auth'

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
      {
        path: 'MerchantManagement',
        name: 'MerchantManagement',
        component: MerchantManagement,
        children: [
          {
            path: 'MerchantPublicList',
            name: 'MerchantPublicList',
            component: MerchantPublicList
          },
          {
            path: 'MerchantPrivateList',
            name: 'MerchantPrivateList',
            component: MerchantPrivateList
          }
        ]
      },
      {
        path: 'OrderManagement',
        name: 'OrderManagement',
        component: OrderManagement
      },
      {
        path: 'GrouponManagement',
        name: 'GrouponManagement',
        component: GrouponManagement
      },
      {
        path: 'ReportManagement',
        name: 'ReportManagement',
        component: ReportManagement
      },
      {
        path: 'SystemSetting',
        name: 'SystemSetting',
        component: SystemSetting,
        children: [
          {
            path: 'RoleManagement',
            name: 'RoleManagement',
            component: RoleManagement
          },
          {
            path: 'AccountManagement',
            name: 'AccountManagement',
            component: AccountManagement
          },
          {
            path: 'AuthManagement',
            name: 'AuthManagement',
            component: AuthManagement
          }
        ]
      }
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
