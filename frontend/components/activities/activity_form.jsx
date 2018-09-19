import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import NavbarLoggedInContainer from "./../navbar_loggedIn_container";
import * as ConversionUtil from "./../../util/conversion_util";

class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.defaultActivity;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateRide = this.updateRide.bind(this);
  }

  componentDidMount() {
    this.props.fetchActivities();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state).then(() => this.props.history.push('/'))
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
      console.log(this.state);
    };
  }

  updateTime(unit) {
    return (e) => {
      this.setState({[unit]: e.currentTarget.value});
      let seconds = this.state.seconds + this.state.minutes*60 + this.state.hours*3600;
      this.setState({duration: seconds});
    };
  }

  updateRide() {

    let findRide = (id) => {
      let output
      this.props.routes.forEach((route) => {
        if (route.id == id) {
          output = route;
        }
      })
      return output
    }
    findRide = findRide.bind(this);
    return (e) => {
      const ride = findRide(e.currentTarget.value);
      this.setState({
        distance: ride.distance,
        elevation: ride.elevation,
        activity_type: ride.activity_type,
      });
    };
  }

  render() {
    return(
      <div>
        <NavbarLoggedInContainer />
        <section>
          <h1>Manual Entry</h1>
          <form onSubmit={this.handleSubmit}>

            <label>Distance</label>
            <input type="text" value={this.state.distance}
            onChange={this.updateField('distance')} />miles

            <label>Duration</label>
            <input onChange={this.updateTime('hours')} value={this.state.hours} type="text" placeholder="1" />hr
            <input onChange={this.updateTime('minutes')} value={this.state.minutes} type="text" placeholder="00" />min
            <input onChange={this.updateTime('seconds')} value={this.state.seconds} type="text" placeholder="00" />s

            <label>Elevation</label>
            <input type="text" value={this.state.elevation}
            onChange={this.updateField('elevation')}/>feet

            <label>Sport</label>
            <select name="Activity" onChange={this.updateField('activity_type')}>
              <option value="WALKING">Run</option>
              <option value="BICYCLING">Ride</option>
            </select>

            <label>Date</label>
            <input type="date" value={this.state.date} min="2018-01-01" max="2018-12-31" onChange={this.updateField('date')} />

            <label>Route (optional)</label>
            <select name="Routes" onChange={this.updateRide()}>
              <option value={null} disabled selected>--Select Route--</option>
              {this.props.routes.map((route, idx) => (
                <option key={idx} value={route.id}>{route.route_name}</option>
              ))}
            </select>

            <label>Title</label>
            <input type="text" value={this.state.title}
            onChange={this.updateField('title')} />

            <input type="submit" value="Create" />
            <p>Cancel</p>
          </form>
          <ul>
            {this.props.errors.map((error) => {
              return (
                <li>{error}</li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default ActivityForm;
