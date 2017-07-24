<template>
  <div class="row">
    <div class="col s12 m12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Error</span>
          <p>
            Something went wrong.
          </p>
        </div>
        <div class="card-action">
          <a v-on:click.prevent="refresh">I feel lucky!</a>
          <a :href="issuesLink" target="_blank">Report this</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',

  components: {
  },

  data () {
    return {
      issuesLink: 'https://github.com/YanchWare/yanchware-cms-web/issues'
    }
  },

  methods: {
    refresh () {
      window.location.reload()
    }
  }
}
</script>