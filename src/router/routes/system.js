/* 系统管理 */
import SystemSetting from '../../pages/system'
// 角色管理
import RoleManagement from '../../pages/system/role'
import RoleAdd from '../../pages/system/role/add'
import RoleEdit from '../../pages/system/role/edit'
// 账号管理
import AccountManagement from '../../pages/system/account'
import AccountAdd from '../../pages/system/account/add'
import AccountEdit from '../../pages/system/account/edit'
// 权限管理
import AuthManagement from '../../pages/system/auth'
export default {
  path: 'SystemSetting',
  name: 'SystemSetting',
  component: SystemSetting,
  redirect: {
    name: 'RoleManagement'
  },
  children: [
    {
      path: 'RoleManagement',
      name: 'RoleManagement',
      component: RoleManagement
    },
    {
      path: 'RoleManagement/RoleAdd',
      name: 'RoleAdd',
      component: RoleAdd
    },
    {
      path: 'RoleManagement/RoleEdit',
      name: 'RoleEdit',
      component: RoleEdit
    },
    {
      path: 'AccountManagement',
      name: 'AccountManagement',
      component: AccountManagement
    },
    {
      path: 'AccountManagement/AccountAdd',
      name: 'AccountAdd',
      component: AccountAdd
    },
    {
      path: 'AccountManagement/AccountEdit',
      name: 'AccountEdit',
      component: AccountEdit
    },
    {
      path: 'AuthManagement',
      name: 'AuthManagement',
      component: AuthManagement
    }
  ]
}
