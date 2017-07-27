<template>
  <div>
    <div v-if="newestArticles && allArticles">
      <div class="row text-center">
        <div class="small-12 columns">
          <ArticleExcerpt :story="allArticles[newestArticles.articleSlugs[0]]"/>
        </div>
        <hr/>
      </div>
      <div class="row">
        <div class="large-8 small-12 columns">
          <FourExcerpts :stories="[allArticles[newestArticles.articleSlugs[1]], allArticles[newestArticles.articleSlugs[2]], allArticles[newestArticles.articleSlugs[3]], allArticles[newestArticles.articleSlugs[4]]]"/>
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
import FourExcerpts from '../components/FourExcerpts'
import TwitterWidget from '../components/TwitterWidget'
import AboutNawart from '../components/AboutNawart'
import ContactsMap from '../components/ContactsMap'
import Magazine from '../components/Magazine'
import Loading from '../components/Loading'
import { mapGetters } from 'vuex'

export default {
  name: 'frontpage',
  computed: mapGetters({
    newestArticles: 'newestArticles',
    allArticles: 'allArticles'
  }),

  data () {
    return {
    }
  },

  created () {
  },

  components: {
    ArticleExcerpt,
    FourExcerpts,
    TwitterWidget,
    Loading,
    AboutNawart,
    ContactsMap,
    Magazine
  }
}
</script>

<style scoped>
  .loading {
    margin-top: 70vh;
  }
</style>