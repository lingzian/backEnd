/* 商家管理 */
import MerchantManagement from '../../pages/merchant'
import MerchantPublicList from '../../pages/merchant/public'
import MerchantPrivateList from '../../pages/merchant/private'
export default {
  path: 'MerchantManagement',
  name: 'MerchantManagement',
  component: MerchantManagement,
  redirect: {
    name: 'MerchantPublicList'
  },
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
}
