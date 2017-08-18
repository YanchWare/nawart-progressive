<template>
  <div id="top-extract">
    <div class="row align-center">
      <div class="img small-12 columns">
        <img :src="mediaUrl"/>
      </div>
      <div v-if="story" class="small-12 columns">
        <div class="article-information">
          <span class="categories" v-html="categoriesHtml"></span>
          -
          <span class="datetime">{{ new Date(story.date) | ISODate}}</span>
        </div>
        <div class="article-title">
          <router-link :to="'/' + story.slug"><h2 v-html="story.title.rendered"></h2></router-link>
        </div>
        <div class="testata">
          <img v-if="story.fields.testata_giornalistica" :src="'//nawartpress.com/' + story.fields.testata_giornalistica">
        </div>
        <div class="extract">
          <span v-html="story.excerpt.rendered"></span>
        </div>
      </div>
      <div v-else class="small-12 columns"><Loading/></div>
    </div>
  </div>
</template>

<script>
  import { getMedia, getCategories } from '../utilities/apiSupport'
  import Loading from '../components/Loading'

  export default {
    name: 'smallArticleExcerpt',
    props: ['story', 'categories'],
    data () {
      return {
        mediaUrl: null,
        categoriesHtml: ''
      }
    },

    components: {
      Loading
    },

    mounted () {
      if (this.story) {
        getMedia(this.story.featured_media).then(mediaUrl => {
          this.mediaUrl = mediaUrl
        }).catch(err => {
          console.error(err)
        })
      }
    },

    watch: {
      // call again the method if the route changes
      'categories': 'updated'
    },

    methods: {
      updated () {
        if (this.categories) {
          this.categoriesHtml = getCategories(this.story.categories, this.categories.categoriesById)
        }
      }
    }
  }
</script>

<style scoped>
#top-extract .img {
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
}

.testata img {
  max-height: 50px;
}

.categories {
  text-transform: uppercase;
}
</style>