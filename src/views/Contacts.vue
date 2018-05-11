<template>
  <div id="contacts">
    <div class="row">
      <div class="small-12 columns">
        <Load-Page :allArticles="allArticles" :locale="$i18n.locale()" pageSlug="nawart-pwa-contacts" />        
      </div>
    </div>
  </div>
</template>

<script>
import LoadPage from '../components/Generic/LoadPage'
import { mapGetters } from 'vuex'

export default {
  name: 'contacts',

  computed: mapGetters({
    allArticles: 'allArticles'
  }),

  components: {
    LoadPage
  }

}
</script>

<style>
  #contacts a{
    text-decoration: underline;
  }

</style>
