import Vue from 'vue'
import Vuex from 'vuex'
import modCategories from './modules/mod_categories'
import modArticles from './modules/mod_articles'
import modFilters from './modules/mod_filters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modCategories,
    modArticles,
    modFilters
  }
})
