import axios from 'axios'
// import api from './api'

export const loginAuth = function (username, password, type) {
  console.log(type)
  if (type === 'staff') {
    return axios.post('http://localhost:8081/staff/login', { username: username, password: password })
  } else {
    return axios.post('http://localhost:8081/student_login', { username: username, password: password })
  }
}
