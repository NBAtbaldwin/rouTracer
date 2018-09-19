import React from 'react';
import { Link } from "react-router-dom";
import * as MapUtil from './../../util/map_util';
import * as ConversionUtil from "./../../util/conversion_util";

const ActivityShowItem = ({route, activity, currentUser}) => {
  const hasRoute = () => {
    const decodedPoly = google.maps.geometry.encoding.decodePath(route.coordinates_list);
    const codedPoly=route.coordinates_list;
    const center = Object.values(MapUtil.averageCenter(codedPoly)).join();
    return (
      <div>
        <header>{currentUser.email} - Workout</header>
        <div>
          <ul>
            <li>user_img</li>
            <ul>
              <li>On {activity.date}</li>
              <li><Link to={`/activities/${activity.id}`}>{activity.title}</Link></li>
              <li>{route.description}</li>
            </ul>
          </ul>
          <div>
            <ul>
              <li><strong>{activity.distance}</strong> mi</li>
              <li>Distance</li>
            </ul>
            <ul>
              <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration)}</strong></li>
              <li>Duration</li>
            </ul>
            <ul>
              <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration/activity.distance)}</strong> /mi</li>
              <li>Pace</li>
            </ul>
          </div>
        </div>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${center}&size=290x176&key=${window.googleAPIKey}&path=weight:4%7Ccolor:red%7Cenc:${codedPoly}`}/>
      </div>
    )
  }

  const noRoute = () => {
    return (
      <div>
        <header>{currentUser.email} - Workout</header>
        <div>
          <ul>
            <li>user_img</li>
            <ul>
              <li>On {activity.date}</li>
              <li>{activity.title}</li>
              <li>--</li>
            </ul>
          </ul>
          <div>
            <ul>
              <li><strong>{activity.distance}</strong> mi</li>
              <li>Distance</li>
            </ul>
            <ul>
              <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration)}</strong></li>
              <li>Duration</li>
            </ul>
            <ul>
              <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration/activity.distance)}</strong> /mi</li>
              <li>Pace</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return route !== undefined ? hasRoute() : noRoute();
}

export default ActivityShowItem;
