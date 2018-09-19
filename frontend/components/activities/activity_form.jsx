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
    const that = this;
    if (this.props.flag === 'Create') {
      this.props.fetchActivities();
    } else {
      this.props.fetchActivity(this.props.match.params.activityId).then(() => {
        let activity = this.props.activity
        let hours = ConversionUtil.hrs(activity.duration);
        let minutes = ConversionUtil.mins(activity.duration);
        let seconds = ConversionUtil.secs(activity.duration);
        that.setState({
          id: activity.id,
          distance: activity.distance,
          duration: activity.duration,
          elevation: activity.elevation,
          activity_type: activity.activity_type,
          date: activity.date,
          title: activity.title,
          user_id: activity.user_id,
          route_id: activity.route_id,
          seconds: seconds,
          minutes: minutes,
          hours: hours,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const that = this;
    if (this.props.match.params.activityId !== nextProps.match.params.activityId) {
    this.props.fetchActivity(nextProps.match.params.activityId).then(() => {
      let activity = this.props.activity
      let hours = ConversionUtil.hrs(activity.duration);
      let minutes = ConversionUtil.mins(activity.duration);
      let seconds = ConversionUtil.secs(activity.duration);
      that.setState({
        id: activity.id,
        distance: activity.distance,
        duration: activity.duration,
        elevation: activity.elevation,
        activity_type: activity.activity_type,
        date: activity.date,
        title: activity.title,
        user_id: activity.user_id,
        route_id: activity.route_id,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
      });
    })
  }
}

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state).then(() => this.props.history.push('/'))
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  updateTime(e, unit) {
    this.setState({[unit]: e.currentTarget.value}, () => {
      let x = parseInt(this.state.seconds) + parseInt(this.state.minutes)*60 + parseInt(this.state.hours)*3600;
      this.setState({duration: x});
    });
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
        route_id: ride.id,
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
            <input onChange={ (e) => this.updateTime(e, "hours")} value={this.state.hours} type="text" placeholder="1" />hr
            <input onChange={ (e) => this.updateTime(e, "minutes")} value={this.state.minutes} type="text" placeholder="00" />min
            <input onChange={ (e) => this.updateTime(e, "seconds")} value={this.state.seconds} type="text" placeholder="00" />s

            <label>Elevation</label>
            <input type="text" value={this.state.elevation}
            onChange={this.updateField('elevation')}/>feet

            <label>Sport</label>
            <select name="Activity" onChange={this.updateField('activity_type')}>
              <option value="WALKING" selected={this.state.activity_type === "WALKING"}>Run</option>
              <option value="BICYCLING" selected={this.state.activity_type === "BICYCLING"}>Ride</option>
            </select>

            <label>Date</label>
            <input type="date" value={this.state.date} min="2018-01-01" max="2018-12-31" onChange={this.updateField('date')} />

            <label>Route (optional)</label>
            <select name="Routes" onChange={this.updateRide()}>
              <option value={null} disabled selected={this.state.route_id === null }>--Select Route--</option>
              {this.props.routes.map((route, idx) => (
                <option selected={this.state.route_id == route.id} key={idx} value={route.id}>{route.route_name}</option>
              ))}
            </select>

            <label>Title</label>
            <input type="text" value={this.state.title}
            onChange={this.updateField('title')} />

          <input type="submit" value={this.props.flag} />
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
