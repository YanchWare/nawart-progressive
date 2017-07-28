import 'babel-polyfill'
import App from './App'
import Article from './views/Article'
import Frontpage from './views/Frontpage'
import About from './views/About'
import Portfolio from './views/Portfolio'
import Magazine from './views/Magazine'
import Filters from './utilities/vueFilters'
import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import store from './store'
import modArticles from './store/modules/mod_articles'
import modCategories from './store/modules/mod_categories'

Vue.use(VueHead)
Vue.use(VueRouter)

Filters.initializeFilters()

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'frontpage', component: Frontpage },
    { path: '/about', name: 'about', component: About },
    { path: '/portfolio', name: 'portfolio', component: Portfolio },
    { path: '/magazine', name: 'magazine', component: Magazine },
    { path: '*', name: 'article', component: Article }
  ]
})

new Vue({
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')

modArticles.actions.initializeStateFromLocalDB(store)
modCategories.actions.initializeStateFromLocalDB(store)
