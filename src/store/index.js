import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import modFilter from './modules/mod_filters'
import modArticle from './modules/mod_articles'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    modFilter,
    modArticle
  }
})
