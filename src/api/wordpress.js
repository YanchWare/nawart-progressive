import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime)
const categoryEndpoint = '//nawartpress.com/wp-json/wp/v2/categories'
const articleEndpoint = '//nawartpress.com/wp-json/wp/v2/posts'

const mediaEndpoint = '//nawartpress.com/wp-json/wp/v2/media/'

// TODO: Cache in IndexDB
const getMedia = (mediaId) => {
  return client({
    path: mediaEndpoint + mediaId,
    method: 'GET'
  })
}

const getAllCategories = (page) => {
  return client({
    path: categoryEndpoint + '?page=' + page,
    method: 'GET'
  })
}

const getLatestArticles = (allArticles) => {
  const articlesIds = allArticles ? Object.keys(allArticles).reduce((previous, current) => {
    if (current && current.id) {
      previous.push(current.id)
    }
    return previous
  }, []) : {}
  return client({
    path: articleEndpoint + (articlesIds.count > 0 ? '?exclude=' + articlesIds.toString().replace(/\[\]/g, '') : ''),
    method: 'GET'
  })
}

module.exports = {
  getMedia,
  getLatestArticles,
  getAllCategories
}
