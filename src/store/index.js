import { createStore } from 'vuex'
import { constantRouterMap } from '@/router/index.js'

export default createStore({
  state: {
    counter: 2,
    routers: constantRouterMap,
    sidebarRouters: []
  },
  mutations: {
    add(state) {
      state.counter ++
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap.concat(routers)
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
      commit('SET_SIDEBAR_ROUTERS', sidebarRouter)
    }
  }
})