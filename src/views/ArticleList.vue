<template>
  <div>
    <excerpt-list :category-id="categoryId"/>
    <Loading v-if="articleLoading"/>
  </div>
</template>

<script>
import ExcerptList from '../components/Generic/ExcerptList'
import Loading from '../components/Generic/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'article-list',

  props: ['categoryId'],

  computed: mapGetters({
    articleLoading: 'articleLoading'
  }),

  components: {
    ExcerptList,
    Loading
  },

  mounted () {
    const options = {
      onBottomIn: () => {
        this.fetchMoreArticles()
      }
    }
    window.$('#footer').scrollfire(options)
  },
  methods: {
    ...mapActions([
      'fetchArticles'
    ]),
    fetchMoreArticles () {
      this.olderNumberOfArticles = this.allArticles ? Object.keys(this.allArticles).length : 0
      this.fetchArticles({
        languageCode: this.$i18n.locale(),
        startFromClean: false,
        filters: {
          countries: [],
          projects: [],
          categories: [this.categoryId]
        }
      })
    }
  }

}
</script>

<style scoped>
</style>
