import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import * as ConversionUtil from "./../../util/conversion_util";

const TopPanel = ({activities, currentUser, routeNum, friends}) => {
  const activitiesFetched = () => {
    if(activities.length > 0) {
      return(
        <div className="dash-top-container">
          <div>
            <div></div>
            <p>{currentUser.email}</p>
            <div>
              <ul>
                <li>Activities</li>
                <li>{activities.length}</li>
              </ul>
              <ul>
                <li>Friends</li>
                <li>{Object.keys(friends).length}</li>
              </ul>
            </div>
          </div>
          <div>
            <p>Latest Activity</p>
            <p><strong>{activities[0].title} —</strong> {activities[0].date}</p>
          </div>
          <div>
            <p><Link to="/training_log">Your Training Log</Link></p>
            <Link to="/training_log"><i className="fas fa-chevron-right"></i></Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="dash-top-container">
          <div>
            <div></div>
            <p>{currentUser.email}</p>
            <div>
              <ul>
                <li>Activities</li>
                <li>0</li>
              </ul>
              <ul>
                <li>Routes</li>
                <li>0</li>
              </ul>
            </div>
          </div>
          <div>
            <p>Latest Activity</p>
            <p><strong></strong> --/--/-- </p>
          </div>
          <div>
            <p>Your Training Log</p>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      );
    }
  }

  return activitiesFetched();
}


export default TopPanel;
