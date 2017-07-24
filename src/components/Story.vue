<template>
  <div class="story" v-if="story.title.rendered">
    <img v-if="mediaUrl" class="story-image" :src="mediaUrl"/>
    <a :href="story.link" >
      <div v-html="story.title.rendered"></div>
    </a>
  </div>
</template>

<script>
import APIWrapper from '../api/wordpress'
export default {
  name: 'story',
  props: ['story'],
  data () {
    return {
      mediaUrl: null
    }
  },
  mounted () {
    this.getMedia()
  },
  methods: {
    getMedia () {
      APIWrapper.getMedia(this.story.featured_media).then(response => {
        if (response.entity.media_details) {
          if (response.entity.media_details.sizes.medium) {
            this.mediaUrl = response.entity.media_details.sizes.medium.source_url
          } else if (response.entity.media_details.sizes['post-thumbnail']) {
            this.mediaUrl = response.entity.media_details.sizes['post-thumbnail'].source_url
          } else if (response.entity.media_details.sizes.thumbnail) {
            this.mediaUrl = response.entity.media_details.sizes.thumbnail.source_url
          }
        } else {
          this.mediaUrl = response.entity.source_url
        }
      })
    }
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