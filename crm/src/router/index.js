import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     name: 'dashboard',
  //     meta: { title: '首页' }
  //   }]
  // },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/order/update',
    children: [
      {
        path: 'order/update',
        component: () => import('@/views/order/edit'),
        name: '订单编辑',
        meta: {
          title: '订单编辑'
        } // 页面需要的权限
      },
      {
        path: 'goods/update',
        component: () => import('@/views/goods/edit'),
        name: '发货系统编辑',
        meta: {
          title: '发货系统编辑'
        } // 页面需要的权限
      }
    ],
    hidden: true
  },
  {
    path: '/sales',
    component: Layout,
    redirect: '/sales/insert',
    children: [
      {
        path: 'insert',
        component: () => import('@/views/sales/add'),
        name: '添加销售',
        meta: {
          title: '添加销售'
        } // 页面需要的权限
      },
      {
        path: 'edit',
        component: () => import('@/views/sales/edit'),
        name: '编辑销售',
        meta: {
          title: '编辑销售'
        } // 页面需要的权限
      },
      {
        path: 'code',
        component: () => import('@/views/sales/code'),
        name: '查看专属码',
        meta: {
          title: '查看专属码'
        } // 页面需要的权限
      }
    ],
    hidden: true
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/insert',
    children: [
      {
        path: 'insert',
        component: () => import('@/views/system/role/add'),
        name: '添加用户角色',
        meta: {
          title: '添加用户角色'
        } // 页面需要的权限
      },
      {
        path: 'edit',
        component: () => import('@/views/system/role/edit'),
        name: '编辑用户角色',
        meta: {
          title: '编辑用户角色'
        } // 页面需要的权限
      }
    ],
    hidden: true
  },
  {
    path: '/root',
    component: Layout,
    redirect: '/root/insert',
    children: [
      {
        path: 'insert',
        component: () => import('@/views/system/root/add'),
        name: '添加角色',
        meta: {
          title: '添加角色'
        } // 页面需要的权限
      },
      {
        path: 'edit',
        component: () => import('@/views/system/root/edit'),
        name: '编辑角色',
        meta: {
          title: '编辑角色'
        } // 页面需要的权限
      }
    ],
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页' }
    }]
  },
  {
    path: '/orders',
    component: Layout,
    name: 'orders',
    redirect: '/orders/order',
    alwaysShow: true,
    meta: {
      title: '订单管理'
    }, // 页面需要的权限
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/index'),
        name: 'order',
        meta: {
          title: '订单列表'
        } // 页面需要的权限
      },
      {
        path: 'goods',
        component: () => import('@/views/goods/index'),
        name: 'goods',
        meta: {
          title: '发货系统'
        } // 页面需要的权限
      }
    ]
  },
  {
    path: '/sales',
    component: Layout,
    alwaysShow: true,
    redirect: '/sales/seller',
    name: 'sales/seller',
    meta: {
      title: '销售管理'
    },
    children: [
      {
        path: 'seller',
        component: () => import('@/views/sales/index'),
        name: 'seller',
        meta: {
          title: '销售列表'
        }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/order',
    name: 'finance/order',
    alwaysShow: true,
    meta: {
      title: '财务管理'
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/finance/order'),
        name: 'order',
        meta: {
          title: '订单核对'
        }
      },
      {
        path: 'sale',
        component: () => import('@/views/finance/sale'),
        name: 'sale',
        meta: {
          title: '销售核对'
        }
      }
    ]
  },
  {
    path: '/customerService',
    component: Layout,
    alwaysShow: true,
    redirect: '/customerService/root',
    name: 'customerService/root',
    meta: {
      title: '客服管理'
    },
    children: [
      {
        path: 'root',
        component: () => import('@/views/customerService/root'),
        name: 'root',
        meta: {
          title: '权限核对'
        }
      }
    ]
  },
  {
    path: '/clients',
    component: Layout,
    alwaysShow: true,
    redirect: '/clients/client',
    name: 'clients/client',
    meta: {
      title: '客户管理'
    },
    children: [
      {
        path: 'client',
        component: () => import('@/views/client/index'),
        name: 'client',
        meta: {
          title: '客户列表'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirct: '/system/role',
    alwaysShow: true,
    name: 'system',
    meta: {
      title: '系统设置'
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'role',
        meta: {
          title: '后台管理员'
        }
      },
      {
        path: 'root',
        component: () => import('@/views/system/root/index'),
        name: 'root',
        meta: {
          title: '角色管理'
        }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/401', component: () => import('@/views/401'), hidden: true }
]
