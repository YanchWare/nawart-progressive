<template>
  <div id="filters">
    <div class="row">
      <div class="large-2 columns">
        <AutocompleteVue
          :list="filters"
          placeholder="Country"
        ></AutocompleteVue>
      </div>
      <div class="large-2 columns">
        <AutocompleteVue
          :list="[{name: 'La Repubblica'}]"
          placeholder="Media"
        ></AutocompleteVue>
      </div>
      <div class="large-2 columns">
        <AutocompleteVue
          :list="[{name: 'The Railways Diary'}]"
          placeholder="Projects"
        ></AutocompleteVue>
      </div>
      <div class="large-2 columns">
        <h2>Multimedia</h2>
        [DropDown]
      </div>
      <div class="large-2 columns">
        <h2>Years</h2>
        [DropDown]
      </div>
      <div class="large-2 columns">
        <AutocompleteVue
          :list="[{name: 'Giulia Bertoluzzi'}]"
          placeholder="Authors"
        ></AutocompleteVue>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AutocompleteVue from './AutoComplete'
export default {
  name: 'filters',
  computed: mapGetters({
    filters: 'allFilters',
    stories: 'allArticles'
  }),
  components: {
    AutocompleteVue
  },
  created () {
    this.$store.dispatch('getAllFilters')
    this.$store.dispatch('getAllArticles')
  },
  watch: {
    filters (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
</style>