<template>
  <div id="contents">
    <Story v-for="story in storiesToShow" :story="story" :key="story.id"></Story>
  </div>
</template>

<script>
import Story from './Story'

export default {
  name: 'contents',
  props: ['articles', 'currentFilters'],

  components: {
    Story
  },

  computed: {
    storiesToShow () {
      if (this.articles && this.currentFilters) {
        return Object.keys(this.articles).reduce((previous, current) => {
          const currentArticlesCat = this.articles[current].categories
          if (!currentArticlesCat) {
            return previous
          }

          let shownByCountry = this.currentFilters.countries.length === 0
          let shownByMedia = this.currentFilters.medias.length === 0
          let shownByProject = this.currentFilters.projects.length === 0
          let shownByMultimedia = this.currentFilters.multimedia.length === 0
          let shownByYear = this.currentFilters.years.length === 0
          let shownByAuthor = this.currentFilters.authors.length === 0

          // Checking category-related filters
          for (let i = 0; i < currentArticlesCat.length; i++) {
            // Country
            if (!shownByCountry) {
              shownByCountry = this.currentFilters.countries.indexOf(currentArticlesCat[i]) > -1
            }

            // Project
            if (!shownByProject) {
              shownByProject = this.currentFilters.projects.indexOf(currentArticlesCat[i]) > -1
            }
          }

          // Check all conditions
          if (shownByCountry && shownByMedia && shownByProject && shownByMultimedia && shownByYear && shownByAuthor) {
            previous.push(this.articles[current])
          }
          return previous
        }, []).sort((articleA, articleB) => {
          return new Date(articleB.date) - new Date(articleA.date)
        })
      } else {
        return this.articles
      }
    }
  }

}
</script>

<style scoped>

#contents{
  text-align: center;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  margin: 20px 0;
  z-index: 2;
}
</style>