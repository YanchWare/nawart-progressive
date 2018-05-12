<template>
  <div id="contents">
    <div class="row">
      <ProjectHeader :articles="articles" :locale="locale" v-if="currentFilters.projects.length === 1" :project-id="this.currentFilters.projects[0]"/>
    </div>
    <div class="mosaic">
      <SmallArticleExcerpt class="story" v-for="story in storiesToShow" :story="story" :categories="categories" :key="story.id"/>
    </div>
  </div>
</template>

<script>
import SmallArticleExcerpt from '../Generic/SmallArticleExcerpt'
import ProjectHeader from './ProjectHeader'

export default {
  name: 'contents',
  props: ['articles', 'categories', 'currentFilters', 'locale'],

  components: {
    SmallArticleExcerpt,
    ProjectHeader
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

          // Author
          if (!shownByAuthor) {
            shownByAuthor = this.currentFilters.authors.indexOf(this.articles[current].author) > -1
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
@media only screen and (min-width: 40.063em) { 
  .mosaic{
    line-height: 0;
    
    -webkit-column-count: 3;
    -webkit-column-gap:   0px;
    -moz-column-count:    3;
    -moz-column-gap:      0px;
    column-count:         3;
    column-gap:           0px;  
  }
}

.story{
  display: inline-block;
  padding: 50px 50px 0px 50px;
  border: 1px solid #ef2673;
}
.story img{
  max-width: 300px;
}

</style>