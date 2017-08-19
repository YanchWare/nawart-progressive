<template>
  <div id="filters">
    <div class="menu">
      <h2>{{$t('Countries')}}</h2>
      <FilterToggle v-for="filter in categories.categoriesById" :filter="filter"></FilterToggle>
    </div>
    <div class="menu">
      <h2>{{$t('Media')}}</h2>
    </div>
    <div class="menu">
      <h2>{{$t('Projects')}}</h2>
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
  props: ['categories'],
  components: {
    FilterToggle
  },
  mounted () {

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