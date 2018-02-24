<template>
  <div class="post">
    <div v-if="article">
      <div class="row">
        <div class="small-12 columns">
          <span class="categories" v-html="categoriesHtml"></span>
          <h1 id="title" v-html="article.title.rendered"></h1>
          <div class="contents" v-html="article.content.rendered"></div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Generic/Loading'
import { mapGetters } from 'vuex'
import { getCategories } from '../utilities/apiSupport'

export default {
  name: 'article-view',
  computed: mapGetters({
    allArticles: 'allArticles',
    allCategories: 'allCategories'
  }),

  components: {
    Loading
  },

  data () {
    return {
      loading: false,
      article: null,
      categoriesHtml: ''
    }
  },

  created () {
    this.render()
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    'allArticles': 'render',
    'allCategories': 'render'
  },

  methods: {
    render () {
      if (this.allArticles) {
        const article = this.allArticles[this.$route.params.articleSlug]
        if (article) {
          this.article = article
          // TODO check last update and if too old request an update from backend
          if (this.allCategories) {
            this.categoriesHtml = getCategories(this.article.categories, this.allCategories.categoriesById)
          }
          return
        }
      }
      this.fetchContents()
    },

    fetchContents () {

    }
  }
}

</script>

<style scope>
.post {
  padding: 25px;
}
h1 {
  font-size: 66px;
  line-height: 72px;
  word-break: normal;
}
.categories {
  text-transform: uppercase;
}
</style>