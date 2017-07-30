import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'
import { categoriesDb } from '../../utilities/localDatabaseHandler'
import { ALL_CATEGORIES_DBKEY, CACHE_EXPIRY_MS } from '../../utilities/constants'

// initial state
const state = {
  allCategories: {
    categoriesById: []
  }
}

// getters
const getters = {
  allCategories: state => state.allCategories
}

function getCategoriesWorker (commit, page = 1) {
  apiWrapper.getAllCategories(page).then(function (response) {
    commit(types.ALL_CATEGORIES_RECEIVED, response.entity)
    let totalPages = response.headers['X-Wp-Totalpages']
    if (page < totalPages) {
      getCategoriesWorker(commit, ++page)
    }
  })
}

// actions
const actions = {
  initializeStateFromLocalDB ({ commit }) {
    categoriesDb.get(ALL_CATEGORIES_DBKEY).then(allCategories => {
      commit(types.ALL_CATEGORIES_LOADED, allCategories)
      if (!allCategories || !allCategories.categoriesById || (new Date().getTime() - allCategories.lastUpdate) > CACHE_EXPIRY_MS) {
        actions.updateAllCategories({ commit })
      }
    }).catch(err => {
      console.error(err)
    })
  },
  updateAllCategories ({ commit }) {
    getCategoriesWorker(commit)
  }
}

// mutations
const mutations = {
  [types.ALL_CATEGORIES_LOADED] (state, allCategories) {
    if (allCategories) {
      state.allCategories.categoriesById = allCategories.categoriesById
      state.allCategories = allCategories
    }
  },
  [types.ALL_CATEGORIES_RECEIVED] (state, categories) {
    console.log(state)
    if (!categories) {
      return
    }
    let newCategoriesById = categories.reduce((previous, current) => {
      if (current && current.id) {
        previous[current.id] = current
      }
      return previous
    }, {})

    state.allCategories = {
      categoriesById: Object.assign(state.allCategories.categoriesById, newCategoriesById),
      lastUpdate: new Date().getTime()
    }
    categoriesDb.set(ALL_CATEGORIES_DBKEY, state.allCategories)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
