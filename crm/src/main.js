import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission' // permission control
import permission from '@/directive/permission/index.js' // 权限判断指令
// 复制内容到粘贴板
import VueClipboard from 'vue-clipboard2'
import qs from 'qs'
Vue.prototype.$qs = qs

Vue.use(ElementUI)
Vue.use(VueClipboard)
// 权限制令-全局注册
Vue.use(permission)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
