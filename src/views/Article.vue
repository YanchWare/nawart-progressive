<template>
  <div class="post">
    <div v-if="article">
      <div class="row">
        <div class="small-12 columns">
          <span class="categories" v-html="categoriesHtml"></span>-<span class="datetime">{{ new Date(article.date) | ISODate}}</span>
          <h1 id="title" v-html="article.title.rendered"></h1>
          <h2 id="author" v-html="author"></h2>
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
import { mapGetters, mapActions } from 'vuex'
import { getCategories } from '../utilities/apiSupport'

export default {
  name: 'article-view',
  computed: mapGetters({
    allArticles: 'allArticles',
    allCategories: 'allCategories',
    allAuthors: 'allAuthors'
  }),

  components: {
    Loading
  },

  data () {
    return {
      loading: false,
      article: null,
      author: null,
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
    'allCategories': 'render',
    'allAuthors': 'render'
  },

  methods: {
    ...mapActions([
      'fetchArticle'
    ]),
    render () {
      if (this.allArticles) {
        const articleSlug = this.$route.params.articleSlug
        const article = this.allArticles[articleSlug]
        if (article) {
          this.article = article
          if (this.allCategories) {
            this.categoriesHtml = getCategories(this.article.categories, this.allCategories.categoriesById)
          }
          if (this.allCategories) {
            this.author = this.allAuthors.authorsById[article.author].name
          }
        }
        if (!article || ((Date.now - article.lastUpdated) / 3.6e6) > 5) {
          this.fetchContents(articleSlug)
        }
      }
    },

    fetchContents (articleSlug) {
      this.fetchArticle({articleSlug, languageCode: this.$i18n.locale()})
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

.datetime, .categories {
  display: inline-block;
}

.datetime {
  padding-left: 20px
} 

.categories {
  padding-right: 20px
}

</style>