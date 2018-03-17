<template>
  <div id="about">
    <div class="row">
      <div class="large-6 small-12 columns">
        <Load-Page :allArticles="allArticles" :locale="$i18n.locale()" pageSlug="about-2" />        
      </div>
      <div class="large-6 small-12 columns">
        <div clas="large-12 columns text-center">
          <h3 style="text-align: center;">
            {{$t('The media we have worked with')}}
          </h3>

          <div class="row small-up-2 medium-up-3 large-up-4">
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/il_venerdi-di_repubblica_logo.jpg" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/vitatrentina.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/unita.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/torto.jpg" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/nena.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/robMorrione.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/smt.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/nigrizia.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/pagina99.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/repubblica.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/regioneTicino.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/raiNews24.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/limes.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/mee.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/lettera22.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/left.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/FO.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/fattoQuotidiano.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/choisir.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/communityTimes.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/ecoDiBergamo.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/cairopost.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/europa.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/emergency.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/caffe.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/bhe.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/azione.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/atlantic.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/artshub.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/09/rai-storia-2.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/aljazeera.png" >
            </div>
            <div class="column column-block">
              <img src="//nawartpress.com/wp-content/uploads/2015/10/area.png" >
            </div>
          </div>

        </div>
        <div id="mention" class="row">
          <div clas="large-12 columns">
            <h3 style="text-align: center;">
              {{$t('They mentioned us')}}
            </h3>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.marieclaire.it/Attualita/news-appuntamenti/The-Railway-Diaries-reportage-viaggio-Asia-donne" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/Screenshot-2015-04-16-11.37.41-300x186.png" alt="" width="300" height="186" /></a>
                  <p><strong>14.04.2015<br/>MarieClaire</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.europeanaffairs.media/it/2015/04/08/railway-diariestornare-raccontare-sulla-via-della-seta/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/Screenshot-2015-04-16-11.32.12-300x160.png" alt="" width="300" height="160" /></a>
                  <p><strong>08.04.2015<br/>European<br/>Affairs</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.qcodemag.it/2015/04/07/via-della-seta/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/Screenshot-2015-04-08-08.43.561-300x150.png" alt="" width="300" height="150" /></a>
                  <p><strong>07.04.2015<br/>Q Code<br/>Magazine</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://osservatorioiraq.it/cultura-e-dintorni/railway-diaries-donne-viaggio-sulla-della-seta" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/Osservatorio-iraq-259x300.jpg" alt="" width="259" height="300" /></a>
                  <p><strong>06.04.2015<br/>Osservatorio<br/>Iraq</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.milanofilmnetwork.it/daily/articolo.php?id=408" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-9-234x300.jpg" alt="" width="234" height="300" /></a>
                  <p><strong>29.03.2015<br/>MFN</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.ilmanifestobologna.it/wp/2015/03/the-railway-diaries-un-viaggio-documentario-lungo-la-via-della-seta/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-8-300x272.jpg" alt="" width="300" height="272" /></a>
                  <p><strong>26.03.2015<br/>Il manifesto<br>Bologna</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.radio3.rai.it/dl/portaleRadio/media/ContentItem-2b1fa1ea-1bd2-4f7e-b263-803da4e6f150.html" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-7-248x300.jpg" alt="" width="248" height="300" /></a>
                  <p><strong>24.03.2015<br/>Radio3<br>Mondo</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.repubblica.it/solidarieta/diritti-umani/2015/03/23/news/viaggio-110305414/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-6-234x300.jpg" alt="" width="234" height="300" /></a>
                  <p><strong>23.03.2015<br/>La repubblica</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.nawartpress.com/nawart-press-su-limpresa-eccezionale-a-radio-popolare-podcast/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-5-300x264.jpg" alt="" width="300" height="264" /></a>
                  <p><strong>16.03.2015<br/>Radio Popolare</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.glistatigenerali.com/enti-culturali_medio-oriente/railway-diaries-e-su-crowdfunding/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-4-203x300.jpg" alt="" width="203" height="300" /></a>
                  <p><strong>15.03.2015<br/>Gli Stati<br/>Generali</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <img src="https://www.nawartpress.com/wp-content/uploads/2015/04/644380_607871262691190_3430735102875212475_n-300x250.jpg" alt="" width="300" height="250" />
                  <p><strong>14.03.2015<br/>La Gazzetta<br/>di Parma</strong></p>
                </div>
              </div>
            </div>

            <div class="hexa">
              <div class="hex1">
                <div class="hex2">
                  <a href="http://www.glistatigenerali.com/media/il-mio-nome-e-nawart-press/" target="_blank"><img src="https://www.nawartpress.com/wp-content/uploads/2015/04/IMG_5555-3-204x300.jpg" alt="" width="204" height="300" /></a>
                  <p><strong>13.03.2015<br/>Gli Stati<br/>Generali</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import LoadPage from '../components/Generic/LoadPage'
import { mapGetters } from 'vuex'

export default {
  name: 'about',

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
