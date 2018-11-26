const sales = {
  state: {
    nick: '',
    id: '',
    btnIds: '',
    link: '',
    serviceCode: '',
    salesEditForm: [],
    codeForm: []
  },

  mutations: {
    SET_NICK: (state, nick) => {
      state.nick = nick
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_BTNIDS: (state, btnIds) => {
      state.btnIds = btnIds
    },
    SET_LINK: (state, link) => {
      state.link = link
    },
    SET_SERVICECODE: (state, serviceCode) => {
      state.serviceCode = serviceCode
    },
    SET_SALESEDITFORM: (state, salesEditForm) => {
      state.salesEditForm = salesEditForm
    },
    SET_CODEFORM: (state, codeForm) => {
      state.codeForm = codeForm
    }
  }
}

export default sales
