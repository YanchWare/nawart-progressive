<template>
  <div id="filters">
    <div class="menu">
      <h2>Countries</h2>
      <FilterToggle v-for="filter in categories" :filter="filter"></FilterToggle>
    </div>
    <div class="menu">
      <h2>Media</h2>
    </div>
    <div class="menu">
      <h2>Projects</h2>
    </div>
    <div class="menu">
      <h2>Multimedia</h2>
    </div>
    <div class="menu">
      <h2>Years</h2>
    </div>
    <div class="menu">
      <h2>Authors</h2>
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