
// listener for adding coordinates to onscreen map
this.map.addListener('click', addLatLng);
// listener for adding coordinates to polyline string
google.maps.event.addListener(this.map, 'click', function(event) {
  addLatLngToPoly(event.latLng, poly);
});
// Adds to displayed polyPath on map
function addLatLng(event) {
  let polyPath = poly.getPath();
  polyPath.push(event.latLng);
  let marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + polyPath.getLength(),
    map: that.map
  });
}
// adds current marker to polyline string
function addLatLngToPoly(latLng, poly) {
   let polyPath = poly.getPath();
   polyPath.push(latLng);
   let encodeString = google.maps.geometry.encoding.encodePath(polyPath);
   that.setState({coordinates_list: encodeString})
   console.log(that.state);
 }
