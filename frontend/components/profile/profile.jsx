import React from 'react';
import { Link } from "react-router-dom";
import NavbarloggedInContainer from "./../navbar_loggedIn_container";
import FooterContainer from "./../footer_container";
import ActivityShowItem from "./../activities/activity_show_item";
import DashLowerPanelContainer from './../totals/dash_lower_panel_container';
import * as ChartUtil from './../../util/chart_util';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: true,
      friends: false,
      followRequests: false,
    }
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchPendingFriends();
    this.props.fetchActivities()
  }

  componentWillReceiveProps(nextProps){
    if (this.props.match.params.userId !== nextProps.match.params.userId) {
      this.props.fetchUser(nextProps.match.params.userId);
      this.props.fetchPendingFriends();
      this.props.fetchActivities();
      this.setState({
        overview: false,
        friends: true,
        followRequests: false,
      });
    }
  }

  handleConfirm(userId, friendId) {
    return () => {
      this.props.updateFriendship({requestee_id: userId, requester_id: friendId, status: 'accepted' }).then(() => (
        this.props.fetchPendingFriends()
      ))
    }
  }

  handleCreate(userId, suggestedId) {
    return () => {
      this.props.createFriendship({requester_id: userId, requestee_id: suggestedId, status: 'pending' }).then(() => (
        this.props.fetchPendingFriends()
      ))
    }
  }

  toggleTab(field) {
    return () => {
      this.setState({
        overview: false,
        friends: false,
        followRequests: false,
      })
      this.setState({[field]: true})
    }
  }

  render() {


    const loaded = () => {
      const sortedActivities = this.props.activities.sort(function(a, b) {
        if (ChartUtil.parseDate(a.date) < ChartUtil.parseDate(b.date)) {
          return 1;
        }
        if (ChartUtil.parseDate(a.date) > ChartUtil.parseDate(b.date)) {
          return -1;
        }
        return 0;
      });

      const isCurrentUser = () => {
        if (this.props.user === this.props.currentUser) {
          return (
            <li onClick={this.toggleTab('followRequests')} className={this.state.followRequests ? "selected" : ""} >Follow Requests</li>
          )
        }
      }

      const isCurrentUserFriend = (id) => {
        if (parseInt(id) === this.props.currentUser.id) {
          return
        }
        if (this.props.currentUser.requester_ids.includes(parseInt(id))) {
          return (
            <div onClick={this.handleCreate(this.props.currentUser.id, id)}>Confirm</div>
          )
        } else if (!this.props.currentUser.friend_ids.includes(parseInt(id)) && !this.props.currentUser.requested_ids.includes(parseInt(id))){
          return (
            <div onClick={this.handleCreate(this.props.currentUser.id, id)}>Request to Follow</div>
          )
        }
      }

      return (
        <div className='profile-master'>
          <NavbarloggedInContainer />
          <div className='profile-body'>
            <div>
              <section>
                <div>
                  <div className="prof-pic"></div>
                </div>
                <div>
                  <h1>{this.props.user.email}</h1>
                  <ul>
                    <li>Last 4 Weeks</li>
                    <li>{this.props.activities.length}</li>
                    <li>Total Activities</li>
                  </ul>
                </div>
              </section>
              <section>
                <div className='tabs'>
                  <ul>
                    <li onClick={this.toggleTab('overview')} className={this.state.overview ? "selected" : ""}>Overview</li>
                    <li onClick={this.toggleTab('friends')} className={this.state.friends ? "selected" : ""}>Friends</li>
                    {isCurrentUser()}
                  </ul>
                  <div>
                    <div className={this.state.overview ? "overview" : "hidden"}>
                      <ul className="feed-items">
                        {sortedActivities.map((activity, idx) => {
                          let route = this.props.routes[activity.route_id];
                          let user = this.props.user

                          return (
                            <ActivityShowItem key={idx} route={route} activity={activity} currentUser = {user} feed={true} friends={this.props.friends} friendActivities={this.props.friendActivities} />
                          );
                        })}
                      </ul>
                    </div>
                    <div className={this.state.friends ? "friends" : "hidden"}>
                      <ul>
                        {Object.keys(this.props.friends).map((id, idx) => {
                          return (
                            <li key={idx}>
                              <section>
                                <div className='prof-pic'></div>
                                <div>
                                  <p><Link to={`${id}`}>{this.props.friends[id].email}</Link></p>
                                  <div></div>
                                </div>
                              </section>
                              {isCurrentUserFriend(id)}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className={this.state.followRequests ? "follow-requests" : "hidden"}>
                      <ul>
                        {this.props.pendingFriends.map((friend, idx) => {
                          return (
                            <li key={idx}>
                              <section>
                                <div className='prof-pic'></div>
                                <div>
                                  <p><Link to={`${friend.id}`}>{friend.email}</Link></p>
                                </div>
                              </section>
                              <div onClick={this.handleConfirm(this.props.currentUser.id, friend.id)}>Confirm</div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="lower-left-container">
                  <DashLowerPanelContainer activities={this.props.activities} />
                </div>
              </section>
            </div>
          </div>
          <FooterContainer />
        </div>
      )
    }
    const waitingForProps = () => {
      return (
        <div>
          loading
        </div>
      )
    }

    return (
      <div>
        {this.props.activities && this.props.user && this.props.user.friend_ids ? loaded() : waitingForProps()}
      </div>
    )
  }
}

export default Profile;