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
    path: '/studentform',
    name: 'studentForm',
    component: () => import('../views/Student/StudentForm.vue')
  },
  {
    path: '/subjectType',
    name: 'Subject Type',
    component: () => import('../views/SubjectType/Subjecttype.vue')
  },
  {
    path: '/moduleSubject',
    name: 'Module Subject',
    component: () => import('../views/Modulesubject/Modulesubject.vue')
  },
  {
    path: '/studentresult',
    name: 'Student Result',
    component: () => import('../views/Student_Result/StudentResultTable')
  },
  {
    path: '/studentresultform',
    name: 'Student Result Form',
    component: () => import('../views/Student_Result/StudentResultForm')
  },
  {
    path: '/studentImport',
    name: 'Student Import',
    component: () => import('../views/Student/StudentImport')
  },
  {
    path: '/train_hours',
    name: 'Trainning Hours',
    component: () => import('../views/Training/Training_Hours')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
