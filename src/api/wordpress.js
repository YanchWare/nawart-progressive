import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime)
const baseEndpoint = '//nawartpress.com/'
const categoryEndpoint = 'wp-json/wp/v2/categories'
const articleEndpoint = 'wp-json/wp/v2/posts'
const pageEndpoint = 'wp-json/wp/v2/pages'
const mediaEndpoint = 'wp-json/wp/v2/media/'
const authorEndpoint = 'wp-json/wp/v2/users/'

// TODO: Cache in IndexDB
const getMedia = (mediaId) => {
  return client({
    path: baseEndpoint + mediaEndpoint + mediaId,
    method: 'GET'
  })
}

const getAllAuthors = (languageCode, page) => {
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + authorEndpoint + '?page=' + page,
    method: 'GET'
  })
}

const getAllCategories = (languageCode, page) => {
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + categoryEndpoint + '?page=' + page,
    method: 'GET'
  })
}

const getLatestArticles = (languageCode, allArticles, filters) => {
  return client({
    path: buildPostsPath(languageCode, allArticles, filters),
    method: 'GET'
  })
}

const getPage = (pageSlug, languageCode) => {
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + pageEndpoint + '?slug=' + pageSlug,
    method: 'GET'
  })
}

const buildPostsPath = (languageCode, allArticles, portfolioFilters) => {
  const articlesIds = allArticles ? Object.keys(allArticles).reduce((previous, current) => {
    if (current && allArticles[current].id) {
      previous.push(allArticles[current].id)
    }
    return previous
  }, []) : []

  const categories = portfolioFilters ? portfolioFilters.countries.concat(portfolioFilters.projects) : []

  // Base path
  let path = baseEndpoint
  // If current language is english we should omit the language code
  path += languageCode === 'en' ? '' : languageCode + '/'
  // posts endpoint
  path += articleEndpoint
  // add list of articles we already have
  const excludeParam = articlesIds.length > 0 ? 'exclude=' + articlesIds.toString().replace(/\[\]/g, '') : null
  path = excludeParam ? addParamToPath(path, excludeParam) : path
  // add list of categories based on the current filters
  const categoriesParam = categories.length > 0 ? 'categories=' + categories.toString().replace(/\[\]/g, '') : null
  path = categoriesParam ? addParamToPath(path, categoriesParam) : path

  return path
}

const addParamToPath = (path, param) => {
  return path.indexOf('?') > -1 ? path + '&' + param : path + '?' + param
}

module.exports = {
  getMedia,
  getLatestArticles,
  getAllCategories,
  getAllAuthors,
  getPage
}
