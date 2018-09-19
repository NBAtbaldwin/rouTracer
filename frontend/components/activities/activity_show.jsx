import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import NavbarLoggedInContainer from "./../navbar_loggedIn_container";
import * as ConversionUtil from "./../../util/conversion_util";
import ActivityShowItem from "./activity_show_item";
import FooterContainer from "./../footer_container"

class ActivityShow extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchActivity(this.props.match.params.activityId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.activityId !== nextProps.match.params.activityId) {
    this.props.fetchActivity(nextProps.match.params.activityId)
    }
  }

  handleDelete(){
    this.props.deleteActivity(this.props.activity.id).then(() => this.props.history.push("/"));
  }

  render() {
    const that = this;
    const activityPanel = () => {
      if (this.props.activity !== undefined) {
        return (
          <div className="activity-show-item">
            <section>
              <button onClick={this.handleDelete}>Delete</button>
              <button><Link to={`/edit_activity/${this.props.activity.id}`}>Edit</Link></button>
            </section>
            <ActivityShowItem route={this.props.route} activity={this.props.activity} currentUser = {this.props.currentUser} />
          </div>
        );
      } else {
        return (
          <div>
            Loading
          </div>
        );
      }
    };
    return(
      <div>
        <NavbarLoggedInContainer />
        {activityPanel()}
        <FooterContainer />
      </div>
    );
  }
}

export default ActivityShow;
