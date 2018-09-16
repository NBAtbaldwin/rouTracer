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
      <div className="route-index-main">
        <NavbarLoggedInContainer />
        <section>
          <header>
            <div>
              <h1>My Routes</h1>
              <button>
                <Link to="/new_route">Create New Route</Link>
              </button>
            </div>
            <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/routes/route-list-mobile-upsell-c1aec554d010e3c86411ad560615802162318875f086d1e3ed4850d6c7014b8f.png"/>
          </header>
          <button onClick={this.updateActivity('BICYCLING')}>Cycling</button>
          <button onClick={this.updateActivity('WALKING')}>Running</button>
          <div>
            <ul className="route-index-items">
              {this.props.routes.map((route, idx) => {
                if (route.activity_type === activity) {              return <RouteIndexItemContainer key={idx} route={route} />;
                }
              })}
            </ul>
          </div>
        </section>
        <FooterContainer />
      </div>
    );
  }
}

export default RouteIndex;


// {this.props.routes.map((route) => {
//   return <li>{route.route_name}</li>
// })}
