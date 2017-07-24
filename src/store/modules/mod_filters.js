import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allFilters: state => state.all
}

function getFiltersWorker (commit, page = 1) {
  apiWrapper.getFilters(page).then(function (response) {
    commit(types.INIT_FILTERS, response.entity)
    let totalPages = response.headers['X-Wp-Totalpages']
    if (page < totalPages) {
      getFiltersWorker(commit, ++page)
    }
  })
}

// actions
const actions = {
  getAllFilters ({ commit }) {
    getFiltersWorker(commit)
  }
}

// mutations
const mutations = {
  [types.INIT_FILTERS] (state, filters) {
    if (!filters) {
      return
    }
    state.all = state.all.concat(filters.map(function (filter) {
      if (filter.count > 0 &&
        filter.name.toLowerCase().toLowerCase() !== 'ultra-nationalists' &&
        filter.name.toLowerCase().toLowerCase() !== 'railway diaries' &&
        filter.name.toLowerCase().toLowerCase() !== '118 libri' &&
        filter.name.toLowerCase().toLowerCase() !== 'cinema' &&
        filter.name.toLowerCase().toLowerCase() !== 'blog' &&
        filter.name.toLowerCase().toLowerCase() !== 'consulenze' &&
        filter.name.toLowerCase().toLowerCase() !== 'from the field' &&
        filter.name.toLowerCase().toLowerCase() !== 'uncategorized') {
        return {name: filter.name}
      }
    }))
    state.all = state.all.filter(element => {
      return element
    })
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
