import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import NavbarLoggedInContainer from "./navbar_loggedIn_container";
import ActivityShowItem from "./activities/activity_show_item";
import * as ConversionUtil from "./../util/conversion_util";
import DashTopPanel from "./totals/dash_top_panel";
import DashLowerPanelContainer from "./totals/dash_lower_panel_container";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchActivities();
  }

  render() {
    const sortedActivities = this.props.activities.sort(function(a, b) {
      if (ConversionUtil.dateToInt(a.date) < ConversionUtil.dateToInt(b.date)) {
        return 1;
      }
      if (ConversionUtil.dateToInt(a.date) > ConversionUtil.dateToInt(b.date)) {
        return -1;
      }
      return 0;
    });

    return(
      <div className="dashboard-master">
        <NavbarLoggedInContainer />
        <div>
          <div className="dashboard-body">
            <aside className="left-aside">
              <DashTopPanel activities={sortedActivities} currentUser={this.props.currentUser} routeNum={Object.keys(this.props.routes).length}/>
              <DashLowerPanelContainer activities={this.props.activities} />
            </aside>
            <div className="workout-feed">
              <ul className="feed-items">
                {sortedActivities.map((activity, idx) => {
                  return (
                    <ActivityShowItem key={idx} route={this.props.routes[activity.route_id]} activity={activity} currentUser = {this.props.currentUser} feed={true} />
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
