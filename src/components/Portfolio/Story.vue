<template>
  <div class="story" v-if="story && story.type !== 'page' && story.title.rendered">
    <img v-if="mediaUrl" class="story-image" :src="mediaUrl"/>
    <span class="datetime">{{ new Date(story.date) | ISODate}}</span>
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
  padding: 50px 50px 0px 50px;
}
.story img{
  max-width: 300px; 
}
</style>