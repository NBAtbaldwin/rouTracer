
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

 function addMarker(event) {
   let marker = new google.maps.Marker({
     position: event.latLng,
     title: '#',
     map: that.map
   });
 }


 componentDidMount() {
   const mapOptions = {
     center: {
       lat: 40.7831,
       lng: -73.9712
     },
     zoom: 14
   };
   const service = new google.maps.DirectionsService;
   let path = new google.maps.MVCArray();
   let poly;
   let infoWindow;
   // creates map
   this.map = new google.maps.Map(this.mapNode, mapOptions);

   // initiates polyline
   poly = new google.maps.Polyline({
         strokeColor: '#000000',
         strokeOpacity: 1.0,
         strokeWeight: 0,
       });
   poly.setMap(this.map);
   const that = this;
   // traces shortest path on roads onscreen
   google.maps.event.addListener(this.map, "click", function(evt) {
     if (path.getLength() === 0) {

       path.push(evt.latLng);
       poly.setPath(path);
       // let marker = new google.maps.Marker({
       //   position: evt.latLng,
       //   title: '#',
       //   map: that.map
       // });
       MapUtil.latLngToArray(evt.latLng, that.state.marker_coordinates);

     } else {

       let travelMode;
       that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;
       service.route({
         origin: path.getAt(path.getLength() - 1),
         destination: evt.latLng,
         travelMode: travelMode
       }, function(result, status) {
         if (status == google.maps.DirectionsStatus.OK) {

           let directionsDisplay = new google.maps.DirectionsRenderer({
             draggable: true,
             map: that.map,
           });
           MapUtil.displayRoute(path.getAt(path.getLength() - 1), evt.latLng, service, directionsDisplay, travelMode);

           for (let i = 0, len = result.routes[0].overview_path.length;
               i < len; i++) {
             path.push(result.routes[0].overview_path[i]);
             if (i === result.routes[0].overview_path.length-1) {

               // add distance, marker coordinates, duration of new segment to state
               let distance = that.state.distance + parseDist(result.routes[0].legs[0].distance.text);
               let duration = that.state.est_duration + result.routes[0].legs[0].duration.value;
               let finalPolyLine = google.maps.geometry.encoding.encodePath(poly.getPath())
               MapUtil.latLngToArray(evt.latLng, that.state.marker_coordinates);
               that.setState({
                 coordinates_list: finalPolyLine,
                 distance: distance,
                 est_duration: duration,
               });
             };
           }
         }
       });
     }
   });
