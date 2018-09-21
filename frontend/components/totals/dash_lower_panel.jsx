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

      const classToggle = () => {
        return this.state.walking ? "walking" : "bicycle"
      };

      const toggleBike = () => {
        return this.state.walking ? "hidden" : "show"
      };

      const toggleRun = () => {
        return this.state.walking ? "show" : "hidden"
      };

      if(this.props.activities.length > 0) {


        let activities = ChartUtil.sort_by_activity(this.props.activities, this.state.walking);

        const weeklyTotal = ChartUtil.distanceThisWeek(activities);

        console.log(weeklyTotal)

        return(
          <div className="dash-lower-left">
            <ul>
              <div onClick={this.toggleActivity(true)} className={toggleRun()}><i className="fas fa-walking"></i></div>
              <div onClick={this.toggleActivity(false)} className={toggleBike()}><i className="fas fa-bicycle"></i></div>
            </ul>
            <div>
              <p></p>
              <h4>this week</h4>
              <p>{ChartUtil.totalField(weeklyTotal, 'distance')} mi.</p>
              <div>
                <div className="chart">
                  <BarChart width={140} height={86} barSize={6} barGap={6} data={weeklyTotal}>
                    <XAxis dataKey="weekday" tickLine={false} minTickGap={2} axisLine={false} />

                    <Tooltip />
                    <Bar dataKey="distance" fill="#e6e6eb" />
                  </BarChart>
                </div>
                <div><i className={`fas fa-${classToggle()}`}></i></div>
              </div>
              <div>
                <p>{ConversionUtil.hrsMins(ChartUtil.totalField(weeklyTotal, 'duration'))}</p>
                <p>{ChartUtil.totalField(weeklyTotal, 'elevation')} ft</p>
              </div>
            </div>
            <div className="placeholder">
            </div>
          </div>
        )
      } else {
        let chartData= ChartUtil.emptyDateData();
        return (
          <div className="dash-lower-left">
            <ul>
              <div onClick={this.toggleActivity(true)} className={toggleRun()}><i className="fas fa-walking"></i></div>
              <div onClick={this.toggleActivity(false)} className={toggleBike()}><i className="fas fa-bicycle"></i></div>
            </ul>
            <div>
              <p></p>
              <h4>this week</h4>
              <p>--:-- mi.</p>
              <div>
                <div className="chart">
                  <BarChart width={140} height={86} barSize={6} barGap={6} data={chartData}>
                    <XAxis dataKey="weekday" tickLine={false} minTickGap={2} axisLine={false} />

                    <Tooltip />
                    <Bar dataKey="distance" fill="#e6e6eb" />
                  </BarChart>
                </div>
                <div><i className={`fas fa-${classToggle()}`}></i></div>
              </div>
              <div>
                <p>00h:00m</p>
                <p>0 ft</p>
              </div>
            </div>
            <div className="placeholder">
            </div>
          </div>
        );
      }
    }
    return activitiesFetched();

  }
}
"fas fa-walking"


export default LowerPanel;
