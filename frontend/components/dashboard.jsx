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
      <div>
        <NavbarLoggedInContainer />
        <h1>Dashboard</h1>
        <ul>
          {this.props.activities.map((activity) => {
            return (
              <ActivityShowItem route={this.props.routes[activity.route_id]} activity={activity} currentUser = {this.props.currentUser} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
