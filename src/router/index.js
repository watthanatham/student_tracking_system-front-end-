import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    // teacher
    path: '/courselist',
    name: 'courselist',
    meta: { requiresAuth: true },
    component: () => import('../views/Courselist/Courselist.vue')
  },
  { // teacher
    path: '/coursestructure',
    name: 'coursestructure',
    meta: { requiresAuth: true },
    component: () => import('../views/Coursestructure/Coursestructure.vue')
  },
  { // teacher
    path: '/student',
    name: 'Student',
    meta: { requiresAuth: true },
    component: () => import('../views/Student/StudentTable.vue')
  },
  { // teacher
    path: '/subject',
    name: 'subject',
    meta: { requiresAuth: true },
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
  { // teacher
    path: '/subject_type',
    name: 'subjecttype',
    meta: { requiresAuth: true },
    component: () => import('../views/SubjectType/Subjecttype.vue')
  },
  { // teacher
    path: '/modulesubject',
    name: 'Module Subject',
    meta: { requiresAuth: true },
    component: () => import('../views/Modulesubject/Modulesubject.vue')
  },
  { // teacher
    path: '/student_result',
    name: 'studentresult',
    meta: { requiresAuth: true },
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
  },
  {
    path: '/studyResult',
    name: 'Study Result',
    component: () => import('../views/Study_results/studyresults.vue')
  },
  {
    path: '/subjectstudyResult',
    name: 'Subject StudyResult',
    component: () =>
      import('../views/Subject_Studyresult/Subjectstudyresult.vue')
  },
  {
    path: '/subject_import',
    name: 'Subject Import',
    component: () => import('../views/Subject/SubjectImport.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/',
    name: 'Login Screen',
    component: () => import('../views/Screenbeforelogin/screenbeforelogin.vue')
  },
  { // teacher
    path: '/moduleinspect',
    name: 'Module Inspect',
    meta: { requiresAuth: true },
    component: () => import('../views/Modulesubject/ModuleInspect.vue')
  },
  {
    path: '/studymodule',
    name: 'Module Overview Result',
    component: () => import('../views/Study_results/Study_module.vue')
  },
  {
    path: '/studycheckmoduleresult',
    name: 'Study Check Module Result',
    component: () => import('../views/Study_results/Study_module_result.vue')
  },
  { // teacher
    path: '/module_report',
    name: 'Module Report',
    meta: { requiresAuth: true },
    component: () => import('../views/Modulesubject/ModuleReport.vue')
  },
  { // teacher
    path: '/module_structure',
    name: 'Module Structure',
    meta: { requiresAuth: true },
    component: () => import('../views/Modulesubject/ModuleStructure.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.auth.userData.type === 'staff') {
      next()
      return
    }
    next('/home')
  } else {
    next()
  }
})

export default router
