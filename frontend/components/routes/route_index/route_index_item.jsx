import React from 'react';
import { Link } from 'react-router-dom';
import * as MapUtil from './../../../util/map_util';
import * as ConversionUtil from './../../../util/conversion_util';

class RouteIndexItem extends React.Component {

  render() {
    const { route, deleteRoute } = this.props;
    const decodedPoly = google.maps.geometry.encoding.decodePath(route.coordinates_list);
    const codedPoly=route.coordinates_list;
    const center = Object.values(MapUtil.averageCenter(codedPoly)).join();
    return(
      <li className="route-index-item">
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${center}&size=290x176&key=${window.googleAPIKey}&path=weight:4%7Ccolor:red%7Cenc:${codedPoly}`}/>
        <button onClick={(() => deleteRoute(route.id))}>Delete Route</button>
        <div className="route-index-stats">
          <Link to={`routes/${route.id}`}>{route.route_name}</Link>
          <ul>
            <li>
              <div><strong>{route.distance}</strong>mi</div>
              <p>Distance</p>
            </li>
            <li>
              <div><strong>100</strong>ft</div>
              <p>Elevation Gain</p>
            </li>
          </ul>
          <p>Est. Moving Time <span>{ConversionUtil.hrsMinsSecs(route.est_duration)}</span></p>
        </div>
        <p>Created on {ConversionUtil.displayDate(route.created_at)}</p>
      </li>
    );
  }
}

export default RouteIndexItem;
