<template>
  <div>
    <div v-if="blogArticles">
      <div class="row text-center" v-for="story in blogArticles" :key="story.id">
        <div class="small-12 columns">
          <ArticleExcerpt :story="story" :categories="allCategories"/>
          <hr />
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <Loading/>
    </div>
  </div>
</template>

<script>
import ArticleExcerpt from '../components/ArticleExcerpt'
import Loading from '../components/Loading'
import { BLOG_CATEGORY_ID } from '../utilities/constants'
import { mapGetters } from 'vuex'

export default {
  name: 'frontpage',
  computed: {
    ...mapGetters({
      allArticles: 'allArticles',
      allCategories: 'allCategories'
    }),
    blogArticles () {
      if (!this.allArticles) {
        return null
      }
      return Object.keys(this.allArticles).filter(value => {
        return this.allArticles[value] &&
          this.allArticles[value].categories &&
          this.allArticles[value].categories.indexOf(BLOG_CATEGORY_ID) > -1
      }).reduce((previous, current) => {
        previous[current] = this.allArticles[current]
        return previous
      }, {})
    }
  },

  components: {
    ArticleExcerpt,
    Loading
  }
}
</script>

<style scoped>
</style>
