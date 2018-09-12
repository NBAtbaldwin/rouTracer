import React from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>
          <Link to="/">RouTracer</Link>
        </h1>
        <Link to={this.props.linkRoute}>{this.props.linkText}</Link>
      </div>
    );
  }
}

export default NavBar;
