import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import * as ConversionUtil from "./../../util/conversion_util";
import { BarChart, Line, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import * as ChartUtil from "./../../util/chart_util";

class LowerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walking: true
    }
    this.toggleActivity = this.toggleActivity.bind(this);
  }

  toggleActivity(boolean) {
    return (e) => {
      this.setState({ walking: boolean });
    }

  }

  render() {
    const activitiesFetched = () => {

      if(this.props.activities.length > 0) {

        const classToggle = () => {
          return this.state.walking ? "walking" : "bicycle"
        };

        let activities = ChartUtil.sort_by_activity(this.props.activities, this.state.walking);

        const weeklyTotal = ChartUtil.distanceThisWeek(activities);

        return(
          <div className="dash-lower-left">
            <ul>
              <button onClick={this.toggleActivity(true)}>w<i className="fas fa-walking"></i></button>
              <button onClick={this.toggleActivity(false)}>b<i className="fas fa-bicycle"></i></button>
            </ul>
            <div>
              <p></p>
              <h4>this week</h4>
              <p>{ChartUtil.totalField(weeklyTotal, 'distance')}</p>
              <div>
                <div>
                  <BarChart width={130} height={80} barGap={6} data={weeklyTotal}>
                    <XAxis dataKey="weekday" />

                    <Tooltip />
                    <Bar dataKey="distance" fill="#e6e6eb" />
                  </BarChart>
                </div>
                <div><i className={`fas fa-${classToggle()}`}></i></div>
              </div>
              <div>
                <p>{ChartUtil.totalField(weeklyTotal, 'duration')}</p>
                <p>{ChartUtil.totalField(weeklyTotal, 'elevation')}</p>
              </div>
            </div>
          </div>
        )
      } else {
        return (
        <h1>loading</h1>
        );
      }
    }
    return activitiesFetched();

  }
}
"fas fa-walking"


export default LowerPanel;
