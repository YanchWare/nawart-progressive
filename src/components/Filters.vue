<template>
  <div id="filters" class="show-for-large" >
      <div class="row">
        <div class="large-2 columns">
          <AutocompleteVue
            :list="categories"
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
  </div>
</template>

<script>
import AutocompleteVue from './AutoComplete'
export default {
  name: 'filters',
  props: ['categories'],
  components: {
    AutocompleteVue
  },
  mounted () {

  }
}
</script>

<style scoped>
#filters {
  padding: 10px;
  background-color: #fff;
  position: fixed;
  z-index: 100;
  width: 100vw;
}

.row {
  padding: 0;
  margin: 0;
}

</style>