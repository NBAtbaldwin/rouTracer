import React from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="nav-master-div">
        <h1>
          <Link to="/" className="navbar-logo">RouTracer</Link>
        </h1>
        <ul>
          <li>
            <Link to={this.props.linkRoute} className="navbar-login-link">{this.props.linkText}</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
