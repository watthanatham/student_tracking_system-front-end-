import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
import router from '../../router'
import { loginAuth } from '../../services/auth'
// import jwtDecode from 'jwt-decode'

export default {
  namespaced: true,
  state: () => ({
    staff: JSON.parse(localStorage.getItem('staff'))
    // staffData: jwtDecode(localStorage.getItem('token'))
  }),
  mutations: {
    [AUTH_LOGIN] (state, payload) { // payload เป็นกล่องที่ใส่ของเข้ามา
      state.staff = payload
    },
    [AUTH_LOGOUT] (state) {
      state.staff = null
    }
  },
  actions: {
    async login ({ commit }, payload) { // commit ดึง object ของ context มา
      console.log(payload)
      try {
        let type = payload.staff_username
        if (typeof type === 'number') {
          type = 'student'
        } else {
          type = 'staff'
        }
        const res = await loginAuth(payload.staff_username, payload.staff_password, type) // เรียกฟังก์ชั่น Login
        const staff = res.data.staff
        const token = res.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('staff', JSON.stringify(staff))

        console.log(res)
        router.push('/')
        commit(AUTH_LOGIN, staff)
      } catch (e) {
        console.log('Error')
      }
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('staff')
      commit(AUTH_LOGOUT)
    }
  },
  getters: {
    isLogin (state, getters) {
      return state.staff != null
    }
  }
}
