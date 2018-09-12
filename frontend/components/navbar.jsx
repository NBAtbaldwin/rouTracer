import React from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div class="nav-master-div">
        <h1>
          <Link to="/" class="navbar-logo">RouTracer</Link>
        </h1>
        <Link to={this.props.linkRoute} class="navbar-login-link">{this.props.linkText}</Link>
      </div>
    );
  }
}

export default NavBar;
