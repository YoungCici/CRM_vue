import request from '@/utils/request'
import store from '@/store'
// import qs from 'qs'

// 客户列表
export function getClient(paramas) {
  return request({
    url: '/platform-user/user/crm/findCustomers',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: paramas
  })
}
