<template>
  <div id="filters">
    <div v-if="countryCategoriesAsFilters && countryCategoriesAsFilters[0]" class="menu">
      <h2>{{$t('Countries')}}</h2>
      <FilterToggle v-for="country in countryCategoriesAsFilters" :filter="country" :key="country.id" :currentActiveFilters="currentFilters.countries"></FilterToggle>
    </div>
    <div class="menu">
      <h2>{{$t('Media')}}</h2>
    </div>
    <div v-if="projectCategoriesAsFilters && projectCategoriesAsFilters[0]" class="menu">
      <h2>{{$t('Projects')}}</h2>
      <FilterToggle v-for="project in projectCategoriesAsFilters" :filter="project" :key="project.id">{{project}}</FilterToggle>
    </div>
    <div class="menu">
      <h2>{{$t('Multimedia')}}</h2>
    </div>
    <div class="menu">
      <h2>{{$t('Years')}}</h2>
    </div>
    <div class="menu">
      <h2>{{$t('Authors')}}</h2>
    </div>
  </div>
</template>

<script>
import FilterToggle from './FilterToggle'

export default {
  name: 'filters',
  props: ['categories', 'currentFilters'],
  components: {
    FilterToggle
  },
  data () {
    return {
      legalCountryFiltersCategoriesIds: [654, 867, 659, 687, 15, 959, 689, 656, 898, 17, 16, 658, 685, 691, 660, 690, 688, 657, 692],
      legalProjectFiltersCategoriesIds: [661, 908]
    }
  },
  computed: {
    countryCategoriesAsFilters () {
      return this.getCategories(this.legalCountryFiltersCategoriesIds)
    },
    projectCategoriesAsFilters () {
      return this.getCategories(this.legalProjectFiltersCategoriesIds)
    }
  },
  methods: {
    getCategories (arrayOfIds) {
      if (this.categories.categoriesById) {
        return arrayOfIds.reduce((previous, current) => {
          previous.push(this.categories.categoriesById[current])
          return previous
        }, [])
      } else {
        return []
      }
    }
  }
}
</script>


<style scoped>

#filters{
    text-align: center;
    background-color: transparent;
    width: 30vw;
    height: 70vh;
    z-index: 2;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0;
    position: relative;
    right: -3vw;
    top: 75px;
}

.menu{
  border-top: 1px solid #a9e3dc;
}
</style>