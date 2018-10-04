import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import * as ConversionUtil from "./../../util/conversion_util";
import { CartesianGrid, LabelList, ScatterChart, Scatter, Line, XAxis, YAxis, ZAxis, Tooltip, Legend, Bar} from 'recharts';
import * as ChartUtil from "./../../util/chart_util";
import NavbarLoggedInContainer from "./../navbar_loggedIn_container";
import FooterContainer from "./../footer_container";
import ActivityChart from './training_chart';

class TrainingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activityType: 'WALKING',
      metric: 'distance'
    };
  }

  componentDidMount() {
    this.props.fetchActivities();
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  toggleActivity(type) {
    return () => {
      this.setState({activityType: type});
    }
  }

  toggleMetric(type) {
    return () => {
      this.setState({metric: type});
    }
  }

  createMetricDropdown() {
    return (
      <section
        onBlur={() => this.toggleDropdown()}
        onFocus={() => this.toggleDropdown()}
        tabIndex="0"
        ><span>{this.state.metric}<i className="fas fa-caret-down"></i></span>
        <div>
          {this.state.open && (
            <ul>
              <li onClick={this.toggleMetric("duration")}>Duration</li>
              <li onClick={this.toggleMetric("distance")}>Distance</li>
            </ul>
          )}
        </div>

      </section>
    );
  }

  createActivityButtons() {
    return (
      <div>
        <div onClick={this.toggleActivity("WALKING")} className={this.state.activityType === 'WALKING' ? 'selected' : ''}>Running</div>
        <div onClick={this.toggleActivity("BICYCLING")} className={this.state.activityType === 'BICYCLING' ? 'selected' : ''}>Cycling</div>
      </div>
    )
  }

  render() {
    if (this.props.activities.length === 0) {
      return (
        <div className="traininglog-master">
          <NavbarLoggedInContainer />
          <div className="traininglog-container">
            <div>
              <div>
                <h1>Training Log</h1>
                {this.createActivityButtons()}
              </div>
              <div>
                {this.createMetricDropdown()}
                <ul>
                  <li>Mon</li>
                  <li>Tue</li>
                  <li>Wed</li>
                  <li>Thu</li>
                  <li>Fri</li>
                  <li>Sat</li>
                  <li>Sun</li>
                </ul>
              </div>
            </div>
          </div>
          <FooterContainer />
        </div>
      )
    } else {
      const activities = this.props.activities
      const domain = ChartUtil.parseDomain(activities)
      const allActivities = ChartUtil.distanceAllWeeks(activities, this.state.activityType);

      return (
        <div className="traininglog-master">
          <NavbarLoggedInContainer />
          <div className="traininglog-container">
            <div>
              <div>
                <h1>Training Log</h1>
                {this.createActivityButtons()}
              </div>
              <div>
                {this.createMetricDropdown()}
                <ul>
                  <li>Mon</li>
                  <li>Tue</li>
                  <li>Wed</li>
                  <li>Thu</li>
                  <li>Fri</li>
                  <li>Sat</li>
                  <li>Sun</li>
                </ul>
              </div>
              <section>
                {
                  allActivities.map( (week, idx) => {
                    const timeTotal = ChartUtil.chartTimeLabel(week);
                    const distTotal = ChartUtil.chartDistLabel(week);
                    const dateRange = ChartUtil.chartDateRangeLabel(week);
                    return(
                      <div className="week-container">
                        <ul>
                          <li>{dateRange}</li>
                          <li>{this.state.metric === "distance" ? timeTotal > 0 ? `${ConversionUtil.activityChartTime(timeTotal)}` : "--:--" : `${distTotal} mi`}</li>
                          <li>{this.state.metric === "duration" ? timeTotal > 0 ? `${ConversionUtil.activityChartTime(timeTotal)}` : "--:--" : `${distTotal} mi`}</li>
                        </ul>
                        <ActivityChart week={week} activities={activities} activityType = {this.state.activityType} metric={this.state.metric} />
                      </div>
                    );
                  })
                }
              </section>
            </div>
          </div>
          <FooterContainer />
        </div>
      )
    }
  }
}

export default TrainingLog
