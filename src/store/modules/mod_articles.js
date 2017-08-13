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
        actions.updateNewestArticles({ commit }, languageCode)
      }
    }).catch(err => {
      console.error(err)
    })
  },
  updateNewestArticles ({ commit }, languageCode) {
    apiWrapper.getLatestArticles(languageCode).then(response => {
      if (response.status.code === 200 && response.entity) {
        commit(types.NEWEST_ARTICLES_RECEIVED, {entity: response.entity, languageCode})
      }
    }).catch(err => {
      // TODO: handle error - Notify user
      console.error(err)
    })
  }
}

// mutations
const mutations = {
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
    const articles = receivedArticles.entity
    const languageCode = receivedArticles.languageCode
    if (!articles || !languageCode) {
      return
    }
    console.log(articles)
    articles.map(article => {
      const newAllArticles = { ...state.allArticles }
      newAllArticles[article.slug] = article
      state.allArticles = newAllArticles
    })
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
