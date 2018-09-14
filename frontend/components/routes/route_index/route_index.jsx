import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class RouteIndex extends React.Component {

  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {
    return(
      <div>
        <button>
          <Link to="/routes/new">Create New Route</Link>
        </button>
        <h1>My Routes</h1>
        <div>
          <ul>
            {this.props.routes.map((route, idx) => {
              return <li key={idx}>{route.route_name}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default RouteIndex;


// {this.props.routes.map((route) => {
//   return <li>{route.route_name}</li>
// })}
