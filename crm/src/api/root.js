import request from '@/utils/request'
import store from '@/store'
// import qs from 'qs'

// 角色权限列表
export function getRoot(param) {
  return request({
    url: '/platform-user/role/findRoleListByName',
    method: 'get',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    params: param
  })
}

// permissionIds查询权限全部
export function getRootAll() {
  return request({
    url: '/platform-user/permission/all',
    method: 'get',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    }
  })
}

// 取角色的权限列表-编辑
export function getPermissionRoot(param) {
  return request({
    url: '/platform-user/permission/se/list/role',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    params: param
  })
}

// roleId查询权限全部-添加为空，编辑有值
export function getRootResource(param) {
  return request({
    url: '/platform-user/resource/role/permission',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    params: param
  })
}

// permissionId是根据permission/all获取的
export function getListPermission(param) {
  return request({
    url: '/platform-user/resource/list/permission',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    params: param
  })
}

// 添加角色权限
export function addRootRole(param) {
  return request({
    url: '/platform-user/permission/resource/insert',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    params: param
  })
}

// 修改角色权限
export function updateRootRole(param) {
  return request({
    url: '/platform-user/permission/update',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: param
  })
}

// 点击编辑,根据角色id获取角色name
export function getRoleName(param) {
  return request({
    url: '/platform-user/role/' + param,
    method: 'get',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    }
  })
}
