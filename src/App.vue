<template>
  <div id="app">
    <TopNav id="top-nav"></TopNav>
    <main>
      <router-view></router-view>  
    </main>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import TopNav from './components/Theme/TopNav'
import FooterNav from './components/Theme/FooterNav'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    TopNav,
    FooterNav
  },

  data () {
    return {
    }
  },

  mounted () {
    window.$(document).foundation()
  },

  updated () {
    window.$(document).foundation()
  },

  computed: mapGetters({
    securityLevel: 'securityLevel'
  })
}
</script>

<style>
  body{
    font-family: 'Play',sans-serif;
    overflow-x: hidden;
    margin-top: 210px;
  }
  main{
    min-height: 100vh;
  }
  a:hover{
      text-decoration: underline;
  }

  a {
    color: #000;
    transition: 0.2s;
  }

  a:hover {
    color: #ef2673;
    transition: 0.2s;
  }

  .button, .button:hover{
    background-color: #ef2673;
  }

  h1, h2, h3, h4, h5, h6, nav {
    text-transform: uppercase;
    font-family: Florence;
  }

  #top-nav {
    height: 210px;
  }

  .row, hr{
    max-width: 100%;
    margin: 20px;
  }

</style>
