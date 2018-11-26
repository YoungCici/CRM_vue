import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
// import { getPermission } from '@/api/login'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  // console.log(roles, permissionRoles)
  if (roles.indexOf('超级管理员') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(roles => { // 拉取用户信息
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // console.log(store.getters.addRouters)
            router.addRoutes(store.getters.addRouters)
            // const data = {
            //   roleId: store.getters.roleId,
            //   type: 2
            // }
            // getPermission(data).then(resp => {
            //   const routep = store.getters.addRouters
            //   resp.dataList.map((item, index) => {
            //     routep.push(item)
            //   })
            //   router.addRoutes(routep)
            // })
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        // next() // 当有用户权限的时候，说明所有可访问路由已生成，如访问没权限的页面会自动进入404页面
        if (hasPermission(store.getters.roles, to.meta.title)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
