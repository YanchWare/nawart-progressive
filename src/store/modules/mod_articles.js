import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allArticles: state => state.all
}

function getArticlesWorker (commit) {
  apiWrapper.getArticles(1).then(function (response) {
    let totalPages = response.headers['X-Wp-Totalpages']
    for (let i = 2; i <= totalPages; i++) {
      apiWrapper.getArticles(i).then(function (response) {
        commit(types.INIT_ARTICLES, response.entity)
      })
    }
    commit(types.INIT_ARTICLES, response.entity)
  })
}

// actions
const actions = {
  getAllArticles ({ commit }) {
    getArticlesWorker(commit)
  }
}

// mutations
const mutations = {
  [types.INIT_ARTICLES] (state, filters) {
    state.all = state.all.concat(filters)
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
