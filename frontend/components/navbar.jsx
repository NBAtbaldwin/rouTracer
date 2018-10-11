import React from 'react';
import { Link } from "react-router-dom";
import RequestsContainer from "./friends/requests_container";
import SearchContainer from "./search/search_container";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: "hidden",
      training: "hidden",
      profPic: "hidden",
      addActivity: "hidden",
      bell: "hidden",
      search: false,
    }
    this.makeHidden = this.makeHidden.bind(this);
    this.makeDisplayed = this.makeDisplayed.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  componentDidMount() {
    if(this.props.currentUser) {
      this.props.fetchPendingFriends();
    }
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

  toggleSearch() {
    this.setState({search: !this.state.search})
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
              <div className="nav-search">
                {!this.state.search && (
                  <i className="fas fa-search" onClick={this.toggleSearch}></i>
                )}
                {this.state.search && (
                  <SearchContainer />
                )}
                {this.state.search && (
                  <i class="fas fa-times" onClick={this.toggleSearch}></i>
                )}
              </div>
              <ul>
                <ul onMouseOver={this.makeHidden("dashboard")} onMouseOut={this.makeDisplayed("dashboard")}><Link to="/dashboard">Dashboard<i className="fas fa-chevron-down"></i></Link>
                  <ul className={this.state.dashboard}>
                    <li><Link to="/dashboard">Activity Feed</Link></li>
                    <li><Link to="/routes">My Routes</Link></li>
                  </ul>
                </ul>
                <ul onMouseOver={this.makeHidden("training")} onMouseOut={this.makeDisplayed("training")}><Link to="/training">Training<i className="fas fa-chevron-down"></i></Link>
                  <ul className={this.state.training}>
                    <li><Link to="/training_log">Training Log</Link></li>
                  </ul>
                </ul>
              </ul>
            </div>
            <div className="profile">
              <li onMouseOver={this.makeHidden("bell")} onMouseOut={this.makeDisplayed("bell")} className='bell'>
                <div>
                  <i className="far fa-bell"></i>
                  {this.props.pendingFriends && this.props.pendingFriends.length > 0 && (
                    <span>{this.props.pendingFriends.length}</span>
                  )}
                </div>
                <ul className={this.state.bell}>
                  <RequestsContainer />
                </ul>
              </li>
              <li onMouseOver={this.makeHidden("profPic")} onMouseOut={this.makeDisplayed("profPic")}>
                <div className="prof-pic">
                </div>
                <i className="fas fa-chevron-down"></i>
                <ul className={this.state.profPic}>
                  <li><Link to={`/profile/${this.props.currentUser.id}`}>My Profile</Link></li>
                  <li onClick={this.props.logout}>Log Out</li>
                </ul>
              </li>
              <li className="add-workout" onMouseOver={this.makeHidden("addActivity")} onMouseOut={this.makeDisplayed("addActivity")}>
                <div id='add-workout'>+
                </div>
                <ul className={this.state.addActivity}>
                  <li><i className="far fa-file"></i><Link to="/upload">Add Manual entry</Link></li>
                  <li><i className="fas fa-location-arrow"></i><Link to="/new_route">Create a Route</Link></li>
                </ul>
              </li>
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
