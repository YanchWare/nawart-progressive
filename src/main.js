import 'babel-polyfill'
import App from './App'
import Article from './views/Article'
import Frontpage from './views/Frontpage'
import About from './views/About'
import Blog from './views/Blog'
import Portfolio from './views/Portfolio'
import Magazine from './views/Magazine'
import Filters from './utilities/vueFilters'
import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import store from './store'
import modArticles from './store/modules/mod_articles'
import modCategories from './store/modules/mod_categories'
import vuexI18n from 'vuex-i18n'
import {translationsEn, translationsFr, translationsIt} from './internazionalization'
import activateAllPolyfills from './utilities/polyfills'

activateAllPolyfills()

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('fr', translationsFr)
Vue.i18n.add('it', translationsIt)

Vue.i18n.set('it') // TODO: Base it on stored info and / or browser settings

Filters.initializeFilters()

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'frontpage', component: Frontpage },
    { path: '/about', name: 'about', component: About },
    { path: '/category/blog', name: 'blog', component: Blog },
    { path: '/portfolio', name: 'portfolio', component: Portfolio },
    { path: '/magazine', name: 'magazine', component: Magazine },
    { path: '/:articleSlug', name: 'article', component: Article }
  ]
})

new Vue({
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')

modArticles.actions.initializeArticlesFromLocalDB(store, Vue.i18n.locale())
modCategories.actions.initializeCategoriesFromLocalDB(store, Vue.i18n.locale())
