import React from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loginLinks = () => {
      if (!this.props.currentUser) {
        return (
          <ul>
            <li>
              <Link to={this.props.linkRoute} className="navbar-login-link">{this.props.linkText}</Link>
            </li>
          </ul>
        );
      } else {
        return (
          <ul></ul>
        );
      }
    };
    return(
      <div className="nav-container">
        <div className="nav-master-div">
          <h1>
            <Link to="/" className="navbar-logo">RouTracer</Link>
          </h1>
          {loginLinks()}
        </div>
      </div>
    );
  }
}

export default NavBar;
