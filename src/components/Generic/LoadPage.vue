<template>
  <div class="page">
    <div v-if="showTitle">
      <h2>{{article.title.rendered}}</h2>
    </div>
    <div v-if="article" v-html="article.content.rendered">
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import Loading from '../../components/Generic/Loading'
import { mapActions } from 'vuex'

export default {
  name: 'Load-Page',
  props: ['allArticles', 'pageSlug', 'locale', 'showTitle'],

  components: {
    Loading
  },

  data () {
    return {
      loading: false,
      article: null
    }
  },

  created () {
    this.render()
  },

  watch: {
    'allArticles': 'render',
    'pageSlug': 'render'
  },

  methods: {
    ...mapActions([
      'fetchPage'
    ]),
    render () {
      let article = null
      if (this.allArticles) {
        article = this.allArticles[this.pageSlug]
        if (article) {
          this.article = article
        }
      }
      if (!article || ((Date.now - article.lastUpdated) / 3.6e6) > 5) {
        this.fetchContents(this.pageSlug)
      }
    },

    fetchContents (pageSlug) {
      this.fetchPage({pageSlug, languageCode: this.locale})
    }
  }
}
</script>

<style scoped>
.contents{
  margin-top: 5%;
}
</style>