import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'
import { authorsDb } from '../../utilities/localDatabaseHandler'
import { ALL_AUTHORS_DBKEY, CACHE_EXPIRY_MS } from '../../utilities/constants'

// initial state
const state = {
  allAuthors: {
    authorsById: []
  }
}

// getters
const getters = {
  allAuthors: state => state.allAuthors
}

const getAuthorsWorker = (commit, languageCode, page = 1) => {
  apiWrapper.getAllAuthors(languageCode, page).then(function (response) {
    commit(types.ALL_AUTHORS_RECEIVED, {entity: response.entity, languageCode})
    let totalPages = response.headers['X-Wp-Totalpages']
    if (page < totalPages) {
      apiWrapper.getAllAuthors(commit, languageCode, ++page)
    }
  })
}

// actions
const actions = {
  initializeAuthorsFromLocalDB ({ commit }, languageCode) {
    authorsDb.get(ALL_AUTHORS_DBKEY + languageCode).then(allAuthors => {
      commit(types.ALL_AUTHORS_LOADED, allAuthors)
      if (!allAuthors || !allAuthors.authorsById || (new Date().getTime() - allAuthors.lastUpdate) > CACHE_EXPIRY_MS) {
        actions.updateAllAuthors({ commit }, languageCode)
      }
    }).catch(err => {
      console.error(err)
    })
  },

  updateAllAuthors ({ commit }, languageCode) {
    getAuthorsWorker(commit, languageCode)
  }
}

// mutations
const mutations = {
  [types.ALL_AUTHORS_LOADED] (state, allAuthors) {
    if (allAuthors) {
      state.allAuthors.authorsById = allAuthors.authorsById
      state.allAuthors = allAuthors
    }
  },
  [types.ALL_AUTHORS_RECEIVED] (state, authorsReceived) {
    const authors = authorsReceived.entity
    const languageCode = authorsReceived.languageCode
    if (!authors || !languageCode) {
      return
    }
    let newAuthorsById = authors.reduce((previous, current) => {
      if (current && current.id) {
        previous[current.id] = current
      }
      return previous
    }, {})

    state.allAuthors = {
      authorsById: Object.assign(state.allAuthors.authorsById, newAuthorsById),
      lastUpdate: new Date().getTime()
    }
    authorsDb.set(ALL_AUTHORS_DBKEY + languageCode, state.allAuthors)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
