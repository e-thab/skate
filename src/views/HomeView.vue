<script setup>
import { ref, computed, watch } from 'vue'
import { activeSubmitSpot } from '@/stores/activeSubmitSpot';
import { activeUser } from '@/stores/activeUser'
import HomeMap from '../components/HomeMap.vue';
import SpotSideBar from '../components/SpotSidebar.vue'
import SubmitSidebar from '../components/SubmitSidebar.vue'

const mapComponent = ref(null)
const showSpotSidebar = ref(false)
const showSubmitSidebar = ref(false)
const showSubmitMarker = ref(false)

// When the user clicks a marker to view a spot, it's assigned to this object
const viewSpot = ref(null)

// If they view another spot or collapse the sidebar, this data isn't lost;
// resuming submission restores input info.
// If they cancel, the spot is reset to default values.

const sidebarMode = {
  // Enum for which kind of sidebar to display
  VIEW: 0,
  SUBMIT: 1
}
const mostRecentClick = ref(sidebarMode.SPOT)

const mapWidth = computed(() => {
  // Map is styled at 80% width if sidebar is open, 100% otherwise
  return (showSpotSidebar.value || showSubmitSidebar.value) ? '80%' : '100%'
})

function onSpotCloseBtnClick() {
  // Function to run when pressing the X button in the spot sidebar
  showSpotSidebar.value = false
  showSubmitSidebar.value = false
}
function onSubmitCloseBtnClick() {
  // Function to run when pressing the X button in the submit sidebar
  showSpotSidebar.value = false
  showSubmitSidebar.value = false
}

function onMarkerClick(selected) {
  // Function to run when clicking a marker on the map, selected
  // is the spot object associated with that marker
  showSpotSidebar.value = true
  mostRecentClick.value = sidebarMode.VIEW
  viewSpot.value = selected
}
function onSubmitClick(latLng) {
  if (activeUser.loggedIn) {
    // Begin or resume submit
    // if (!showSubmitMarker.value) {
      // Showing sidebar either for the first time or resuming after cancel
    // }
    activeSubmitSpot.setPosFromLatLng(latLng)
    showSubmitSidebar.value = true
    showSubmitMarker.value = true
    mostRecentClick.value = sidebarMode.SUBMIT
  }
}
function onSubmitDrag(latLng) {
  // If no sidebar is showing, don't automatically show when dragging event starts. That makes the marker location jump.
  // If no sidebar is showing when drag starts, the drag-end event (treated like a marker click) triggers it to display.
  if (showSpotSidebar.value || showSubmitSidebar.value) {
    onSubmitClick(latLng)
  }
}
function onSubmitCancel() {
  // Submit cancel button pressed
  showSubmitSidebar.value = false
  showSubmitMarker.value = false
  mostRecentClick.value = sidebarMode.VIEW
  activeSubmitSpot.reset()
}
function onSubmit() {
  // Submit button pressed
  activeSubmitSpot.setCreatedBy(activeUser.email)
  console.log(
    "Submitting spot:\n" +
    activeSubmitSpot.getLogString()
  )
  mapComponent.value.createPin(
    activeSubmitSpot.name,
    activeSubmitSpot.description,
    activeSubmitSpot.lat,
    activeSubmitSpot.lng,
    activeSubmitSpot.rating,
    activeSubmitSpot.img,
    activeSubmitSpot.difficulty,
    activeUser.email
  )
  onSubmitCancel()
}
function onDelete(spot) {
  // Delete button pressed
  const confirmDelete = confirm(`Are you sure you want to delete the pin " ${spot.name} "?`);
  if (confirmDelete) {
    // deletePin(spot.name, spot.lat, spot.lng);
    console.log(
      "Deleting spot:\n" +
      spot.getLogString()
    )
    mapComponent.value.deletePin(spot)
    onSpotCloseBtnClick()
  }
}

watch(activeUser, (newVal) => {
  //activeUser changed; probably means user has logged out. Hide submit sidebar
  if (!newVal.loggedIn) {
    onSubmitCancel()
  }
})
</script>

<template>
    <div class="homeview-container">
      <div v-if="showSpotSidebar && mostRecentClick === sidebarMode.VIEW" class="sidebar" style="width: 20%"> 
        <SpotSideBar :spot="viewSpot" @delete="onDelete" @close="onSpotCloseBtnClick" />
      </div>

      <div v-if="showSubmitSidebar && mostRecentClick === sidebarMode.SUBMIT" class="sidebar" style="width: 20%">
        <!-- Look into KeepAlive component -->
        <SubmitSidebar @close="onSubmitCloseBtnClick" @cancel="onSubmitCancel" @submit="onSubmit"  />
      </div>

      <div class="map" :style="{ width: mapWidth }">
        <Suspense>
          <!-- Async component rendered once awaits are resolved -->
          <HomeMap ref="mapComponent" :showSubmitMarker="showSubmitMarker" @map-click="onSubmitClick" @marker-click="onMarkerClick" @submit-click="onSubmitClick" @submit-drag="onSubmitDrag"/>

          <!-- Fallback component to render while waiting -->
          <template #fallback>
            <div class="homeview-container">
              <div style="margin: auto; font-size: 30px; color: darkgray;">
                Loading...
              </div>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
</template>

<style>
.sidebar {
  min-width: 400px;
}
.map {
  height: 100%;
}
.homeview-container {
  display: flex;
  position: fixed;
  top: 60px;  /* Header height */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #e8eaed;
}
</style>
