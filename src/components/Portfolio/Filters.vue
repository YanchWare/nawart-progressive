<template>
  <div id="filters">
    <div v-if="countryCategoriesAsFilters && countryCategoriesAsFilters[0]" class="menu">
      <h2>{{$t('Countries')}}</h2>
      <FilterToggle v-for="country in countryCategoriesAsFilters" v-if="country"
        :filter="country" 
        :key="country.id" 
        :type="FILTER_COUNTRY_TYPE" 
        :currentActiveFilters="currentFilters.countries"/>
    </div>
    <div v-if="projectCategoriesAsFilters && projectCategoriesAsFilters[0]" class="menu">
      <h2>{{$t('Projects and Documentaries')}}</h2>
      <FilterToggle v-for="project in projectCategoriesAsFilters" v-if="project"
        :filter="project" 
        :key="project.id" 
        :type="FILTER_PROJECT_TYPE" 
        :currentActiveFilters="currentFilters.projects"/>
    </div>
    <div class="menu">
      <h2>{{$t('Authors')}}</h2>
    </div>
  </div>
</template>

<script>
import FilterToggle from './FilterToggle'
import { FILTER_COUNTRY_TYPE,
  FILTER_MEDIA_TYPE,
  FILTER_PROJECT_TYPE,
  FILTER_MULTIMEDIA_TYPE,
  FILTER_YEAR_TYPE,
  FILTER_AUTHOR_TYPE } from '../../utilities/constants'

export default {
  name: 'filters',
  props: ['categories', 'currentFilters'],
  components: {
    FilterToggle
  },
  data () {
    return {
      legalCountryFiltersCategoriesIds: [654, 867, 659, 687, 15, 959, 689, 656, 898, 17, 16, 658, 685, 691, 660, 690, 688, 657, 692, 1100],
      legalProjectFiltersCategoriesIds: [661, 908]
    }
  },
  computed: {
    countryCategoriesAsFilters () {
      return this.getCategories(this.legalCountryFiltersCategoriesIds)
    },
    projectCategoriesAsFilters () {
      return this.getCategories(this.legalProjectFiltersCategoriesIds)
    },
    FILTER_COUNTRY_TYPE () {
      return FILTER_COUNTRY_TYPE
    },
    FILTER_MEDIA_TYPE () {
      return FILTER_MEDIA_TYPE
    },
    FILTER_PROJECT_TYPE () {
      return FILTER_PROJECT_TYPE
    },
    FILTER_MULTIMEDIA_TYPE () {
      return FILTER_MULTIMEDIA_TYPE
    },
    FILTER_YEAR_TYPE () {
      return FILTER_YEAR_TYPE
    },
    FILTER_AUTHOR_TYPE () {
      return FILTER_AUTHOR_TYPE
    }
  },
  methods: {
    getCategories (arrayOfIds) {
      if (this.categories.categoriesById) {
        return arrayOfIds.reduce((previous, current) => {
          previous.push(this.categories.categoriesById[current])
          return previous
        }, []).sort((categoryA, categoryB) => {
          if (categoryA.name < categoryB.name) {
            return -1
          }
          if (categoryA.name > categoryB.name) {
            return 1
          }
          return 0
        })
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