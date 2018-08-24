/* 基础管理 */
import BasicManagement from '../../pages/basic'
// 地区管理
import AreaManagement from '../../pages/basic/area'
// 菜系管理
import CuisineManagement from '../../pages/basic/cuisine'
// 导航管理
import NavigationManagement from '../../pages/basic/navigation'
// 广告
import AdManagement from '../../pages/basic/advertisement'

export default {
  path: 'BasicManagement',
  name: 'BasicManagement',
  component: BasicManagement,
  redirect: {
    name: 'AreaManagement'
  },
  children: [
    {
      path: 'AreaManagement',
      name: 'AreaManagement',
      component: AreaManagement
    },
    {
      path: 'CuisineManagement',
      name: 'CuisineManagement',
      component: CuisineManagement
    },
    {
      path: 'NavigationManagement',
      name: 'NavigationManagement',
      component: NavigationManagement
    },
    {
      path: 'AdManagement',
      name: 'AdManagement',
      component: AdManagement
    }
  ]
}
