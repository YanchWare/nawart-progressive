<template>
  <div class="row text-center">
	  <div class="medium-12 small-12 columns" >
      <div id="contacts-map"></div>
  	</div> 
  </div>
</template>

<script>
import Leaflet from 'leaflet'
export default {
  name: 'contactsMap',
  updated () {
    this.initMap()
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.myMap = this.myMap ? this.myMap : Leaflet.map('contacts-map', { zoomControl: false }).setView([41.7000, 12.5000], 5)
      Leaflet.tileLayer('https://api.mapbox.com/styles/v1/amenuor/ciz06kin600052rmej3o9yrsf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1lbnVvciIsImEiOiJjaXlhZmxzeGkwMDR0MndvZXp3OWgybDI5In0.FVcU8LAD7RwwawnYR4Av8w', {
        attribution: '',
        minZoom: 5,
        maxZoom: 5,
        id: 'mapbox.streets'
      }).addTo(this.myMap)
      const nawartIcon = Leaflet.icon({
        iconUrl: 'http://nawartpress.com/wp-content/uploads/2016/01/pin.png',
        iconAnchor: [20, 74]
      })
      Leaflet.marker([34.0209, -6.8416], {icon: nawartIcon}).addTo(this.myMap)
      Leaflet.marker([45.4667, 9.1833], {icon: nawartIcon}).addTo(this.myMap)
      Leaflet.marker([41.0136, 28.9550], {icon: nawartIcon}).addTo(this.myMap)
    }
  }
}
</script>

<style>
#contacts-map{
  width: 90vw;
  height: 502px;
  margin: auto;
  z-index: 1;
}
</style>