import React from 'react';
import { Link } from "react-router-dom";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    }
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike() {
    this.setState({disabled: true});
    if(this.props.like) {
      this.props.deleteLike(this.props.like.id).then(res => {
        this.setState({disabled: false});
      })
    } else {
      this.props.createLike({user_id: this.props.currentUser.id, likeable_id: this.props.activity.id, likeable_type: "Activity"}).then(res => {
        this.setState({disabled: false});
      });
    }
  }

  render() {

    return(
      <div className="like-button" onClick={this.state.disabled ? null : this.handleLike}>
        <i className={this.props.like ? `fas fa-thumbs-up liked` : "far fa-thumbs-up"}></i>
      </div>
    )
  }
}

export default LikeButton;
