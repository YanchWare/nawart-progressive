<template>
  <div id="portfolio">
    <div class="text-center">
      <h2>Portfolio</h2>
    </div>
    <Filters></Filters>
    <div class="row">
      <div class="large-8 small-12 columns">
        <Contents></Contents>
      </div>
      <div class="large-4 columns show-for-large-up">
        <PortfolioMap></PortfolioMap>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioMap from '../components/PortfolioMap'
import Filters from '../components/Filters'
import Contents from '../components/Contents'
export default {
  name: 'portfolio',
  components: {
    PortfolioMap,
    Filters,
    Contents
  }
}
</script>

<style>
</style>