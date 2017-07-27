<template>
  <div>
    <div v-if="newestArticles && allArticles">
      <div class="row text-center">
        <div class="small-12 columns">
          <ArticleExtract :story="allArticles[newestArticles.articleSlugs[0]]"/>
        </div>
        <hr/>
      </div>
      <div class="row">
        <div class="large-8 small-12 columns">
          <FourExtracts/>
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
  </div>
</template>

<script>
import ArticleExtract from '../components/ArticleExtract'
import FourExtracts from '../components/FourExtracts'
import TwitterWidget from '../components/TwitterWidget'
import AboutNawart from '../components/AboutNawart'
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
    ArticleExtract,
    FourExtracts,
    TwitterWidget,
    Loading,
    AboutNawart
  }
}
</script>

<style scoped>
  .loading {
    margin-top: 40vh;
  }
</style>