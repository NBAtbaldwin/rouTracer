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
      overview: false,
      friends: true,
      followRequests: false,
    }
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.fetchPendingFriends();
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchActivities()
  }

  handleConfirm(userId, friendId) {
    return () => {
      this.props.updateFriendship({requestee_id: userId, requester_id: friendId, status: 'accepted' }).then(() => (
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
                    </div>
                    <div className={this.state.friends ? "friends" : "hidden"}>
                      <ul>
                        {Object.keys(this.props.friends).map((id, idx) => {
                          return (
                            <li key={idx}>
                              <div className='prof-pic'></div>
                              <div>
                                <p><Link to={`${id}`}>{this.props.friends[id].email}</Link></p>
                                <div></div>
                              </div>
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
                <div className="dash-lower-left">
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
        {this.props.activities && this.props.user ? loaded() : waitingForProps()}
      </div>
    )
  }
}

export default Profile;
