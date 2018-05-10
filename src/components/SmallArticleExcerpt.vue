<template>
  <div id="top-extract">
    <div v-if="story && story.type !== 'page'" class="row align-center">
      <div class="img small-12 columns">
        <img :src="mediaUrl"/>
      </div>
      <div class="small-12 columns">
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
    </div>
    <div v-else class="row align-center"><Loading/></div>
  </div>
</template>

<script>
  import { getThumbnail, getCategories } from '../utilities/apiSupport'
import Loading from '../components/Generic/Loading'

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
        getThumbnail(this.story.featured_media).then(mediaUrl => {
          this.mediaUrl = mediaUrl
        }).catch(err => {
          console.error(err)
        })
      }
    },

    updated () {
      this.updated()
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

.extract {
  overflow: hidden;
}
</style>