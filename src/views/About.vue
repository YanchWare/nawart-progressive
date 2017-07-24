<template>
  <div id="about">

  </div>
</template>

<script>
export default {
  name: 'about',

  mounted () {
    this.collapsible()
  },

  methods: {
    collapsible () {
      window.$('.collapsible').collapsible()
    }
  }
}
</script>

<style scoped>
  #about{
    padding-left: 20vw;
    padding-right: 20vw;
    color: rgb(0,0,0);
  }
  #about h1{
    font-size: 4rem;
  }
</style>
