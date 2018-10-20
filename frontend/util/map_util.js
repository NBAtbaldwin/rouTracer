export const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

export const latLngToArray = (latLng, array) => {
  Object.values(getCoordsObj(latLng)).forEach((coord) => {
    array.push(coord);
  });
}

export const coordsObjFromArray = (lat, lng) => ({
  lat: lat,
  lng: lng
})


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
      console.log(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

export const getDistance = (dirDisplay) => {
  let distance = 0;
  dirDisplay.getDirections().routes[0].legs.forEach((leg) => {
    if (leg.distance.text.split(" ")[1] === 'ft') {
      distance += parseFloat(( parseFloat(leg.distance.text.split(" ")[0]) / 5280).toFixed(2));
      console.log(distance);
    } else {
      distance += parseFloat(leg.distance.text.split(" ")[0]);
    }
  });
  return distance;
}

export const getDuration = (dirDisplay) => {
  let time = 0;
  dirDisplay.getDirections().routes[0].legs.forEach((leg) => {
    time += durationSplit(leg.duration.text.split(" "));
  });
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

export const getWayPoints = (coords) => {
  const output = [];
  coords.forEach((coord, idx) => {
    if (idx % 2 === 0) {
      output.push({
        location: {
          lat: coords[idx],
          lng: coords[idx+1]
        }
      });
    }
  });
  output.shift();
  output.pop();
  return output;
}

export const getWayPointsWithStartEnd = (coords) => {
  const output = [];
  coords.forEach((coord, idx) => {
    if (idx % 2 === 0) {
      output.push({
        location: {
          lat: coords[idx],
          lng: coords[idx+1]
        }
      });
    }
  });
  return output;
}

export const durationSplit = (duration) => {
  let output = 0;
  switch (duration[1]) {
    case "min":
      return parseInt(duration[0])*60;
    case "mins":
      return parseInt(duration[0])*60;
    case "hour":
      if (duration.length > 2) {
        return parseInt(duration[0])*3600+parseInt(duration[2])*60;
      } else {
        return parseInt(duration[0])*3600;
      }
    case "hours":
      if (duration.length > 2) {
        return parseInt(duration[0])*3600+parseInt(duration[2])*60;
      } else {
        return parseInt(duration[0])*3600;
      }
    case "day":
      if (duration.length > 2) {
        return parseInt(duration[0])*86400+parseInt(duration[2])*3600;
      } else {
        return parseInt(duration[0])*86400;
      }
    case "days":
      if (duration.length > 2) {
        return parseInt(duration[0])*86400+parseInt(duration[2])*3600;
      } else {
        return parseInt(duration[0])*86400;
      }
    default:
      return output;
  }
}

export const getMiddleWayPoints = (wayPoints) => {
  let output = [];
  wayPoints.forEach((point, idx) => {
    if (idx !== 0) {
      output.push(point);
    }
  });
  return output;
}

export function currentPosition() {
  let infoWindow;
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Current position.');
      infoWindow.open(this.map);
      this.map.setCenter(pos);
    }, () => {
      handleLocationError(true, infoWindow, this.map.getCenter())
    })} else {
      handleLocationError(false, infoWindow, this.map.getCenter());
    }
}

export const mapOptions = {
  center: {
    lat: 40.7831,
    lng: -73.9712
  },
  zoom: 14,
  zoomControl: true,
  zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
  },
};
