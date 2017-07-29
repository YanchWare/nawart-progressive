<template>
  <div id="magazine" class="text-center">
    <h2>Magazine</h2>
    <div class="row text-center">
      <div class="large-6 small-12 columns">
        <div class="card">
          <div class="card-section">
            <img src="//www.nawartpress.com/wp-content/uploads/2016/01/locandina25x40-600x960.jpg">
          </div>
          <div class="card-section">
            <span>Number One</span>
          </div>
          <div class="card-section">
            <router-link to="/magazine" class="button secondary expanded" href="#"><i class="fa fa-file-pdf-o"></i>Table of contents</router-link>
          </div>
        </div>
      </div>
      <div class="large-6 small-12 columns">
        <div class="card">
          <div class="card-section">
            <img src="//www.nawartpress.com/wp-content/uploads/2016/01/copertina-Magazine-PDF-CORRETTO.jpg">
          </div>
          <div class="card-section">
            <span>Number Zero</span>
          </div>
          <div class="card-section">
            <router-link to="/magazine" class="button secondary expanded" href="#"><i class="fa fa-file-pdf-o"></i>Table of contents</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;  
  margin: auto;
}
.card img {
  max-width: 300px;
  max-height: 300px;
}

i.fa, span {
  font-size: 1.5em;
  margin: 10px;
}
</style>
