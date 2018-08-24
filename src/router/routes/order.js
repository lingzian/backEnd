/* 订单管理 */
import OrderManagement from '../../pages/order'
// 订单列表
import OrderList from '../../pages/order/list'

export default {
  path: 'OrderManagement',
  name: 'OrderManagement',
  component: OrderManagement,
  redirect: {
    name: 'OrderList'
  },
  children: [
    {
      path: 'OrderList',
      name: 'OrderList',
      component: OrderList
    }
  ]
}
