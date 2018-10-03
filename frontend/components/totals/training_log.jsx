import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import * as ConversionUtil from "./../../util/conversion_util";
import { ScatterChart, Scatter, Line, XAxis, YAxis, ZAxis, Tooltip, Legend, Bar} from 'recharts';
import * as ChartUtil from "./../../util/chart_util";
import NavbarLoggedInContainer from "./../navbar_loggedIn_container";
import FooterContainer from "./../footer_container";


class TrainingLog extends React.Component {

  componentDidMount() {
    this.props.fetchActivities();
  }

  renderTooltip(props) {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div style={{ backgroundColor: '#ccc', border: '5px solid #999', margin: 0, padding: 10 }}>
          <p>{data.formattedDate.toString()}</p>
          <p><span>distance: </span>{data.distance}</p>
        </div>
      );
    }

    return null;
  }

  render() {
    if (this.props.activities.length === 0) {
      return (
        <div className="traininglog-master">
          <NavbarLoggedInContainer />
          <div className="traininglog-container">

          </div>
          <FooterContainer />
        </div>
      )
    } else {
      // const weeklyTotal = ChartUtil.distanceThisWeek(this.props.activities);
      const allActivities = ChartUtil.distanceAllWeeks(this.props.activities);
      return (
        <div className="traininglog-master">
          <NavbarLoggedInContainer />
          <div className="traininglog-container">
            <div>
              {
                allActivities.map( (week, idx) => {
                  return(
                    <ScatterChart width={500} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
                      <XAxis type="category" dataKey="weekday" interval={0} tick={{ fontSize: 0 }} tickLine={{ transform: 'translate(0, -6)' }} />
                      <YAxis type="number" dataKey="distance" name={week[0].formattedDate.getDate()} height={10} width={80} tick={false} tickLine={false} axisLine={false} label={{ value: `${week[0].formattedDate.getDate()}`, position: 'insideRight' }}/>
                      <ZAxis type="number" dataKey="distance" domain={10} range={[10, 225]} />
                      <Tooltip cursor={{strokeDasharray: '3 3'}} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} />
                      <Scatter data={week} fill='#8884d8'/>
                    </ScatterChart>
                  );
                })
              }
            </div>
          </div>
          <FooterContainer />
        </div>
      )
    }
  }
}

export default TrainingLog
