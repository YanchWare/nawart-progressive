<template>
  <div id="about-nawart">
    <div class="row text-center">
      <div class="small-4 columns">
        <hr/>
      </div>
      <div class="small-4 columns">
        <h1>Nawart Press</h1>
      </div>
      <div class="small-4 columns">
        <hr/>
      </div>
    </div>
    <div class="row">
      <div class="small-4 columns text-center">
        <img src="/static/img/NawartLogo_Small.png" />
      </div>
      <div class="small-8 columns contents">
        <Load-Page :allArticles="allArticles" :locale="locale" pageSlug="nawart-pwa-frontpage-nawart-information" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadPage from '../Generic/LoadPage'

export default {
  name: 'About-Nawart',

  props: ['allArticles', 'locale'],

  components: {
    LoadPage
  }
}
</script>

<style scoped>
.contents{
  margin-top: 5%;
}
</style>