import Vue from 'vue'
import Vuex from 'vuex'
import modCategories from './modules/mod_categories'
import modArticle from './modules/mod_articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modCategories,
    modArticle
  }
})
