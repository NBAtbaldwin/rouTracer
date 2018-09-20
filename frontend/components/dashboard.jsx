import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import NavbarLoggedInContainer from "./navbar_loggedIn_container";
import ActivityShowItem from "./activities/activity_show_item"

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchActivities();
  }

  render() {
    return(
      <div className="dashboard-master">
        <NavbarLoggedInContainer />
        <div>
          <div className="dashboard-body">
            <div className="workout-feed">
              <ul className="feed-items">
                {this.props.activities.map((activity, idx) => {
                  return (
                    <ActivityShowItem key={idx} route={this.props.routes[activity.route_id]} activity={activity} currentUser = {this.props.currentUser} />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
