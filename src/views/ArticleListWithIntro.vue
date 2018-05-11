<template>
  <div id="consultancies" class="contents">
      <Load-Page v-if="pageSlug" :allArticles="allArticles" :locale="$i18n.locale()" :pageSlug="pageSlug" />
      <hr/>
      <Article-List :categoryId="categoryId" />
  </div>
</template>

<script>
import LoadPage from '../components/Generic/LoadPage'
import ArticleList from './ArticleList'
import {mapGetters} from 'vuex'

export default {
  name: 'article-list-with-intro',
  props: ['pageSlug', 'categoryId'],
  components: {
    LoadPage,
    ArticleList
  },
  computed: mapGetters({
    allArticles: 'allArticles'
  })
}
</script>

<style scoped>
.contents{
  margin: 5%;
}
</style>
