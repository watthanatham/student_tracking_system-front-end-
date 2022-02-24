import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/courselist',
    name: 'Course List',
    component: () => import('../views/Courselist.vue')
  },
  {
    path: '/coursestructure',
    name: 'Course Structure',
    component: () => import('../views/Coursestructure/Coursestructure.vue')
  },
  {
    path: '/coursestructureform',
    name: 'Course Structure Form',
    component: () => import('../views/Coursestructure/CoursestructureForm.vue')
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student/StudentTable.vue')
  },
  {
    path: '/subject',
    name: 'Subject',
    component: () => import('../views/Subject/SubjectTable.vue')
  },
  {
    path: '/subjectform',
    name: 'SubjectForm',
    component: () => import('../views/Subject/SubjectForm.vue')
  },
  {
    path: '/moduleform',
    name: 'moduleForm',
    component: () => import('../views/ModuleTF/ModuleForm.vue')
  },
  {
    path: '/subject_type_form',
    name: 'subject_type_form',
    component: () => import('../views/Subject_Type/SubjectTypeForm.vue')
  },
  {
    path: '/studentform',
    name: 'studentForm',
    component: () => import('../views/Student/StudentForm.vue')
  },
  {
    path: '/studentresult',
    name: 'studentResult',
    component: () => import('../views/Student_Result/StudentResultTable.vue')
  },
  {
    path: '/studentresultform',
    name: 'studentResultForm',
    component: () => import('../views/Student_Result/StudentResultForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
