<template>
  <div id="contents">
    <Story v-for="story in stories" :story="story"></Story>
  </div>  
</template>

<script>
import Story from '../components/Story'
export default {
  name: 'contents',
  props: ['stories'],
  components: {
    Story
  },
  mounted () {
  }
}
</script>

<style scoped>
#contents{
  flex-flow: column wrap;
  text-align: center;
  display: wrap;
  margin-top: 75px;
}
</style>