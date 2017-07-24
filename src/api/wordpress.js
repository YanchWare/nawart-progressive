import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime)
const filterEndpoint = 'http://nawartpress.com/wp-json/wp/v2/categories?page='
const articleEndpoint = 'http://nawartpress.com/wp-json/wp/v2/posts?per_page=100&page='

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

const getArticles = (page) => {
  return client({
    path: articleEndpoint + page,
    method: 'GET'
  })
}

module.exports = {
  getMedia,
  getFilters,
  getArticles
}
