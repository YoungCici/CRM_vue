import request from '@/utils/request'
import store from '@/store'
import qs from 'qs'
import { getToken } from '@/utils/auth'

// 登录
export function login(username, password) {
  const param = {
    username,
    password,
    crmFlag: true
  }
  return request({
    url: '/platform-user/user/login',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(param)
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/platform-oauth/oauth/token',
    method: 'patch',
    params: {
      Authorization: 'Bearer ' + getToken(),
      client_id: 'crm_client',
      client_secret: 'crm123'
    }
  })
}

// 获取
export function getPermission(param) {
  return request({
    url: '/platform-user/resource/role/permission',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      client_id: 'crm_client',
      client_secret: 'crm123'
    },
    params: param
  })
}

// // 获取菜单-子级
// export function getMenuChild(param) {
//   return request({
//     url: '/platform-user/resource/find/childMenu',
//     method: 'post',
//     headers: {
//       Authorization: 'Bearer ' + getToken(),
//       client_id: 'crm_client',
//       client_secret: 'crm123'
//     },
//     params: param
//   })
// }

// 获取用户角色
export function getRole(userId) {
  const param = {
    userId: userId,
    page: 1,
    size: 10
  }
  return request({
    url: 'platform-user/role/list/user',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 登出
export function logout() {
  return request({
    url: '/platform-oauth/oauth/token',
    method: 'delete',
    params: {
      Authorization: 'Bearer ' + getToken(),
      client_id: 'crm_client',
      client_secret: 'crm123'
    }
  })
}
