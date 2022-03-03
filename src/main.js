import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '@fortawesome/fontawesome-free/js/all'
import { VueCsvImportPlugin } from 'vue-csv-import'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.use(VueCsvImportPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
