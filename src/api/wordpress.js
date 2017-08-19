import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime)
const baseEndpoint = '//nawartpress.com/'
const categoryEndpoint = 'wp-json/wp/v2/categories'
const articleEndpoint = 'wp-json/wp/v2/posts'
const pageEndpoint = 'wp-json/wp/v2/pages'
const mediaEndpoint = 'wp-json/wp/v2/media/'

// TODO: Cache in IndexDB
const getMedia = (mediaId) => {
  return client({
    path: baseEndpoint + mediaEndpoint + mediaId,
    method: 'GET'
  })
}

const getAllCategories = (languageCode, page) => {
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + categoryEndpoint + '?page=' + page,
    method: 'GET'
  })
}

const getLatestArticles = (languageCode, allArticles) => {
  const articlesIds = allArticles ? Object.keys(allArticles).reduce((previous, current) => {
    if (current && allArticles[current].id) {
      previous.push(allArticles[current].id)
    }
    return previous
  }, []) : []
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + articleEndpoint + (articlesIds.length > 0 ? '?exclude=' + articlesIds.toString().replace(/\[\]/g, '') : ''),
    method: 'GET'
  })
}

const getPage = (pageSlug, languageCode) => {
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + pageEndpoint + '?slug=' + pageSlug,
    method: 'GET'
  })
}

module.exports = {
  getMedia,
  getLatestArticles,
  getAllCategories,
  getPage
}
