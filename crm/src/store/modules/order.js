const order = {
  state: {
    editForm: [],
    addForm: []
  },

  mutations: {
    SET_EDITFORM: (state, editForm) => {
      state.editForm = editForm
      // storeLocalStore(state)
    },
    SET_ADDFORM: (state, addForm) => {
      state.addForm = addForm
      // storeLocalStore(state)
    }
  }
}
// function storeLocalStore(state) {
//   window.localStorage.setItem('userMsg', JSON.stringify(state))
// }
export default order
