<template>
  <div id="project-header" class="row">
    <div class="small-12 columns">
      <youtube v-if="videoId" :video-id="videoId" ref="youtube"/>
      <Load-Page v-if="pageSlug" :allArticles="articles" :locale="locale" :pageSlug="pageSlug" :showTitle="true" />
    </div>
  </div>
</template>

<script>
import LoadPage from '../Generic/LoadPage'

export default {
  name: 'ProjectHeader',
  props: ['articles', 'locale', 'projectId'],

  data () {
    return {
      videoId: null,
      pageSlug: null,
      videoIdByProjectId: {
        '661': 'SfxbQSWhPqA',
        '908': 'CUh5iNMIIrs'
      },
      pageSlugByProjectId: {
        '661': 'nawart-pwa-railway-diaries',
        '908': 'nawart-pwa-far-right-2016-2017',
        '1110': 'nawart-pwa-migrations'
      }
    }
  },

  watch: {
    'projectId': 'renderComponent'
  },

  mounted () {
    this.renderComponent()
  },

  updated () {
    this.renderComponent()
  },

  methods: {
    renderComponent () {
      this.videoId = this.videoIdByProjectId[this.projectId]
      this.pageSlug = this.pageSlugByProjectId[this.projectId]
    }
  },

  components: {
    LoadPage
  }
}
</script>

<style scoped>
#project-header{
  max-width: 90vw;
  margin: auto;
}
</style>