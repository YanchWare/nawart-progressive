<template>
  <div id="filters" >
    <fieldset class="fieldset">
      <legend>Search our Portfolio</legend>
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
          <select>
            <option value=""></option>
            <option value="husker">Husker</option>
            <option value="starbuck">Starbuck</option>
            <option value="hotdog">Hot Dog</option>
            <option value="apollo">Apollo</option>
          </select>
        </div>
        <div class="large-2 columns">
          <select>
            <option value=""></option>
            <option value="husker">2011</option>
            <option value="starbuck">2012</option>
            <option value="hotdog">2013</option>
            <option value="apollo">2014</option>
          </select>
        </div>
        <div class="large-2 columns">
          <AutocompleteVue
            :list="[{name: 'Giulia Bertoluzzi'}]"
            placeholder="Authors"
          ></AutocompleteVue>
        </div>
      </div>
    </fieldset>
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
#filters {
  padding: 10px;
}
</style>