import request from '@/utils/request'
import store from '@/store'
// import qs from 'qs'

// 角色列表
export function getRole(paramas) {
  return request({
    url: '/platform-user/user/crm/role/list',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: paramas
  })
}

// 添加管理员
export function addRole(paramas) {
  return request({
    url: '/platform-user/user/crm/role/insert',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: paramas
  })
}

// 编辑-修改管理员
export function roleUpdate(paramas) {
  return request({
    url: '/platform-user/user/crm/role/update',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: paramas
  })
}
