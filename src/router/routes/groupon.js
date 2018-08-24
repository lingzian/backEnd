/* 团购管理 */
import GrouponManagement from '../../pages/groupon'
// 拼团
import GroupPurchase from '../../pages/groupon/purchase'
// 秒杀
import GroupSeckill from '../../pages/groupon/speckill'

export default {
  path: 'GrouponManagement',
  name: 'GrouponManagement',
  component: GrouponManagement,
  redirect: {
    name: 'GroupPurchase'
  },
  children: [
    {
      path: 'GroupPurchase',
      name: 'GroupPurchase',
      component: GroupPurchase
    },
    {
      path: 'GroupSeckill',
      name: 'GroupSeckill',
      component: GroupSeckill
    }
  ]
}
