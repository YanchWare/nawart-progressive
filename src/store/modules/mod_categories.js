import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'
import { categoriesDb } from '../../utilities/localDatabaseHandler'
import { ALL_CATEGORIES_DBKEY, CACHE_EXPIRY_MS } from '../../utilities/constants'

// initial state
const state = {
  allCategories: {
    categoriesById: []
  },
  portfolioFilters: {
    countries: [],
    medias: [],
    projects: [],
    multimedia: [],
    years: [],
    authors: []
  }
}

// getters
const getters = {
  allCategories: state => state.allCategories,
  portfolioFilters: state => state.portfolioFilters
}

const getCategoriesWorker = (commit, languageCode, page = 1) => {
  apiWrapper.getAllCategories(languageCode, page).then(function (response) {
    commit(types.ALL_CATEGORIES_RECEIVED, {entity: response.entity, languageCode})
    let totalPages = response.headers['X-Wp-Totalpages']
    if (page < totalPages) {
      getCategoriesWorker(commit, languageCode, ++page)
    }
  })
}

// actions
const actions = {
  initializeCategoriesFromLocalDB ({ commit }, languageCode) {
    categoriesDb.get(ALL_CATEGORIES_DBKEY + languageCode).then(allCategories => {
      commit(types.ALL_CATEGORIES_LOADED, allCategories)
      if (!allCategories || !allCategories.categoriesById || (new Date().getTime() - allCategories.lastUpdate) > CACHE_EXPIRY_MS) {
        actions.updateAllCategories({ commit }, languageCode)
      }
    }).catch(err => {
      console.error(err)
    })
  },

  updateAllCategories ({ commit }, languageCode) {
    getCategoriesWorker(commit, languageCode)
  },

  activateCountryFilter ({ commit }, countryCategoryId) {
    commit(types.ACTIVATE_COUNTRY_FILTER, countryCategoryId)
  },

  deactivateCountryFilter ({ commit }, countryCategoryId) {
    commit(types.DEACTIVATE_COUNTRY_FILTER, countryCategoryId)
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
  [types.ALL_CATEGORIES_RECEIVED] (state, categoriesReceived) {
    const categories = categoriesReceived.entity
    const languageCode = categoriesReceived.languageCode
    if (!categories || !languageCode) {
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
    categoriesDb.set(ALL_CATEGORIES_DBKEY + languageCode, state.allCategories)
  },
  [types.ACTIVATE_COUNTRY_FILTER] (state, countryCategoryId) {
    state.portfolioFilters.countries.push(countryCategoryId)
  },
  [types.DEACTIVATE_COUNTRY_FILTER] (state, countryCategoryId) {
    for (let i = state.portfolioFilters.countries.length - 1; i >= 0; i--) {
      if (state.portfolioFilters.countries[i] === countryCategoryId) {
        state.portfolioFilters.countries.splice(i, 1)
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
