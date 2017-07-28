<template>
  <div class="row collapse">
    <div class="medium-3 columns">
      <ul class="vertical tabs" data-tabs id="example-tabs">
        <li class="tabs-title is-active"><a href="#panel1v" aria-selected="true"><img src="http://www.nawartpress.com/wp-content/uploads/2016/01/locandina25x40-600x960.jpg"></a></li>
        <li class="tabs-title"><a href="#panel2v"><img src="http://www.nawartpress.com/wp-content/uploads/2016/01/copertina-Magazine-PDF-CORRETTO.jpg"></a></li>
      </ul>
    </div>
    <div class="medium-9 columns">
      <div class="tabs-content" data-tabs-content="example-tabs">
        <div class="tabs-panel is-active" id="panel1v">
          <div class="issuuembed" style="width:100%; height:100vh;" data-configid="23991197/50890203"></div>
        </div>
        <div class="tabs-panel" id="panel2v">
          <div class="issuuembed" style="width: 100%; height: 100vh;" data-configid="23991197/34137003"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'magazine',
  mounted () {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '/static/js/vendor/issu-embed.js'
    document.head.appendChild(script)
  }
}
</script>

<style scoped>
img {
  max-width: 200px;
}

li {
  text-align: center;
}
</style>