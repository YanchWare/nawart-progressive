<template>
  <div id="contents">
    <Story v-for="story in stories" :story="story"></Story>
  </div>  
</template>

<script>
import {mapGetters} from 'vuex'
import Story from '../components/Story'
export default {
  name: 'contents',
  computed: mapGetters({
    filters: 'allFilters',
    stories: 'allArticles'
  }),
  components: {
    Story
  },
  mounted () {
    window.$('#contents').css('height', '+=75px')
  }
}
</script>

<style scoped>
#contents{
  text-align: center;
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  z-index: 2;
}
</style>