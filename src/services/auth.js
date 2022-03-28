import axios from 'axios'
// import api from './api'

export const loginAuth = function (username, password, type) {
  if (type === 'staff') {
    return axios.post('http://localhost:8081/staff/login', { staff_username: username, staff_password: password })
  } else {
    return axios.post('http://localhost:8081/student_login/', { staff_username: username, staff_password: password })
  }
}
