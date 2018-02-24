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

const getThumbnail = (featuredMedia) => {
  return apiWrapper.getMedia(featuredMedia).then(response => {
    if (response.entity.media_details && response.entity.media_details.sizes.medium) {
      return response.entity.media_details.sizes.medium.source_url
    }
    if (response.entity.media_details && response.entity.media_details.sizes['post-thumbnail']) {
      return response.entity.media_details.sizes['post-thumbnail'].source_url
    }
    if (response.entity.media_details && response.entity.media_details.sizes.thumbnail) {
      return response.entity.media_details.sizes.thumbnail.source_url
    }
    return response.entity.source_url
  })
}

const getCategories = (categoryIds, categories) => {
  if (!categoryIds || !categories) {
    return ''
  }
  const ret = categoryIds.reduce((previous, current) => {
    if (current && categories[current] && current !== 1) {
      return previous + ', ' + categories[current].name
    } else {
      return previous
    }
  }, '').substring(1)
  return ret
}

module.exports = {
  getMedia,
  getThumbnail,
  getCategories
}
