export const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

export const latLngToArray = (latLng, array) => {
  Object.values(getCoordsObj(latLng)).forEach((coord) => {
    array.push(coord);
  });
}



export const markersFromPropsArray = (array, map) => {
  array.forEach((coord, idx) => {
    if (idx%2 === 0) {
      let marker = new google.maps.Marker({
        position: {lat: array[idx], lng: array[idx+1]},
        title: '#',
        map: map
    });
  }
  });
}


export const averageCenter = (encodedPolyline) => {
  const decodedPoly = google.maps.geometry.encoding.decodePath(encodedPolyline);
  // let bounds = new google.maps.LatLngBounds();
  let totalLat = 0
  let totalLng = 0
  decodedPoly.map((latLng) => {
    totalLat += getCoordsObj(latLng).lat;
    totalLng += getCoordsObj(latLng).lng;
    // bounds.extend(getCoordsObj(latLng));
  });
  return { lat: totalLat/decodedPoly.length, lng: totalLng/decodedPoly.length };
}

export const zoomFit = (map, encodedPolyline) => {
  const decodedPoly = google.maps.geometry.encoding.decodePath(encodedPolyline);
  let bounds = new google.maps.LatLngBounds();
  decodedPoly.map((latLng) => {
    bounds.extend(getCoordsObj(latLng));
  });
  map.fitBounds(bounds);
}

export const getMapBounds = (encodedPolyline) => {
  const decodedPoly = google.maps.geometry.encoding.decodePath(encodedPolyline);
  let bounds = new google.maps.LatLngBounds();
  decodedPoly.map((latLng) => {
    bounds.extend(getCoordsObj(latLng));
  });
  return bounds;
}



export const displayRoute = (origin, destination, service, display, travelMode, waypoints) => {
  service.route({
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    travelMode: travelMode,
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

export const getDistance = (dirDisplay) => {
  let distance = 0;
  dirDisplay.getDirections().routes[0].legs.forEach((leg) => {
    distance += parseFloat(leg.distance.text.split(" ")[0]);
  });
  return distance;
}

export const getDuration = (dirDisplay) => {
  let time = 0;
  dirDisplay.getDirections().routes[0].legs.forEach((leg) => {
    time += parseFloat(leg.duration.text.split(" ")[0]);
  });
  time *= 60;
  return parseInt(time);
}


export const getMarkers = (dirDisplay) => {
  let markersArray = [];
  dirDisplay.getDirections().routes[0].legs.forEach((leg, idx) => {
    let start = getCoordsObj(leg.start_location);
    let end = getCoordsObj(leg.end_location);
    if (idx === 0) {
      markersArray.push(start.lat);
      markersArray.push(start.lng);
      markersArray.push(end.lat);
      markersArray.push(end.lng);
    } else {
      markersArray.push(end.lat);
      markersArray.push(end.lng);
    }
  });
  return markersArray;
}
