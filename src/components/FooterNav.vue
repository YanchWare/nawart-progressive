<template>
  <div id="footer">
    <div class="row full-width-row text-center">
      <div class="small-12 large-offset-2 large-8 columns">
        <div id="mc_embed_signup" class="signup-panel">
          <h4>
            {{$t('Subscribe to our newsletter')}}
          </h4>
          <form action="//nawartpress.us10.list-manage.com/subscribe/post?u=65b1811724da713522a93f8c8&id=ac34a9f562" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
              <div class="mc-field-group show-for-large">
                <div class="row collapse">
                  <div class="small-2 columns icon_newsletter">
                    <span class="prefix"><i class="fa fa-envelope-o"></i></span>
                  </div>
                  <div class="small-6 columns">
                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                  </div>
                  <div class="small-4 columns">
                    <input type="submit" :value="$t('Subscribe')" name="subscribe" id="mc-embedded-subscribe" class="button">
                  </div>
                </div>
              </div>

              <div class="mc-field-group hide-for-large">
                <div class="row collapse">
                  <div class="small-2 columns icon_newsletter">
                    <span class="prefix"><i class="fa fa-envelope-o"></i></span>
                  </div>
                  <div class="small-10 columns">
                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                  </div>
                </div>
                <div class="row collapse">
                  <div class="small-12 columns text-centered lower">
                    <input type="submit" :value="$t('Subscribe')" name="subscribe" id="mc-embedded-subscribe" class="button">
                  </div>
                </div>
              </div>

              <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
              </div>
              <div style="position: absolute; left: -5000px;">
                <input type="text" name="b_65b1811724da713522a93f8c8_ac34a9f562" tabindex="-1" value="">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="text-center">
      {{$t('or follow us on')}}<br/>
      <a href="https://www.facebook.com/nawartpress" class="boxed-icon fill facebook icon-3x" target="_blank"><i class="fa fa-facebook"></i></a>
      <a href="https://www.flickr.com/photos/130959910@N05/" class="boxed-icon fill flickr icon-3x" target="_blank"><i class="fa fa-flickr"></i></a>
      <a href="https://www.instagram.com/nawart_press" class="boxed-icon fill instagram icon-3x" target="_blank"><i class="fa fa-instagram"></i></a>
      <a href="https://twitter.com/NawartPress" class="boxed-icon fill twitter icon-3x" target="_blank"><i class="fa fa-twitter"></i></a>
      <a href="https://www.youtube.com/channel/UChK3l3IZALtHHGwb4XAsEhA" class="boxed-icon fill youtube icon-3x" target="_blank"><i class="fa fa-youtube"></i></a>
      <a href="https://soundcloud.com/nawart-press" class="boxed-icon fill soundcloud icon-3x" target="_blank"><i class="fa fa-soundcloud"></i></a>
      <a href="/feed" class="boxed-icon fill pinterest icon-3x" target="_blank"><i class="fa fa-rss"></i></a>
    </p>
    <p></p>
    <br/>
  </div>
</template>

<style scoped>
.signup-panel {
	padding: 15px;
}

.signup-panel i {
	font-size: 30px;
	line-height: 50px;
	color: #999;
}

.signup-panel form input, .signup-panel form span {
	height: 50px;
	width: 100%;
}

.signup-panel .icon_newsletter {
	background-color: #eee;
	border: 1px dashed #ccc;
}

</style>