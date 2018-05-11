import 'babel-polyfill'
import App from './App'
import Article from './views/Article'
import Frontpage from './views/Frontpage'
import About from './views/About'
import Contacts from './views/Contacts'
import ArticleList from './views/ArticleList'
import Portfolio from './views/Portfolio'
import Magazine from './views/Magazine'
import ArticleListWithIntro from './views/ArticleListWithIntro'
import Filters from './utilities/vueFilters'
import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import store from './store'
import modArticles from './store/modules/mod_articles'
import modCategories from './store/modules/mod_categories'
import modAuthors from './store/modules/mod_authors'
import vuexI18n from 'vuex-i18n'
import {translationsEn, translationsFr, translationsIt, translationsDe} from './internazionalization'
import activateAllPolyfills from './utilities/polyfills'
import VueYoutube from 'vue-youtube'

import { BLOG_CATEGORY_ID,
  CONSULTANCIES_CATEGORY_ID,
  NGO_CATEGORY_ID,
  NGO_INTRO_SLUG,
  CONSULTANCES_INTRO_SLUG } from './utilities/constants'

activateAllPolyfills()

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(vuexI18n.plugin, store)
Vue.use(VueYoutube)

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('fr', translationsFr)
Vue.i18n.add('it', translationsIt)
Vue.i18n.add('de', translationsDe)

Vue.i18n.set('it') // TODO: Base it on stored info and / or browser settings

Filters.initializeFilters()

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'frontpage', component: Frontpage },
    { path: '/about', name: 'about', component: About },
    { path: '/contacts', name: 'contacts', component: Contacts },
    { path: '/category/blog', name: 'blog', component: ArticleList, props: {categoryId: BLOG_CATEGORY_ID} },
    { path: '/portfolio', name: 'portfolio', component: Portfolio },
    { path: '/consulenze', name: 'consulenze', component: ArticleListWithIntro, props: {categoryId: CONSULTANCIES_CATEGORY_ID, pageSlug: CONSULTANCES_INTRO_SLUG} },
    { path: '/visibility-ngo', name: 'visibility-ngo', component: ArticleListWithIntro, props: {categoryId: NGO_CATEGORY_ID, pageSlug: NGO_INTRO_SLUG} },
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
modAuthors.actions.initializeAuthorsFromLocalDB(store, Vue.i18n.locale())
