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
  initializeStateFromLocalDB ({ commit }) {
    articlesDb.get(ALL_ARTICLES_DBKEY).then(allArticles => {
      commit(types.ALL_ARTICLES_LOADED, allArticles)
    }).catch(err => {
      console.error(err)
    })
    articlesDb.get(NEWEST_ARTICLES_DBKEY).then(newestArticles => {
      commit(types.NEWEST_ARTICLES_LOADED, newestArticles)
      if (!newestArticles || !newestArticles.articleSlugs || (new Date().getTime() - newestArticles.lastUpdate) > CACHE_EXPIRY_MS) {
        actions.updateNewestArticles({ commit })
      }
    }).catch(err => {
      console.error(err)
    })
  },
  updateNewestArticles ({ commit }) {
    apiWrapper.getLatestArticles().then(response => {
      if (response.status.code === 200 && response.entity) {
        commit(types.NEWEST_ARTICLES_RECEIVED, response.entity)
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
    state.allArticles = allArticles
  },
  [types.NEWEST_ARTICLES_LOADED] (state, newestArticles) {
    state.newestArticles = newestArticles
  },
  [types.NEWEST_ARTICLES_RECEIVED] (state, articles) {
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
    articlesDb.set(ALL_ARTICLES_DBKEY, state.allArticles)
    articlesDb.set(NEWEST_ARTICLES_DBKEY, state.newestArticles)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
