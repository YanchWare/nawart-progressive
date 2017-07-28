import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import modCategories from './modules/mod_categories'
import modArticle from './modules/mod_articles'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    modCategories,
    modArticle
  }
})
