<template>
  <div>
    <div v-if="newestArticles && allArticles">
      <div class="row text-center">
        <div class="small-12 columns">
          <ArticleExcerpt :story="latestNonBlogArticles[0]" :categories="allCategories"/>
        </div>
        <hr/>
      </div>
      <div class="row">
        <div class="large-8 small-12 columns">
          <TwoExcerpts 
            :stories="[latestNonBlogArticles[1], latestNonBlogArticles[2]]" :categories="allCategories"/>
          <TwoExcerpts 
            :stories="[latestNonBlogArticles[3], latestNonBlogArticles[4]]" :categories="allCategories"/>
        </div>
        <div class="large-4 small-12 columns">
          <TwitterWidget/>
        </div>
      </div>
      <div class="row">
        <AboutNawart></AboutNawart>
      </div>
    </div>
    <div v-else class="loading">
      <Loading/>
    </div>
    <Magazine/>
    <ContactsMap/>
  </div>
</template>

<script>
import ArticleExcerpt from '../components/ArticleExcerpt'
import TwoExcerpts from '../components/TwoExcerpts'
import TwitterWidget from '../components/TwitterWidget'
import AboutNawart from '../components/AboutNawart'
import ContactsMap from '../components/ContactsMap'
import Magazine from '../components/Magazine'
import Loading from '../components/Loading'
import { mapGetters } from 'vuex'
import { BLOG_CATEGORY_ID } from '../utilities/constants'

export default {
  name: 'frontpage',
  computed: {
    ...mapGetters({
      newestArticles: 'newestArticles',
      allArticles: 'allArticles',
      allCategories: 'allCategories'
    }),
    orderedArticles  () {
      if (!this.allArticles) {
        return null
      }
      return Object.keys(this.allArticles).filter(value => {
        return this.allArticles[value] &&
          this.allArticles[value].categories &&
          this.allArticles[value].categories.indexOf(BLOG_CATEGORY_ID) === -1
      }).reduce((previous, current) => {
        previous.push(this.allArticles[current])
        return previous
      }, []).sort((articleA, articleB) => {
        return new Date(articleB.date) - new Date(articleA.date)
      })
    },
    // TODO: Optimize this by having a featured article in the state
    latestNonBlogArticles () {
      if (!this.orderedArticles) {
        return null
      }
      return this.orderedArticles.filter((article) => {
        return article.categories && article.categories.indexOf(BLOG_CATEGORY_ID) === -1
      })
    }
  },

  components: {
    ArticleExcerpt,
    TwoExcerpts,
    TwitterWidget,
    Loading,
    AboutNawart,
    ContactsMap,
    Magazine
  }
}
</script>

<style scoped>
</style>