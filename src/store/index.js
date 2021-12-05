import { createStore } from 'vuex'

export default createStore({
  state: {
    counter: 2
  },
  mutations: {
    add(state) {
      state.counter ++
    }
  }
})