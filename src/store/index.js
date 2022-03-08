import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    course_id: ''
  },
  mutations: {
    setCourseId (state, id) {
      state.course_id = id
    }
  },
  actions: {
    setCourse ({ commit }, id) {
      commit('setCourseId', id)
    }
  },
  modules: {
  }
})
