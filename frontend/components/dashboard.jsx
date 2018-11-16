import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import NavbarLoggedInContainer from "./navbar_loggedIn_container";
import ActivityShowItemContainer from "./activities/activity_show_item_container";
import * as ConversionUtil from "./../util/conversion_util";
import DashTopPanel from "./totals/dash_top_panel";
import DashLowerPanelContainer from "./totals/dash_lower_panel_container";
import * as ChartUtil from "./../util/chart_util";
import SuggestedFriendsContainer from "./friends/suggested_friends_container";
import FooterContainer from './footer_container';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      friendFeed: false,
    }
    this.toggleFeed = this.toggleFeed.bind(this);
  }

  componentDidMount() {
    this.props.fetchActivities();
    this.props.fetchComments();
    this.props.fetchUser(this.props.currentUser.id);
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  toggleFeed() {
    this.setState({friendFeed: !this.state.friendFeed});
  }

  createFriendDropdown() {
    return (
      <section
        onBlur={() => this.toggleDropdown()}
        onFocus={() => this.toggleDropdown()}
        tabIndex="0"
        ><span>{this.state.friendFeed ? 'Following   ' : 'Your Activities   '}<i className="fas fa-chevron-down"></i></span>
        <div>
          {this.state.open && (
            <ul>
              <li onClick={this.toggleFeed}>{this.state.friendFeed ? 'Your Activities' : 'Following'}</li>
            </ul>
          )}
        </div>

      </section>
    );
  }

  render() {
    let feedType;
    this.state.friendFeed === true ? feedType = 'friendActivities' : feedType = 'activities'

    const sortedActivities = this.props[feedType].sort(function(a, b) {
      if (ChartUtil.parseDate(a.date) < ChartUtil.parseDate(b.date)) {
        return 1;
      }
      if (ChartUtil.parseDate(a.date) > ChartUtil.parseDate(b.date)) {
        return -1;
      }
      return 0;
    });

    const userSortedActivities = this.props.activities.sort(function(a, b) {
      if (ChartUtil.parseDate(a.date) < ChartUtil.parseDate(b.date)) {
        return 1;
      }
      if (ChartUtil.parseDate(a.date) > ChartUtil.parseDate(b.date)) {
        return -1;
      }
      return 0;
    });

    const feedItems = () => {
      if (sortedActivities.length > 0) {
        return (
          <ul className="feed-items">
            {sortedActivities.map((activity, idx) => {
              let route;
              let user;
              if (this.state.friendFeed) {
                user = this.props.friends[activity.user_id];
                route = this.props.friendRoutes[activity.route_id];
              } else {
                user = this.props.currentUser;
                route = this.props.routes[activity.route_id];
              }

              return (
                <ActivityShowItemContainer key={idx} route={route} activity={activity} user = {user} currentUser={this.props.currentUser} feed={true} friends={this.props.friends} friendActivities={this.props.friendActivities} nestedInProfile={false} />
              );
            })}
          </ul>
        )
      } else {
        return (
          <ul className="empty-feed">
            <p>There's nothing here yet...</p>
            <section>
              <div><Link to={"/new_route"}>Create a Route</Link></div>
              <p>or</p>
              <div><Link to={"/upload"}>Create an Activity</Link></div>
            </section>

          </ul>
        )
      }
    }

    let active;
    this.state.open ? active = 'active' : active = ''
    return(
      <div className="dashboard-master">
        <NavbarLoggedInContainer />
        <div>
          <div className="dashboard-body">
            <aside className="left-aside">
              <DashTopPanel activities={userSortedActivities} currentUser={this.props.currentUser} routeNum={Object.keys(this.props.routes).length} friends={this.props.friends} />
              <DashLowerPanelContainer activities={this.props.activities} />
            </aside>
            <div className="workout-feed">
              <div className={`dropdown ${active}`}>{this.createFriendDropdown()}</div>
              {feedItems()}
            </div>
            <div>
              <SuggestedFriendsContainer />
              <FooterContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
