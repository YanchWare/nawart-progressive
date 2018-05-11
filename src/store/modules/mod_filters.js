import * as types from '../mutation-types'

// initial state
const state = {
  portfolioFilters: {
    countries: [],
    medias: [],
    projects: [],
    multimedia: [],
    years: [],
    categories: [],
    authors: []
  }
}

// getters
const getters = {
  portfolioFilters: state => state.portfolioFilters
}

// actions
const actions = {
  activateCountryFilter ({ commit }, countryCategoryId) {
    commit(types.ACTIVATE_COUNTRY_FILTER, countryCategoryId)
  },
  deactivateCountryFilter ({ commit }, countryCategoryId) {
    commit(types.DEACTIVATE_COUNTRY_FILTER, countryCategoryId)
  },

  activateMediaFilter ({ commit }, mediaCategoryId) {
    commit(types.ACTIVATE_MEDIA_FILTER, mediaCategoryId)
  },
  deactivateMediaFilter ({ commit }, mediaCategoryId) {
    commit(types.DEACTIVATE_MEDIA_FILTER, mediaCategoryId)
  },

  activateProjectFilter ({ commit }, projectCategoryId) {
    commit(types.ACTIVATE_PROJECT_FILTER, projectCategoryId)
  },
  deactivateProjectFilter ({ commit }, projectCategoryId) {
    commit(types.DEACTIVATE_PROJECT_FILTER, projectCategoryId)
  },

  activateMultimediaFilter ({ commit }, multimediaCategoryId) {
    commit(types.ACTIVATE_MULTIMEDIA_FILTER, multimediaCategoryId)
  },
  deactivateMultimediaFilter ({ commit }, multimediaCategoryId) {
    commit(types.DEACTIVATE_MULTIMEDIA_FILTER, multimediaCategoryId)
  },

  activateYearFilter ({ commit }, yearCategoryId) {
    commit(types.ACTIVATE_YEAR_FILTER, yearCategoryId)
  },
  deactivateYearFilter ({ commit }, yearCategoryId) {
    commit(types.DEACTIVATE_YEAR_FILTER, yearCategoryId)
  },

  activateAuthorFilter ({ commit }, authorCategoryId) {
    commit(types.ACTIVATE_AUTHOR_FILTER, authorCategoryId)
  },
  deactivateAuthorFilter ({ commit }, authorCategoryId) {
    commit(types.DEACTIVATE_AUTHOR_FILTER, authorCategoryId)
  }
}

// mutations
const mutations = {
  [types.ACTIVATE_COUNTRY_FILTER] (state, countryCategoryId) {
    state.portfolioFilters.countries.push(countryCategoryId)
  },
  [types.DEACTIVATE_COUNTRY_FILTER] (state, countryCategoryId) {
    const indexOfItemToRemove = state.portfolioFilters.countries.indexOf(countryCategoryId)
    if (indexOfItemToRemove > -1) {
      state.portfolioFilters.countries.splice(indexOfItemToRemove, 1)
    }
  },

  [types.ACTIVATE_MEDIA_FILTER] (state, mediaCategoryId) {
    state.portfolioFilters.medias.push(mediaCategoryId)
  },
  [types.DEACTIVATE_MEDIA_FILTER] (state, mediaCategoryId) {
    const indexOfItemToRemove = state.portfolioFilters.medias.indexOf(mediaCategoryId)
    if (indexOfItemToRemove > -1) {
      state.portfolioFilters.medias.splice(indexOfItemToRemove, 1)
    }
  },

  [types.ACTIVATE_PROJECT_FILTER] (state, projectCategoryId) {
    state.portfolioFilters.projects = [projectCategoryId]
  },
  [types.DEACTIVATE_PROJECT_FILTER] (state, projectCategoryId) {
    state.portfolioFilters.projects = []
  },

  [types.ACTIVATE_MULTIMEDIA_FILTER] (state, multimediaCategoryId) {
    state.portfolioFilters.multimedia.push(multimediaCategoryId)
  },
  [types.DEACTIVATE_MULTIMEDIA_FILTER] (state, multimediaCategoryId) {
    const indexOfItemToRemove = state.portfolioFilters.multimedia.indexOf(multimediaCategoryId)
    if (indexOfItemToRemove > -1) {
      state.portfolioFilters.multimedia.splice(indexOfItemToRemove, 1)
    }
  },

  [types.ACTIVATE_YEAR_FILTER] (state, yearCategoryId) {
    state.portfolioFilters.years.push(yearCategoryId)
  },
  [types.DEACTIVATE_YEAR_FILTER] (state, yearCategoryId) {
    const indexOfItemToRemove = state.portfolioFilters.years.indexOf(yearCategoryId)
    if (indexOfItemToRemove > -1) {
      state.portfolioFilters.years.splice(indexOfItemToRemove, 1)
    }
  },

  [types.ACTIVATE_AUTHOR_FILTER] (state, authorCategoryId) {
    state.portfolioFilters.authors.push(authorCategoryId)
  },
  [types.DEACTIVATE_AUTHOR_FILTER] (state, authorCategoryId) {
    const indexOfItemToRemove = state.portfolioFilters.authors.indexOf(authorCategoryId)
    if (indexOfItemToRemove > -1) {
      state.portfolioFilters.authors.splice(indexOfItemToRemove, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
