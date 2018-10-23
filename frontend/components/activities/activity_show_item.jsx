import React from 'react';
import { Link } from "react-router-dom";
import * as MapUtil from './../../util/map_util';
import * as ConversionUtil from "./../../util/conversion_util";

const ActivityShowItem = ({route, activity, user, feed, friends, friendActivities, nestedInProfile}) => {
  const hasRoute = () => {
    const decodedPoly = google.maps.geometry.encoding.decodePath(route.coordinates_list);
    const codedPoly=route.coordinates_list;
    const center = Object.values(MapUtil.averageCenter(codedPoly)).join();
    let type;
    activity.activity_type === 'WALKING' ? type = 'fas fa-shoe-prints' : type = 'fas fa-bicycle';
    let mapSize;
    feed ? mapSize = "550x180" : mapSize = "800x350";
    return (
      <div className="show-item-container">
        <header>{user.email} - Workout</header>
        <div>
          <div>
            <div className="user-img"></div>
            <div><i className={type}></i></div>
            <ul>
              <li>On {activity.date}</li>
              <li>{activity.title}</li>
              <li>{route.description}</li>
            </ul>
          </div>
          <ul>
            <ul>
              <header>
                <Link to={ nestedInProfile ? `${user.id}` : `profile/${user.id}`}>{user.email}</Link>
              </header>
              <li>On {activity.date}</li>
              <li><Link to={`/activities/${activity.id}`}>{activity.title}</Link></li>
              <li>{route.description}</li>
            </ul>
            <div>
              <ul>
                <li>Distance</li>
                <li><strong>{activity.distance}</strong> mi</li>
              </ul>
              <div className="divide"></div>
              <ul>
                <li>Duration</li>
                <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration)}</strong></li>
              </ul>
              <div className="divide"></div>
              <ul>
                <li>Pace</li>
                <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration/activity.distance)}</strong> /mi</li>
              </ul>
            </div>
          </ul>
        </div>
        <div className="vertical-divide"></div>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${center}&size=${mapSize}&key=${window.googleAPIKey}&path=weight:4%7Ccolor:red%7Cenc:${codedPoly}`}/>
      </div>
    )
  }

  const noRoute = () => {
    let type;
    activity.activity_type === 'WALKING' ? type = 'fas fa-shoe-prints' : type = 'fas fa-bicycle';
    return (
      <div className="show-item-container">
        <header>{user.email} - Workout</header>
        <div>
          <div>
            <div className="user-img"></div>
            <div><i className={type}></i></div>
            <ul>
              <li>On {activity.date}</li>
              <li>{activity.title}</li>
              <li></li>
            </ul>
          </div>
          <ul>
            <ul>
              <header>{user.email}</header>
              <li>On {activity.date}</li>
              <li><Link to={`/activities/${activity.id}`}>{activity.title}</Link></li>
              <li></li>
            </ul>
            <div>
              <ul>
                <li>Distance</li>
                <li><strong>{activity.distance}</strong> mi</li>
              </ul>
              <div className="divide"></div>
              <ul>
                <li>Duration</li>
                <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration)}</strong></li>
              </ul>
              <div className="divide"></div>
              <ul>
                <li>Pace</li>
                <li><strong>{ConversionUtil.hrsMinsSecs(activity.duration/activity.distance)}</strong> /mi</li>
              </ul>
            </div>
          </ul>
        </div>
        <div className="vertical-divide-bottom"></div>
      </div>
    );
  }
  return route !== undefined ? hasRoute() : noRoute();
}

export default ActivityShowItem;
