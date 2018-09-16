import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import RouteIndexItemContainer from './route_index_item_container';
import FooterContainer from "./../../footer_container";
import NavbarLoggedInContainer from "./../../navbar_loggedIn_container";

class RouteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity_type: "WALKING"
    }
    this.updateActivity = this.updateActivity.bind(this);
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  updateActivity(activity) {
    return (e) => {
      this.setState({activity_type: activity});
    };
  }

  render() {
    const activity = this.state.activity_type;
    return(
      <div>
        <NavbarLoggedInContainer />
        <button>
          <Link to="/new_route">Create New Route</Link>
        </button>
        <button onClick={this.updateActivity('BICYCLING')}>Ride</button>
        <button onClick={this.updateActivity('WALKING')}>Run</button>
        <h1>My Routes</h1>
        <div>
          <ul>
            {this.props.routes.map((route, idx) => {
              if (route.activity_type === activity) {              return <RouteIndexItemContainer key={idx} route={route} />;
              }
            })}
          </ul>
        </div>
        <FooterContainer />
      </div>
    );
  }
}

export default RouteIndex;


// {this.props.routes.map((route) => {
//   return <li>{route.route_name}</li>
// })}
