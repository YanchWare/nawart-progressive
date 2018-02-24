<template>
  <div id="two-excerpts">
    <div class="row">
      <div class="large-6 columns">
        <SmallArticleExcerpt :story="stories[0]" :categories="categories"/>
      </div>
      <div class="large-6 columns">
        <SmallArticleExcerpt :story="stories[1]" :categories="categories"/>
      </div>
    </div>
  </div>
</template>

<script>
import SmallArticleExcerpt from '../components/SmallArticleExcerpt'

export default {
  name: 'frontpage',
  props: ['stories', 'categories'],
  components: {
    SmallArticleExcerpt
  }
}
</script>
