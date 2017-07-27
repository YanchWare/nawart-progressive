import apiWrapper from '../api/wordpress'

const getMedia = (featuredMedia) => {
  return apiWrapper.getMedia(featuredMedia).then(response => {
    if (response.entity.media_details) {
      if (response.entity.media_details.sizes.full) {
        return response.entity.media_details.sizes.full.source_url
      } else if (response.entity.media_details.sizes.medium) {
        return response.entity.media_details.sizes.medium.source_url
      } else if (response.entity.media_details.sizes['post-thumbnail']) {
        return response.entity.media_details.sizes['post-thumbnail'].source_url
      } else if (response.entity.media_details.sizes.thumbnail) {
        return response.entity.media_details.sizes.thumbnail.source_url
      }
    } else {
      return response.entity.source_url
    }
  })
}

const getCategories = (categoryIds) => {
  return Promise.all(apiWrapper.getCategories(categoryIds)).then(categories => {
    return categories.map(category => {
      if (category) {
        return category.entity.name
      }
    }).reduce((previous, current) => {
      if (current) {
        return previous + ', ' + current
      } else {
        return previous
      }
    }, '').substring(1)
  })
}

module.exports = {
  getMedia,
  getCategories
}
