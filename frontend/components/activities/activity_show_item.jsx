import React from 'react';
import { Link } from "react-router-dom";
import * as MapUtil from './../../util/map_util';
import * as ConversionUtil from "./../../util/conversion_util";
import CommentContainer from "./../comments/comment_container";

class ActivityShowItem extends React.Component {
  constructor(props) {
    super(props)
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // this.props.fetchActivity(this.props.activity.id);
  }

  render() {
    let route, activity, user, currentUser, feed, friends, friendActivities, nestedInProfile, comments;
    ({route, activity, user, currentUser, feed, friends, friendActivities, nestedInProfile, comments} = {route: this.props.route, activity: this.props.activity, user: this.props.user, currentUser: this.props.currentUser, feed: this.props.feed, friends: this.props.friends, friendActivities: this.props.friendActivities, nestedInProfile: this.props.nestedInProfile, comments: this.props.comments});

    const hasRoute = () => {
      const decodedPoly = google.maps.geometry.encoding.decodePath(route.coordinates_list);
      const codedPoly=route.coordinates_list;
      const center = Object.values(MapUtil.averageCenter(codedPoly)).join();
      let type;
      activity.activity_type === 'WALKING' ? type = 'fas fa-shoe-prints' : type = 'fas fa-bicycle';
      let mapSize;
      feed ? mapSize = "550x180" : mapSize = "800x350";

      const mapForCurrentUser = () => {
        if (user === currentUser) {

          return (
            <Link to={`/routes/${route.id}`} ><img src={`https://maps.googleapis.com/maps/api/staticmap?center=${center}&size=${mapSize}&key=${window.googleAPIKey}&path=weight:4%7Ccolor:red%7Cenc:${codedPoly}`}/></Link>
          )
        } else {

          return (
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${center}&size=${mapSize}&key=${window.googleAPIKey}&path=weight:4%7Ccolor:red%7Cenc:${codedPoly}`}/>
          )
        }
      }

      return (
        <div className="show-item-container">
          <header>{user.email} - Workout</header>
          <div>
            <div>
              <img src={user.photoUrl} className="user-img"></img>
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
          {mapForCurrentUser()}
          <div className="vertical-divide"></div>
          <footer className="comment-container">
            {comments.map((comment, idx) => {
              return (
                <div key={idx}>
                  <CommentContainer comment={comment} new={false} activity={activity}/>
                </div>
              )
            })}
          </footer>
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
              <img src={user.photoUrl} className="user-img"></img>
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

}

// ({route, activity, user, currentUser, feed, friends, friendActivities, nestedInProfile}) => {
//
// }

export default ActivityShowItem;
