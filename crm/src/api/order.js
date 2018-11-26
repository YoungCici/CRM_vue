import request from '@/utils/request'
import store from '@/store'
import qs from 'qs'
import { getToken } from '@/utils/auth'

// 订单列表
export function getList(params) {
  return request({
    url: '/platform-order/order/find/OrderListByCondition',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: params
  })
}

// 编辑订单 根据订单编号
export function listEdit(param) {
  const paramas = {
    orderId: param
  }
  return request({
    url: '/platform-order/order/find/OrderByOrderId',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(paramas)
  })
}

// 修改订单 根据订单编号
export function updateEdit(param) {
  return request({
    url: '/platform-order/order/updateOrderById',
    method: 'put',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: param
  })
}

// 发货系统 查询发货订单列表
export function getGoods(param) {
  return request({
    url: '/platform-order/order/find/OrderDelivery',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: param
  })
}

// 发货系统 修改发货订单列表
export function editGoods(param) {
  return request({
    url: '/platform-order/order/delivery/update',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/json'
    },
    data: param
  })
}

// 查询区域
export function getAllAreas() {
  return request({
    url: '/platform-content/codeArea/all/find',
    method: 'get',
    headers: {
      'tenantId': store.getters.tenantId
    }
  })
}

// 查询类型分类列表数据
export function getType(param) {
  return request({
    url: '/platform-order/product/list',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId
    },
    params: param
  })
}

// 发货系统 填写地址请求区域接口-一级
export function getAreaTop() {
  return request({
    url: '/platform-content/codeArea/findRegion',
    method: 'get',
    headers: {
      'tenantId': store.getters.tenantId
    }
  })
}

// 发货系统 填写地址请求区域接口-一级下
export function getAreaNext(param) {
  return request({
    url: '/platform-content/codeArea/findByProvinceAndType',
    method: 'post',
    headers: {
      'tenantId': store.getters.tenantId
    },
    params: param
  })
}

// 导出发货订单列表
export function exportOrder(param) {
  return request({
    url: '/platform-order/order/exportOrderDeliveryExcel',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'tenantId': store.getters.tenantId,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(param),
    changeOrigin: true,
    responseType: 'blob'
  })
}
