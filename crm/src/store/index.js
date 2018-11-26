import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import order from './modules/order'
import sales from './modules/sales'
import role from './modules/role'
import root from './modules/root'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    order,
    sales,
    role,
    root
  },
  getters
})

export default store
