<template>
  <div id="portfolio">
    <div class="text-center hide-for-medium">
      <h2>Portfolio</h2>
    </div>
    <Filters :categories="allCategories.categoriesById"/>
    <div class="row">
      <div class="large-8 small-12 columns">
        <Contents :stories="allArticles"/>
      </div>
      <div class="large-4 columns show-for-large">
        <PortfolioMap :categories="allCategories.categoriesById"/>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioMap from '../components/PortfolioMap'
import Filters from '../components/Filters'
import Contents from '../components/Contents'
import { mapGetters } from 'vuex'

export default {
  name: 'portfolio',
  components: {
    PortfolioMap,
    Filters,
    Contents
  },
  computed: mapGetters({
    allArticles: 'allArticles',
    allCategories: 'allCategories'
  })
}
</script>

<style>
</style>