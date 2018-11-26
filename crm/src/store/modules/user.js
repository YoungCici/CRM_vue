import { login, logout, getInfo, getPermission } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

// 递归取出所有的id
function getAllId(data) {
  let idArr = []
  data.forEach((item, index) => {
    idArr.push(item.meta.title)
    if (item.children && item.children.length > 0) {
      idArr = idArr.concat(getAllId(item.children))
    }
  })
  return idArr
}

const user = {
  state: {
    token: getToken(),
    tenantId: 1,
    name: '',
    avatar: '',
    nickName: '',
    userId: '',
    roleName: '',
    roles: [],
    tel: '',
    roleId: '',
    deptId: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TENANTID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    SET_DEPTID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_NICKNAME: (state, nickName) => {
      state.nickName = nickName
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_ROLENAME: (state, roleName) => {
      state.roleName = roleName
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TEL: (state, tel) => {
      state.tel = tel
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(data => {
          Message.success(data.description)
          setToken(data.info.token)
          commit('SET_TOKEN', data.info.token)
          commit('SET_DEPTID', data.info.deptId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息、用户角色
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (!response.info) {
            reject('error')
          }
          const data = response.info
          if (data.roleList && data.roleList.length > 0) {
            const array = data.roleList[0].id
            commit('SET_ROLEID', data.roleList[0].id)
            const datap = {
              roleId: array,
              type: 1
            }
            getPermission(datap).then(resp => {
              const arrList = resp.dataList
              const datap2 = {
                roleId: array,
                type: 2
              }
              getPermission(datap2).then(resp2 => {
                const arrList2 = resp2.dataList
                const arr2 = arrList
                arrList2.map((item, index) => {
                  arr2.push(item)
                })
                commit('SET_ROLES', getAllId(arr2))
                resolve(getAllId(arr2))
              })
            })
            // 角色名称
            const arr = data.roleList
            arr.map((item, index) => {
              return commit('SET_ROLENAME', item.name)
            })
            // commit('SET_ROLES', getAllId(data.roleList))
            // console.log(getAllId(data.roleList))
          } else {
            reject('getInfo: roles必须是一个非空数组 !')
          }
          // const array = data.roleList
          // const arr = state.roles
          // for (const key in array) {
          //   if (array.hasOwnProperty(key)) {
          //     const element = array[key].name
          //     arr.push(element)
          //   }
          //   commit('SET_ROLEID', array[key].id)
          // }
          // if (arr && arr.length > 0) {
          //   commit('SET_ROLES', arr)
          //   arr.every(function(item, index, array) {
          //     return commit('SET_ROLENAME', item)
          //   })
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_AVATAR', data.avatar)
          commit('SET_NICKNAME', data.nickName)
          // commit('SET_ROLES', data.roles)
          commit('SET_USERID', data.id)
          commit('SET_SERVICECODE', data.serviceCode)
          // resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }

    // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
