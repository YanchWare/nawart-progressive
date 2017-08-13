import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime)
const baseEndpoint = '//nawartpress.com/'
const categoryEndpoint = 'wp-json/wp/v2/categories'
const articleEndpoint = 'wp-json/wp/v2/posts'
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
    if (current && current.id) {
      previous.push(current.id)
    }
    return previous
  }, []) : {}
  return client({
    path: baseEndpoint + (languageCode === 'en' ? '' : languageCode + '/') + articleEndpoint + (articlesIds.count > 0 ? '?exclude=' + articlesIds.toString().replace(/\[\]/g, '') : ''),
    method: 'GET'
  })
}

module.exports = {
  getMedia,
  getLatestArticles,
  getAllCategories
}
