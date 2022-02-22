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
    path: '/formInput1',
    name: 'Form Input 1',
    component: () => import('../views/FormInput1.vue')
  },
  {
    path: '/formInput2',
    name: 'Form Input 2',
    component: () => import('../views/FormInput2.vue')
  },
  {
    path: '/formInput3',
    name: 'Form Input 3',
    component: () => import('../views/FormInput3.vue')
  },
  {
    path: '/formInput4',
    name: 'Form Input 4',
    component: () => import('../views/FormInput4.vue')
  },
  {
    path: '/formStudent',
    name: 'Form Student',
    component: () => import('../views/FormStudent.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
