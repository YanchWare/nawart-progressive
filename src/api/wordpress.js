import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime)
const filterEndpoint = 'http://nawartpress.com/wp-json/wp/v2/categories?page='
const articleEndpoint = 'http://nawartpress.com/wp-json/wp/v2/posts'

const mediaEndpoint = 'http://nawartpress.com/wp-json/wp/v2/media/'

const getMedia = (mediaId) => {
  return client({
    path: mediaEndpoint + mediaId,
    method: 'GET'
  })
}

const getFilters = (page) => {
  return client({
    path: filterEndpoint + page,
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
  getFilters,
  getLatestArticles
}
