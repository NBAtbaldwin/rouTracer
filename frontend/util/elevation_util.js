import * as MapUtil from './map_util';


export const getElevationPromise = (dirDisplay) => {
  return new Promise((resolve, reject) => {
    const elevator = new google.maps.ElevationService;
    const path = []; dirDisplay.getDirections().routes[0].overview_path.forEach(coordPair => {
      path.push(MapUtil.getCoordsObj(coordPair));
    })
    let samples;
    if (dirDisplay.getDirections().routes[0].overview_path.length > 100) {
      samples = 500;
    } else {
      samples = Math.ceil(MapUtil.getDistance(dirDisplay)*10);
    }
    if (samples < 2) samples = 2;
    elevator.getElevationAlongPath({
      'path': path,
      'samples': samples
    }, function(results, status) {
      if (status === 'OK') {
        resolve(results)
      } else {
        alert('Could not display elevation due to: ' + status);
      }
    });
  })
}

export const parseElevationGain = (elevationResponse) => {
  let total = 0;
  elevationResponse.forEach((elev, idx) => {
    if (idx !== elevationResponse.length -1 && elev.elevation < elevationResponse[idx+1].elevation) {
      total += (elevationResponse[idx+1].elevation - elev.elevation)*3.28084;
    }
  });
  return total.toFixed(2);
}

export const makeElevationObject = (elevationResponse) => {
  const output = [];
  elevationResponse.forEach((obj, idx) => {
    let dataPoint = {};
    dataPoint.miles = (idx * 0.1).toFixed(2);
    dataPoint.elevation = obj.elevation * 3.28084;
    output.push(dataPoint);
  })
  return output;
}
