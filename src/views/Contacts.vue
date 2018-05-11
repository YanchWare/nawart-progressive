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

<style scoped>
  .hexa{
    display: inline-block;
  }

  .hexa, .hexa div {
    margin: 0 auto;
    transform-origin: 50% 50%;
    overflow: hidden;
    width: 300px;
    height: 300px;
  }
  .hexa {
    width: 250px;
    height: 155px;
    margin-bottom: 10px;
  }
  .hexa div {
    width: 100%;
    height: 100%;
  }
  .hexa {
    transform: rotate(120deg);
    -webkit-backface-visibility: hidden;
  }
  .hex1 {
    transform: rotate(-60deg);
    -webkit-backface-visibility: hidden;
  }
  .hex2 {
    transform: rotate(-60deg);
  }

  .hex2 p{
    position: absolute;
    color: #fff;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    text-align: center;
    height: 60px;
    font-size: 0.9em;
    -webkit-font-smoothing: antialiased;
  }

  #mention{
    text-align: center;
  }

  #mention h5{
    margin: 30px;
  }

</style>
