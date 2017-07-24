import Vue from 'vue'

class Filters {

  static initializeFilters () {
    // Date visualization filter
    Vue.filter('ISODate', function (value) {
      return value.toISOString().substr(0, 10)
    })
    // Beautify visualization of contacts type names on profile pages
    Vue.filter('Contacts', function (value) {
      if (value === 'globe') {
        return 'website'
      }
      return value.replace(/-/g, '')
    })
  }

}

module.exports = Filters
