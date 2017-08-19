<template>
  <div class="story" v-if="story && story.type !== 'page' && story.title.rendered">
    <img v-if="mediaUrl" class="story-image" :src="mediaUrl"/>
    <router-link :to="'/' + story.slug" >
      <div v-html="story.title.rendered"></div>
    </router-link>
  </div>
</template>

<script>
import { getMedia } from '../../utilities/apiSupport'

export default {
  name: 'story',
  props: ['story'],
  data () {
    return {
      mediaUrl: null
    }
  },
  mounted () {
    console.log(this.story)
    getMedia(this.story.featured_media).then(mediaUrl => {
      this.mediaUrl = mediaUrl
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>
.story{
  width: 400px;
  display: inline-block;
}
.story img{
  max-width: 300px; 
}
a{
  color: #ff7979;
  text-decoration: none;
  padding: 5px;
}
</style>