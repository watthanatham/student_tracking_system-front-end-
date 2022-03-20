import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    course_id: '',
    sub_id: '',
    module_id: ''
  },
  mutations: {
    setCourseId (state, id) {
      state.course_id = id
    },
    setSubId (state, id) {
      state.sub_id = id
    },
    setModuleId (state, id) {
      state.module_id = id
    }
  },
  actions: {
    setCourse ({ commit }, id) {
      commit('setCourseId', id)
    },
    setSub ({ commit }, id) {
      commit('setSubId', id)
    },
    setModule ({ commit }, id) {
      commit('setModuleId', id)
    }
  },
  modules: {
  }
})
