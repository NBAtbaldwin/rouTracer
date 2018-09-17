import React from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: "hidden",
      training: "hidden",
    }
    this.makeHidden = this.makeHidden.bind(this);
    this.makeDisplayed = this.makeDisplayed.bind(this);
  }

  makeHidden(field) {
    return (e) => {
      this.state.field
      this.setState({[field]: "show"});
    }
  }

  makeDisplayed(field) {
    return (e) => {
      this.state.field
      this.setState({[field]: "hidden"});
    }
  }

  render() {
    const toggleNavbar = () => {
      if (!this.props.currentUser) {
        return (
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
      } else {
        return (
          <div className="nav-master-div">
            <div className="menu">
              <h1>
                <Link to="/" className="navbar-logo">RouTracer</Link>
              </h1>
              <i className="fas fa-search"></i>
              <ul>
                <ul onMouseOver={this.makeHidden("dashboard")} onMouseOut={this.makeDisplayed("dashboard")}><Link to="/dashboard">Dashboard<i className="fas fa-chevron-down"></i></Link>
                  <ul className={this.state.dashboard}>
                    <li><Link to="/dashboard">Activity Feed</Link></li>
                    <li><Link to="/routes">My Route</Link></li>
                  </ul>
                </ul>
                <ul onMouseOver={this.makeHidden("training")} onMouseOut={this.makeDisplayed("training")}><Link to="/training">Training<i className="fas fa-chevron-down"></i></Link>
                  <ul className={this.state.training}>
                    <li><Link to="/dashboard">Training Log</Link></li>
                    <li><Link to="/routes">My Activities</Link></li>
                  </ul>
                </ul>
              </ul>
            </div>
            <div className="profile">
              <li>thing</li>
              <li>thing</li>
              <li>thing</li>
            </div>
          </div>
        );
      }
    };
    return(
      <div className="nav-container">
          {toggleNavbar()}
      </div>
    );
  }
}

export default NavBar;
