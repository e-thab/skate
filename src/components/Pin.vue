<script setup>
import { ref, computed } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'
import axios from 'axios'

const debug = ref(false)
const spots = ref([])
const getError = ref(null)
const setError = ref(null)
const popError = ref(null)

async function createPin(name, lat, lon, rating, picture, difficulty) {
  setError.value = null
  await axios.post('http://localhost:8000/pin/api/create-pin', {
      name, lat, lon, rating, picture, difficulty
    })
    .catch(error => setError.value = error)
}

async function handleMapClick(event) {
  console.log("Map clicked at:", event.latLng.lat(), event.latLng.lng(),"!")
  const confirmAdd = confirm("Do you want to add a pin here?")
  if (confirmAdd) {
    const name = prompt("Enter the name for the pin:")
    const rating = prompt("Enter the rating for the pin (1-5):")
    const picture = prompt("Enter the picture URL for the pin:")
    const difficulty = prompt("Enter the difficulty for the pin:")
    createPin(name, event.latLng.lat(), event.latLng.lng(), rating, picture, difficulty)
    .then(() => {
        // Add the newly created pin to the map
        spots.value.push({
          name: name,
          pos: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          rating: rating,
          img: picture,
          difficulty: difficulty
        })
      })
      .catch(error => setError.value = error)
  }
}




</script>

<template>
  <GoogleMap
    ref="mapRef"
    api-key="AIzaSyCwzZFoGNcxoRMmQOlwrB81ShKfQNW1U6o"
    class="map"
    :center="center"
    :zoom="13"
    :styles="mapStyles"
    @click="handleMapClick"
  >
    <MarkerCluster>
      <Marker
        v-for="(spot, i) in spots"
        :key="i"
        :options="{
          position: spot['pos'],
          map: map,
          icon: markerIcon,
          shape: shape,
          title: spot['name']
        }"
        @click="$emit('marker-click', spots[i])"
      />
    </MarkerCluster>
  </GoogleMap>
  <div v-if="debug" style="display: grid; position: fixed; left: 700px; top: 200px; color:black; background-color: magenta;">
    <div>setError: {{ setError }}</div>
    <div>getError: {{ getError }}</div>
    <div>popError: {{ popError }}</div>
  </div>
</template>
