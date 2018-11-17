import React from 'react';
import { Link } from "react-router-dom";
import * as MapUtil from './../../util/map_util';
import * as ConversionUtil from "./../../util/conversion_util";
import CommentContainer from "./../comments/comment_container";

class ActivityShowItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentForm: false,
    }
    this.toggleComment = this.toggleComment.bind(this);
  }

  componentDidMount() {
    // this.props.fetchActivity(this.props.activity.id);
  }

  toggleComment() {
    this.setState({commentForm: !this.state.commentForm});
  }

  componentDidUpdate(prevProps) {
    if (this.props.comments !== prevProps.comments) {
      this.setState({commentForm: false});
    }
  }

  render() {
    let route, activity, user, currentUser, feed, friends, friendActivities, nestedInProfile, nestedInDashboard, comments;
    ({route, activity, user, currentUser, feed, friends, friendActivities, nestedInProfile, nestedInDashboard, comments} = {route: this.props.route, activity: this.props.activity, user: this.props.user, currentUser: this.props.currentUser, feed: this.props.feed, friends: this.props.friends, friendActivities: this.props.friendActivities, nestedInProfile: this.props.nestedInProfile, nestedInDashboard: this.props.nestedInDashboard, comments: this.props.comments});

    const commentsContent = () => {
      if(nestedInDashboard) {
        return(
          <footer className="comment-container">
            {comments.map((comment, idx) => {
              return (
                <div key={idx}>
                  <CommentContainer comment={comment} new={false} activity={activity}/>
                </div>
              )
            })}
          </footer>
        )
      } else {
        return (
          <footer className="comment-container"></footer>
        )
      }
    }

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
          {this.props.nestedInDashboard && (
            <div className="social-buttons">
              <div></div>
              <section>
                <div><i className="far fa-thumbs-up"></i></div>
                <div onClick={this.toggleComment}><i className="far fa-comment-alt"></i></div>
              </section>
            </div>
          )}
          {commentsContent()}
          {this.state.commentForm && (
            <>
              <div className="vertical-divide-comment"></div>
              <CommentContainer comment={null} new={true} activity={activity} />
            </>
          )}
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
          <div className="vertical-divide-comment"></div>
            {this.props.nestedInDashboard && (
              <div className="social-buttons">
                <div></div>
                <section>
                  <div><i className="far fa-thumbs-up"></i></div>
                  <div onClick={this.toggleComment}><i className="far fa-comment-alt"></i></div>
                </section>
              </div>
            )}
            {commentsContent()}
            {this.state.commentForm && (
              <>
                <div className="vertical-divide-comment"></div>
                <CommentContainer comment={null} new={true} activity={activity} />
              </>
            )}
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
