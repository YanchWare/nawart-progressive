import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'
import { articlesDb } from '../../utilities/localDatabaseHandler'
import { ALL_ARTICLES_DBKEY, NEWEST_ARTICLES_DBKEY, CACHE_EXPIRY_MS } from '../../utilities/constants'

// initial state
const state = {
  allArticles: null,
  newestArticles: null
}

// getters
const getters = {
  allArticles: state => state.allArticles,
  newestArticles: state => state.newestArticles
}

// actions
const actions = {
  initializeArticlesFromLocalDB ({ commit }, languageCode) {
    articlesDb.get(ALL_ARTICLES_DBKEY + languageCode).then(allArticles => {
      commit(types.ALL_ARTICLES_LOADED, allArticles)
    }).catch(err => {
      console.error(err)
    })
    articlesDb.get(NEWEST_ARTICLES_DBKEY + languageCode).then(newestArticles => {
      commit(types.NEWEST_ARTICLES_LOADED, newestArticles)
      if (!newestArticles || !newestArticles.articleSlugs || (new Date().getTime() - newestArticles.lastUpdate) > CACHE_EXPIRY_MS) {
        actions.updateNewestArticles({ commit }, {languageCode, startFromClean: !newestArticles})
      }
    }).catch(err => {
      console.error(err)
    })
  },
  updateNewestArticles ({ commit }, {languageCode, startFromClean}) {
    apiWrapper.getLatestArticles(languageCode).then(response => {
      if (response.status.code === 200 && response.entity) {
        commit(types.NEWEST_ARTICLES_RECEIVED, {entity: response.entity, languageCode, startFromClean})
      }
    }).catch(err => {
      // TODO: handle error - Notify user
      console.error(err)
    })
  },
  fetchPage ({ commit }, {pageSlug, languageCode}) {
    apiWrapper.getPage(pageSlug, languageCode).then(response => {
      if (response.status.code === 200 && response.entity) {
        commit(types.NEW_PAGE_RECEIVED, {entity: response.entity, languageCode})
      }
    }).catch(err => {
      // TODO: handle error - Notify user
      console.error(err)
    })
  }
}

// mutations
const mutations = {
  [types.NEW_PAGE_RECEIVED] (state, pageInfo) {
    if (!pageInfo) {
      return
    }
    const page = pageInfo.entity
    const languageCode = pageInfo.languageCode
    if (!page || !page.length > 0 || !languageCode) {
      return
    }
    const newAllArticles = { ...state.allArticles }
    newAllArticles[page[0].slug] = page[0]
    state.allArticles = newAllArticles
    articlesDb.set(ALL_ARTICLES_DBKEY + languageCode, state.allArticles)
  },
  [types.ALL_ARTICLES_LOADED] (state, allArticles) {
    if (allArticles) {
      state.allArticles = allArticles
    }
  },
  [types.NEWEST_ARTICLES_LOADED] (state, newestArticles) {
    if (newestArticles) {
      state.newestArticles = newestArticles
    }
  },
  [types.NEWEST_ARTICLES_RECEIVED] (state, receivedArticles) {
    if (!receivedArticles) {
      return
    }
    const articles = receivedArticles.entity
    const languageCode = receivedArticles.languageCode
    const startFromClean = receivedArticles.startFromClean
    if (!articles || !languageCode) {
      return
    }
    if (startFromClean) {
      state.allArticles = articles.reduce((previous, current) => {
        previous[current.slug] = current
        return previous
      }, {})
    } else {
      state.allArticles = articles.reduce((previous, current) => {
        previous[current.slug] = current
        return previous
      }, state.allArticles || {})
    }
    state.newestArticles = {
      articleSlugs: articles.reduce((previous, current) => {
        if (current && current.slug) {
          previous.push(current.slug)
        }
        return previous
      }, []),
      lastUpdate: new Date().getTime()

    }
    articlesDb.set(ALL_ARTICLES_DBKEY + languageCode, state.allArticles)
    articlesDb.set(NEWEST_ARTICLES_DBKEY + languageCode, state.newestArticles)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
