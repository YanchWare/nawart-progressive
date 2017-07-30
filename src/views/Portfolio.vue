<template>
  <div id="portfolio" class="wrapper cf">
    <div class="text-center hide-for-medium">
      <h2>Portfolio</h2>
    </div>
    <Filters :categories="allCategories.categoriesById"/>
    <div class="row">
      <div class="large-8 small-12 columns content">
        <Contents :stories="allArticles"/>
      </div>
      <div class="large-4 columns show-for-large sidebar">
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
/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

/**
 * For modern browsers
 * 1. The space content is one way to avoid an Opera bug when the
 *    contenteditable attribute is included anywhere else in the document.
 *    Otherwise it causes space to appear at the top and bottom of elements
 *    that are clearfixed.
 * 2. The use of `table` rather than `block` is only necessary if using
 *    `:before` to contain the top-margins of child elements.
 */
.cf:before,
.cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}

.cf:after {
    clear: both;
}

/**
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */
.cf {
    *zoom: 1;
}

.content,
.sidebar {
  float: left;
}


/* The sticky */
.sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>