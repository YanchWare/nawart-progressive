<template>
  <div class="page">
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
  props: ['allArticles', 'pageSlug', 'locale'],

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
    'allArticles': 'render'
  },

  methods: {
    ...mapActions([
      'fetchPage'
    ]),
    render () {
      if (this.allArticles) {
        const article = this.allArticles[this.pageSlug]
        if (article) {
          this.article = article
          return
        }
      }
      this.fetchContents(this.pageSlug)
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