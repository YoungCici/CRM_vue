const root = {
  state: {
    rootRoleName: '',
    rootRoleId: '',
    rootStatus: 0,
    rootForm: []
  },

  mutations: {
    SET_ROOTROLENAME: (state, rootRoleName) => {
      state.rootRoleName = rootRoleName
    },
    SET_ROOTROLEID: (state, rootRoleId) => {
      state.rootRoleId = rootRoleId
    },
    SET_ROOTSTATUS: (state, rootStatus) => {
      state.rootStatus = rootStatus
    },
    SET_ROOTFORM: (state, rootForm) => {
      state.rootForm = rootForm
    }
  }
}

export default root
