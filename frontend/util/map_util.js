export const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

export const lngLatToArray = (marker, array) => {
  const markerCoords = marker.position;
  Object.values(getCoordsObj(markerCoords)).forEach((coord) => {
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
