<template>
  <div id="four-extracts">
    <div class="row">
      <div class="large-6 columns">
        <SmallArticleExtract/>
      </div>
      <div class="large-6 columns">
        <SmallArticleExtract/>
      </div>
    </div>
    <div class="row text-center">
      <div class="large-6 columns">
        <SmallArticleExtract/>
      </div>
      <div class="large-6 columns">
        <SmallArticleExtract/>
      </div>
    </div>
  </div>
</template>

<script>
import SmallArticleExtract from '../components/SmallArticleExtract'

export default {
  name: 'frontpage',
  data () {
    return {
    }
  },

  components: {
    SmallArticleExtract
  }
}
</script>
