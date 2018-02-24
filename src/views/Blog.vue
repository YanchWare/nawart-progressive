<template>
  <div>
    <div v-if="blogArticles">
      <div class="row text-center" v-for="(story, index) in blogArticles" :key="story.id">
          <TwoExcerpts v-if="index % 2 == 0"
            :stories="[blogArticles[index], blogArticles[index+1]]" :categories="allCategories"/>
      </div>
    </div>
    <div v-else class="loading">
      <Loading/>
    </div>
  </div>
</template>

<script>
import TwoExcerpts from '../components/TwoExcerpts'
import Loading from '../components/Loading'
import { BLOG_CATEGORY_ID } from '../utilities/constants'
import { mapGetters } from 'vuex'

// TODO: Lazy loading of more articles

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
        previous.push(this.allArticles[current])
        return previous
      }, []).sort((articleA, articleB) => {
        return new Date(articleB.date) - new Date(articleA.date)
      })
    }
  },

  components: {
    TwoExcerpts,
    Loading
  }
}
</script>

<style scoped>
</style>
