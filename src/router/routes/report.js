/* 报表管理 */
import ReportManagement from '../../pages/report'
// 商家报表
import ReportMerchant from '../../pages/report/merchant'
// 操作报表
import ReportOperate from '../../pages/report/operate'
export default {
  path: 'ReportManagement',
  name: 'ReportManagement',
  component: ReportManagement,
  redirect: {
    name: 'ReportOperate'
  },
  children: [
    {
      path: 'ReportMerchant',
      name: 'ReportMerchant',
      component: ReportMerchant
    },
    {
      path: 'ReportOperate',
      name: 'ReportOperate',
      component: ReportOperate
    }
  ]
}
