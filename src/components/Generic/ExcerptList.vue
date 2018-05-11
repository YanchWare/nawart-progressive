<template>
  <div>
    <div v-if="articles">
      <div class="row text-center" v-for="(story, index) in articles" :key="story.id">
          <TwoExcerpts v-if="index % 2 == 0"
            :stories="[articles[index], articles[index+1]]" :categories="allCategories"/>
      </div>
    </div>
    <div v-else class="loading">
      <Loading/>
    </div>
  </div>
</template>

<script>
import TwoExcerpts from './TwoExcerpts'
import Loading from './Loading'
import { mapGetters } from 'vuex'

// TODO: Lazy loading of more articles

export default {
  name: 'frontpage',

  props: ['categoryId'],

  computed: {
    ...mapGetters({
      allArticles: 'allArticles',
      allCategories: 'allCategories'
    }),
    articles () {
      if (!this.allArticles) {
        return null
      }
      return Object.keys(this.allArticles).filter(value => {
        return this.allArticles[value] &&
          this.allArticles[value].categories &&
          this.allArticles[value].categories.indexOf(this.categoryId) > -1
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
