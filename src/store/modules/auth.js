import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
import router from '../../router'
import { loginAuth } from '../../services/auth'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: () => ({
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    // staff: JSON.parse(localStorage.getItem('staff')) || null,
    // userData: jwtDecode(localStorage.getItem('token')) || null
    userData: localStorage.getItem('token')
      ? jwtDecode(localStorage.getItem('token'))
      : null
  }),
  mutations: {
    [AUTH_LOGIN] (state) {
      state.userData = jwtDecode(localStorage.getItem('token'))
    },
    [AUTH_LOGOUT] (state) {
      state.userData = null
    }
  },
  actions: {
    async login ({ commit }, payload) {
      console.log(payload)
      try {
        const check = payload.username
        console.log(check)
        let type
        if (check.match(/[0-9]{8}$/g)) {
          type = 'student'
        } else {
          type = 'staff'
        }
        console.log(type)
        const res = await loginAuth(payload.username, payload.password, type)
        const user = res.data.user
        const token = res.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Swal.fire('ล็อกอินสำเร็จ', '', 'success')

        router.push('/home')
        commit(AUTH_LOGIN)
      } catch (e) {
        console.log('Error')
        Swal.fire('ล็อกอินไม่สำเร็จ', 'บัญชีผู้ใช้หรีอรหัสผ่านของคุณไม่ถูกต้อง', 'error')
      }
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      commit(AUTH_LOGOUT)
    }
  },
  getters: {
    isLogin (state, getters) {
      return state.user != null
    }
  }
}
