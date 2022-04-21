import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    course_id: localStorage.getItem('course_id') ? localStorage.getItem('course_id') : null,
    sub_id: localStorage.getItem('sub_id') ? localStorage.getItem('sub_id') : null,
    module_id: '',
    stu_year: '',
    course_name: localStorage.getItem('course_name') ? localStorage.getItem('course_name') : null,
    sub_name: localStorage.getItem('sub_id') ? localStorage.getItem('sub_id') : null
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
    },
    setStuYear (state, id) {
      state.stu_year = id
    },
    setCourseName (state, name) {
      state.course_name = name
    },
    setSubName (state, name) {
      state.sub_name = name
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
    },
    setSubName ({ commit }, name) {
      commit('setSubName', name)
    }
  },
  modules: {
    auth
  }
})
