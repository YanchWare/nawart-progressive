<template>
  <div class="top-extract">
    <div v-if="story && story.type !== 'page'" class="align-center">
      <div class="row">
        <div class="img small-12 columns">
          <img :src="mediaUrl"/>
        </div>
      </div>
      <div class="row">
        <div class="small-12 columns">
          <div class="categories" v-html="categoriesHtml"/>
        </div>
      </div>
      <div class="row">
        <div class="small-12 columns">
          <div class="datetime">{{ new Date(story.date) | ISODate}}</div>
        </div>
      </div>
      <div class="row">
        <div class="small-12 columns">
          <div class="article-title">
            <router-link :to="'/' + story.slug"><h2 v-html="story.title.rendered"></h2></router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="small-12 columns">
          <div class="testata">
            <img v-if="story.fields.testata_giornalistica" :src="'//nawartpress.com/' + story.fields.testata_giornalistica">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="small-12 columns">
          <div class="extract">
            <span v-html="story.excerpt.rendered"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getThumbnail, getCategories } from '../../utilities/apiSupport'
  import Loading from './Loading'

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
        if (this.categories && this.story) {
          this.categoriesHtml = getCategories(this.story.categories, this.categories.categoriesById)
        }
      }
    }
  }
</script>

<style scoped>
.top-extract {
  width: 100%;
}
.top-extract .img {
  max-height: 300px;
  overflow: hidden;
  margin: auto;
  margin-bottom: 20px;
}

.testata img {
  max-height: 50px;
}

.extract {
  overflow: hidden;
}

.row, .columns {
  margin: 0;
  text-align: center;
}

.datetime, .categories {
  text-transform: uppercase;
  font-size: 0.5em;
  display: block;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 20px;
}

</style>