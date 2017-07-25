<template>
  <div>
    <div class="row text-center">
      <div class="small-12 columns">
        <ArticleExtract/>
      </div>
      <hr/>
    </div>
    <div class="row">
      <div class="large-8 small-12 columns">
        <FourExtracts/>
      </div>
      <div class="large-4 small-12 columns">
        <TwitterWidget/>
      </div>
    </div>
    <div class="row">
      <AboutNawart></AboutNawart>
    </div>
  </div>
</template>

<script>
import ArticleExtract from '../components/ArticleExtract'
import FourExtracts from '../components/FourExtracts'
import TwitterWidget from '../components/TwitterWidget'
import AboutNawart from '../components/AboutNawart'

export default {
  name: 'frontpage',
  data () {
    return {
    }
  },

  components: {
    ArticleExtract,
    FourExtracts,
    TwitterWidget,
    AboutNawart
  }
}
</script>