<template>
  <div id="contents">
    <Story v-for="story in articles" :story="story" :key="story.id"></Story>
  </div>
</template>

<script>
import Story from './Story'

export default {
  name: 'contents',
  props: ['articles'],

  components: {
    Story
  }

}
</script>

<style scoped>

#contents{
  text-align: center;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  margin: 20px 0;
  z-index: 2;
}
</style>