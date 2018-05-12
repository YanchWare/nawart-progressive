import apiWrapper from '../../api/wordpress'
import * as types from '../mutation-types'
import { articlesDb } from '../../utilities/localDatabaseHandler'
import { ALL_ARTICLES_DBKEY, NEWEST_ARTICLES_DBKEY, CACHE_EXPIRY_MS } from '../../utilities/constants'

// initial state
const state = {
  allArticles: null,
  newestArticles: null,
  articleLoading: false
}

// getters
const getters = {
  allArticles: state => state.allArticles,
  newestArticles: state => state.newestArticles,
  articleLoading: state => state.articleLoading
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
        actions.fetchArticles({ commit }, {languageCode, startFromClean: !newestArticles, type: types.NEWEST_ARTICLES_RECEIVED})
      }
    }).catch(err => {
      console.error(err)
    })
  },

  fetchArticles ({ state, commit }, {languageCode, startFromClean, type, filters}) {
    const allArticles = state ? state.allArticles : null
    apiWrapper.getLatestArticles(languageCode, (startFromClean ? null : allArticles), filters).then(response => {
      if (response.status.code === 200 && response.entity) {
        // TODO: As in categories understand when we should stop fetching articles
        commit(type || types.NEW_ARTICLES_RECEIVED, {entity: response.entity, languageCode, startFromClean})
      }
    }).catch(err => {
      // TODO: handle error - Notify user
      console.error(err)
    })
    commit(type || types.NEW_ARTICLES_REQUESTED)
  },

  fetchArticle ({ commit }, {articleSlug, languageCode}) {
    apiWrapper.getPost(articleSlug, languageCode).then(response => {
      if (response.status.code === 200 && response.entity) {
        commit(types.NEW_ARTICLE_RECEIVED, {entity: response.entity, languageCode})
      } else if (response.status.code === 404) {
        commit(types.ARTICLE_REMOVED, {articleSlug, languageCode})
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
      } else if (response.status.code === 404) {
        commit(types.PAGE_REMOVED, {pageSlug, languageCode})
      }
    }).catch(err => {
      // TODO: handle error - Notify user
      console.error(err)
    })
  }
}

// mutations
const mutations = {
  [types.NEW_ARTICLES_REQUESTED] (state) {
    state.articleLoading = true
  },
  [types.NEW_PAGE_RECEIVED] (state, pageInfo) {
    addNewContents(state, pageInfo)
  },
  [types.NEW_ARTICLE_RECEIVED] (state, articleInfo) {
    addNewContents(state, articleInfo)
  },
  [types.PAGE_REMOVED] (state, pageInfo) {
    removeContents(state, pageInfo)
  },
  [types.ARTICLE_REMOVED] (state, articleInfo) {
    removeContents(state, articleInfo)
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
  },
  [types.NEW_ARTICLES_RECEIVED] (state, receivedArticles) {
    if (!receivedArticles) {
      return
    }
    const articles = receivedArticles.entity
    const languageCode = receivedArticles.languageCode
    const startFromClean = receivedArticles.startFromClean
    if (!articles || !languageCode) {
      return
    }
    let newArticles = null
    if (startFromClean) {
      newArticles = articles.reduce((previous, current) => {
        previous[current.slug] = current
        return previous
      }, {})
    } else {
      newArticles = articles.reduce((previous, current) => {
        previous[current.slug] = current
        return previous
      }, state.allArticles || {})
    }

    state.allArticles = {
      ...newArticles
    }
    state.articleLoading = false

    articlesDb.set(ALL_ARTICLES_DBKEY + languageCode, state.allArticles)
  }
}

// Private helpers

const addNewContents = (state, contentInfo) => {
  if (!contentInfo) {
    return
  }
  const content = contentInfo.entity
  const languageCode = contentInfo.languageCode
  if (!content || !content.length > 0 || !languageCode) {
    return
  }
  content.lastUpdated = Date.now()
  const newAllArticles = { ...state.allArticles }
  newAllArticles[content[0].slug] = content[0]
  state.allArticles = newAllArticles
  articlesDb.set(ALL_ARTICLES_DBKEY + languageCode, state.allArticles)
}

const removeContents = (state, {contentSlug, languageCode}) => {
  const newAllArticles = { ...state.allArticles }
  delete newAllArticles[contentSlug]
  state.allArticles = newAllArticles
  articlesDb.delete(ALL_ARTICLES_DBKEY + languageCode)
}

export default {
  state,
  getters,
  actions,
  mutations
}
