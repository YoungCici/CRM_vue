import request from '@/utils/request'
import store from '@/store'
import qs from 'qs'
import { getToken } from '@/utils/auth'

// 销售列表
export function getSales(paramas) {
  return request({
    url: '/platform-user/user/find/SellUserList',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: paramas
  })
}

// 更新销售
export function updateSales(paramas) {
  return request({
    url: '/platform-user/user/seller/update',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: paramas
  })
}

// 获取前后台角色字典
export function toAdd() {
  const paramas = {
    type: 1
  }
  return request({
    url: '/platform-user/role/list',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(paramas)
  })
}

// 获取顶级部门
export function topDept() {
  return request({
    url: '/platform-user/dept/top/all',
    method: 'get',
    params: {
      Authorization: 'Bearer ' + getToken()
    }
  })
}

// 获取下级所有部门-小组
export function childrenDeptAll(pId) {
  return request({
    url: '/platform-user/dept/children/all',
    method: 'get',
    params: {
      Authorization: 'Bearer ' + getToken(),
      parentId: pId
    }
  })
}

// 添加销售
export function addSales(paramas) {
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

// 列表编辑-根据手机号
export function toDetail(paramas) {
  return request({
    url: '/platform-user/user/seller/detail?userName=' + paramas,
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    }
  })
}

// 查看专属码
export function viewCode(paramas) {
  return request({
    url: '/platform-user/user/seller/viewSellerCode',
    method: 'get',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    params: {
      userName: paramas
    }
  })
}

// excel数据导入-发货系统部分
export function uploadExcel(param) {
  return request({
    url: '/platform-order/order/readExcelUpdateOrder',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: param
  })
}
