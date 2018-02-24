<template>
  <div id="app">
    <div class="row hide-for-medium">
      <h1>{{$t('Portfolio')}}</h1>      
    </div>
    <div class="row">
      <div class="large-8 small-12 columns">
        <PortfolioMap :categories="allCategories" :currentFilters="portfolioFilters"></PortfolioMap>
      </div>
      <div class="large-4 small-12 columns hide-for-medium-only hide-for-small-only">
        <Filters :categories="allCategories" :currentFilters="portfolioFilters"></Filters>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="small-12 columns">
        <Contents :articles="allArticles" :currentFilters="portfolioFilters"></Contents>
        <Loading v-if="articleLoading"/>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioMap from '../components/Portfolio/PortfolioMap'
import Filters from '../components/Portfolio/Filters'
import Contents from '../components/Portfolio/Contents'
import Loading from '../components/Generic/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'portfolio',
  components: {
    PortfolioMap,
    Filters,
    Contents,
    Loading
  },
  computed: mapGetters({
    allArticles: 'allArticles',
    allCategories: 'allCategories',
    portfolioFilters: 'portfolioFilters',
    articleLoading: 'articleLoading'
  }),
  data () {
    return {
      olderNumberOfArticles: 0
    }
  },
  mounted () {
    const options = {
      onBottomIn: () => {
        this.fetchMoreArticles()
      }
    }
    window.$('#footer').scrollfire(options)
  },
  methods: {
    ...mapActions([
      'fetchArticles'
    ]),
    fetchMoreArticles () {
      this.olderNumberOfArticles = this.allArticles ? Object.keys(this.allArticles).length : 0
      this.fetchArticles({languageCode: this.$i18n.locale(), startFromClean: false, filters: this.portfolioFilters})
    }
  }
}
</script>

<style scoped>
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

.row, columns{
  margin: 0;
  padding: 0;
}

.column, .columns {
    padding-right: 0;
    padding-left: 0;
}

</style>