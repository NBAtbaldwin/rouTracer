import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    debugger
    return(
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
