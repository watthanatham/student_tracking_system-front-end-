import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    course_id: '',
    sub_id: '',
    module_id: '',
    stu_year: '',
    course_name: ''
  },
  mutations: {
    setCourseId (state, id) {
      state.course_id = id
      localStorage.setItem('courseId', id)
    },
    setSubId (state, id) {
      state.sub_id = id
    },
    setModuleId (state, id) {
      state.module_id = id
    },
    setStuYear (state, id) {
      state.stu_year = id
    },
    setCourseName (state, name) {
      state.course_name = name
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
    },
    setYear ({ commit }, id) {
      commit('setStuYear', id)
    },
    setCourseName ({ commit }, name) {
      commit('setCourseName', name)
    }
  },
  modules: {
    auth
  }
})
