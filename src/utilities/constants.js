const FACEBOOK_APP_ID = 'FacebookAppId'

const CACHE_EXPIRY_MS = 1 * 3600 * 1000 // 1 hour

// Local database keys
const NEWEST_ARTICLES_DBKEY = 'NEWEST_ARTICLES_DBKEY'
const ALL_ARTICLES_DBKEY = 'ALL_ARTICLES_DBKEY'
const ALL_CATEGORIES_DBKEY = 'ALL_CATEGORIES_DBKEY'
const ALL_STATISTICS_DBKEY = 'ALL_STATISTICS_DBKEY'
const ALL_AUTHORS_DBKEY = 'ALL_AUTHORS_DBKEY'

// Portfolio filter types
const FILTER_COUNTRY_TYPE = 'FILTER_COUNTRY_TYPE'
const FILTER_MEDIA_TYPE = 'FILTER_MEDIA_TYPE'
const FILTER_PROJECT_TYPE = 'FILTER_PROJECT_TYPE'
const FILTER_MULTIMEDIA_TYPE = 'FILTER_MULTIMEDIA_TYPE'
const FILTER_YEAR_TYPE = 'FILTER_YEAR_TYPE'
const FILTER_AUTHOR_TYPE = 'FILTER_AUTHOR_TYPE'

// Categories
const BLOG_CATEGORY_ID = 9
const CONSULTANCIES_CATEGORY_ID = 937

// Pages
const CONSULTANCES_INTRO_SLUG = 'nawart-pwa-consultances'

module.exports = {
  NEWEST_ARTICLES_DBKEY,
  ALL_ARTICLES_DBKEY,
  ALL_CATEGORIES_DBKEY,
  ALL_AUTHORS_DBKEY,
  CACHE_EXPIRY_MS,
  FACEBOOK_APP_ID,
  FILTER_COUNTRY_TYPE,
  FILTER_MEDIA_TYPE,
  FILTER_PROJECT_TYPE,
  FILTER_MULTIMEDIA_TYPE,
  FILTER_YEAR_TYPE,
  FILTER_AUTHOR_TYPE,
  ALL_STATISTICS_DBKEY,
  BLOG_CATEGORY_ID,
  CONSULTANCIES_CATEGORY_ID,
  CONSULTANCES_INTRO_SLUG
}
