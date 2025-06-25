<template>
  <!doctype html>
  <html>
    <head>
      <title>Simple Map</title>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
      <meta name="viewport" content="initial-scale=1.0" />
      <meta charset="utf-8" />
    </head>
    <body>
      <div id="map"></div>
    </body>
  </html>
</template>
<script>
var map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 34.225727, lng: -77.94471 }, /// centered on wilmington
    zoom: 13
  })

  // Call the setMarkers function to display markers on the map
  setMarkers(map)
}

/// List of Pins
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const Spots = [
  ['Spot 1', 34.225727, -77.94471, 4], ///set to wilmington
  ['Spot 2', -33.923036, 151.259052, 5],
  ['Spot 3', -34.028249, 151.157507, 3],
  ['Spot 4', -33.80010128657071, 151.28747820854187, 2],
  ['spot 4', -33.950198, 151.259302, 1]
]

function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  }
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  }

  for (let i = 0; i < Spots.length; i++) {
    const Spot = Spots[i]

    new google.maps.Marker({
      position: { lat: Spot[1], lng: Spot[2] },
      map,
      icon: image,
      shape: shape,
      title: Spot[0],
      zIndex: Spot[3]
    })
  }
}
</script>
<script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD14I2uUPhK7oAj5eTT19LAv-M4CY5aYSk&callback=initMap"
  async
  defer
></script>

<style>
/* Always set the map height explicitly to define the size of the div
     * element that contains the map. */
#map {
  height: 100%;
}
/* Optional: Makes the sample page fill the window. */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: lightseagreen;
}
</style>
