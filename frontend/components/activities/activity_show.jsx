import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import NavbarLoggedInContainer from "./../navbar_loggedIn_container";
import * as ConversionUtil from "./../../util/conversion_util";
import ActivityShowItem from "./activity_show_item";
import FooterContainer from "./../footer_container";
import ActivityShowDropdownContainer from "./activity_show_dropdown_container";

class ActivityShow extends React.Component {
  constructor(props) {
    super(props)
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchActivity(this.props.match.params.activityId).then(() => {
      this.props.fetchUser(this.props.activity.user_id)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.activityId !== nextProps.match.params.activityId) {
    this.props.fetchActivity(nextProps.match.params.activityId).then(() => {
      this.props.fetchUser(this.props.activity.user_id)
    })
    }
  }

  // handleDelete(){
  //   this.props.deleteActivity(this.props.activity.id).then(() => this.props.history.push("/"));
  // }

  render() {
    const that = this;
    const activityPanel = () => {
      if (this.props.activity !== undefined && this.props.users[this.props.activity.user_id] !== undefined) {
        const user = this.props.users[this.props.activity.user_id];
        return (
          <div className="activity-show-item">
            {user === this.props.currentUser && (
              <ActivityShowDropdownContainer id={this.props.activity.id} />
            )}
            {user !== this.props.currentUser && (
              <section></section>
            )}
            <ActivityShowItem route={this.props.route} activity={this.props.activity} user = {user} currentUser = {this.props.currentUser} nestedInProfile={false} />
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
      <div className="activity-show-master">
        <NavbarLoggedInContainer />
        {activityPanel()}
        <FooterContainer />
      </div>
    );
  }
}

export default ActivityShow;

// <section>
//   <button><Link to={`/edit_activity/${this.props.activity.id}`}><i className="fas fa-edit"></i></Link></button>
//   <button onClick={this.handleDelete}><i className="fas fa-wrench"></i></button>
//   <ActivityShowDropdownContainer id={this.props.activity.id} />
// </section>
