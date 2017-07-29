<template>
	<a class="twitter-timeline" href="https://twitter.com/search?q=%40nawartpress%20OR%20%23press" width="900" height="100vh" data-widget-id="573825317447532544">Tweets about @nawartpress OR #press</a>
</template>

<script>
export default {
  name: 'twitter-widget',
  mounted () {
    this.initTwitter()
  },
  methods: {
    initTwitter () {
      !(function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        var p = /^http:/.test(d.location) ? 'http' : 'https'
        if (!d.getElementById(id)) {
          js = d.createElement(s)
          js.id = id
          js.src = p + '://platform.twitter.com/widgets.js'
          fjs.parentNode.insertBefore(js, fjs)
        }
      }(document, 'script', 'twitter-wjs' + new Date()))
      setTimeout(() => {
        window.$('iframe').css('height', '200vh')
      }, 1000)
    }
  }
}
</script>
