<template>
  <div id="portfolio-map-container">
    <div id="controls">
      <h2>Stories: {{countriesLatLang.reduce((previous, current)=>{
        return previous + (categories[current.catId] ? categories[current.catId].count : 0)}, 0)}}</h2>
    </div>
    <div id="portfolio-map"></div>
  </div>
</template>

<script>
import Leaflet from 'leaflet'
export default {
  name: 'portfolioMap',
  props: ['categories'],
  data: function () {
    return {
      countriesLatLang: [
        { catId: '654', location: [41, 20], name: 'Albania' },
        { catId: '867', location: [41.66667, 21.75], name: 'Balcani' },
        { catId: '659', location: [48, 68], name: 'Central Asia' },
        { catId: '687', location: [-2.5, 23.5], name: 'Congo' },
        { catId: '15', location: [27, 30], name: 'Egypt' },
        { catId: '959', location: [46, 2], name: 'Francia' },
        { catId: '689', location: [31.5, 34.46667], name: 'Gaza' },
        { catId: '656', location: [39, 22], name: 'Greece' },
        { catId: '898', location: [47, 20], name: 'Hungary' },
        { catId: '17', location: [32, 53], name: 'Iran' },
        { catId: '658', location: [33, 44], name: 'Iraq' },
        { catId: '16', location: [31.92157, 35.20329], name: 'Israel and Palestine' },
        { catId: '685', location: [42.83333, 12.83333], name: 'Italy' },
        { catId: '691', location: [31, 36], name: 'Jordan' },
        { catId: '660', location: [32, -6], name: 'Morocco' },
        { catId: '690', location: [35, 38], name: 'Siria' },
        { catId: '688', location: [34, 9], name: 'Tunisia' },
        { catId: '657', location: [39, 35], name: 'Turkey' },
        { catId: '692', location: [15.5, 47.5], name: 'Yemen' }
      ]
    }
  },
  updated () {
    this.initMap()
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.myMap = this.myMap ? this.myMap : Leaflet.map('portfolio-map', { zoomControl: false }).setView([37.7220031, 15.1464744], 11)
      this.myMap.scrollWheelZoom.disable()
      this.myMap.on({click: () => { this.myMap.scrollWheelZoom.enable() }, mouseout: () => { this.myMap.scrollWheelZoom.disable() }})
      Leaflet.tileLayer('https://api.mapbox.com/styles/v1/amenuor/ciz06kin600052rmej3o9yrsf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1lbnVvciIsImEiOiJjaXlhZmxzeGkwMDR0MndvZXp3OWgybDI5In0.FVcU8LAD7RwwawnYR4Av8w', {
        maxZoom: 18,
        attribution: '',
        id: 'mapbox.streets'
      }).addTo(this.myMap)
      this.updateMap()
    },
    updateMap () {
      if (!this.categories) {
        return
      }

      let markers = this.countriesLatLang.map((country) => {
        return {
          id: country.catId,
          name: country.name,
          location: country.location,
          icon: {
            iconSize: [25, 25],
            className: 'map-marker',
            html: this.categories[country.catId] ? this.categories[country.catId].count : 0
          }
        }
      })

      // Remove existing Markers
      if (this.myMap.markersOnMap && this.myMap.markersOnMap.length > 0) {
        this.myMap.markersOnMap.map((marker) => {
          this.myMap.removeLayer(marker)
        })
      }
      // Add new markers
      this.myMap.markersOnMap = markers.map((marker) => {
        let markerIcon = Leaflet.divIcon(marker.icon)
        let markerOnMap = Leaflet.marker(marker.location, {icon: markerIcon}).addTo(this.myMap)
        // Add circle around marker
        let icon = window.$(markerOnMap._icon)
        let className = marker.name.replace(/\s/g, '_')
        icon.parent().find('#' + className).remove()
        icon.parent().append(this.getSpinnerCode(className))
        icon.parent().find('#' + className).css({
          'transform': icon.css('transform'),
          'margin-left': icon.css('margin-left') + icon.position().left,
          'margin-top': icon.css('margin-top') + icon.position().top
        })
        this.myMap.on('zoomend', function () {
          icon.parent().find('#' + className).css('transform', icon.css('transform'))
        })
        markerOnMap.on('click', () => {
          this.$router.push({ name: 'locations', params: { name: marker.name } })
        })
        return markerOnMap
      })
      /* eslint-disable new-cap */
      let group = new Leaflet.featureGroup(this.myMap.markersOnMap)
      this.myMap.fitBounds(group.getBounds())
    },
    getSpinnerCode (markerId) {
      return '<div id="' + markerId + '" class="showbox"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div>'
    }
  }
}
</script>

<style>
h2{
 text-align: center;
 margin: 0;
 padding: 10px;
}

#controls {
  margin-top: 75px;
  height: 75px;
  width: 30vw;
}
#portfolio-map{
  width: 40vw;
  margin-left: -80px;
  height: 100vh;
  padding: 0;
  z-index: 1;
}
/* Markers */
.map-marker{
  border-radius: 50%;
  text-align: center;
  background: #ff7979;
  color: #eee;
  z-index: -2;
  line-height: 2em;
}
.showbox{
  position: absolute;
  top: inherit;
}
.loader {
  width: 35px;
  width: 35px;
  position: relative;
  top: -52px;
  left: -17px;
}
.loader:before {
  content: '';
  display: block;
  padding-top: 100%;
}
.circular {
  -webkit-animation: rotate 2s linear infinite;
          animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
          transform-origin: center center;
  width: 100%;
  margin: auto;
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
          animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}
@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@-webkit-keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
</style>