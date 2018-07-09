import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueRouter from "vue-router"
import App from './App.vue'
import Page from './pages/Page.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', redirect: 'pokemon' },
    { path: '/pokemon', name: 'pokemon', component: Page },
    { path: '/moves', name: 'moves', component: Page },
    { path: '/berries', name: 'berries', component: Page }
  ]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
