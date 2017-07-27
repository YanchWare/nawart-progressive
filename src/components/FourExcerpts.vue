<template>
  <div id="four-excerpts">
    <div class="row">
      <div class="large-6 columns">
        <SmallArticleExcerpt :story="stories[0]"/>
      </div>
      <div class="large-6 columns">
        <SmallArticleExcerpt :story="stories[1]"/>
      </div>
    </div>
    <div class="row">
      <div class="large-6 columns">
        <SmallArticleExcerpt :story="stories[2]"/>
      </div>
      <div class="large-6 columns">
        <SmallArticleExcerpt :story="stories[3]"/>
      </div>
    </div>
  </div>
</template>

<script>
import SmallArticleExcerpt from '../components/SmallArticleExcerpt'

export default {
  name: 'frontpage',
  props: ['stories'],
  components: {
    SmallArticleExcerpt
  }
}
</script>
