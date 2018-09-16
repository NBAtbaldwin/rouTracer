export const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

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
