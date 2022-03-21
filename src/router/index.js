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
    name: 'courselist',
    component: () => import('../views/Courselist/Courselist.vue')
  },
  {
    path: '/coursestructure',
    name: 'coursestructure',
    component: () => import('../views/Coursestructure/Coursestructure.vue')
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student/StudentTable.vue')
  },
  {
    path: '/subject',
    name: 'subject',
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
    path: '/subject_type',
    name: 'subjecttype',
    component: () => import('../views/SubjectType/Subjecttype.vue')
  },
  {
    path: '/modulesubject',
    name: 'Module Subject',
    component: () => import('../views/Modulesubject/Modulesubject.vue')
  },
  {
    path: '/student_result',
    name: 'studentresult',
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
    path: '/loginteacher',
    name: 'Login Teacher',
    component: () => import('../components/LoginTeacher/Loginteacher.vue')
  },
  {
    path: '/loginstudent',
    name: 'Login Student',
    component: () => import('../components/LoginStudent/Loginstudent.vue')
  },
  {
    path: '/loginbeforescreen',
    name: 'Login Before Screen',
    component: () => import('../views/Screenbeforelogin/screenbeforelogin.vue')
  },
  {
    path: '/moduleinspect',
    name: 'Module Inspect',
    component: () => import('../views/Modulesubject/ModuleInspect.vue')
  },
  {
    path: '/studymodule',
    name: 'Module Overview Result',
    component: () => import('../views/Study_results/Study_module.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
