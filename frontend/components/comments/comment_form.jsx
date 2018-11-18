import React from 'react';
import { Link } from "react-router-dom";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.formType === 'new') {
      this.state = {
        user_id: this.props.currentUser.id,
        activity_id: this.props.activity.id,
        body: "",
      }
    } else {
      this.state = {
        id: this.props.comment.id,
        user_id: this.props.currentUser.id,
        activity_id: this.props.activity.id,
        body: this.props.comment.body,
      }
    }
    this.updateField = this.updateField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  onSubmit(e) {
    e.preventDefault;
    if(this.props.formType === 'new') {
      this.props.createComment(this.state);
    } else {
      this.props.updateComment(this.state);
    }
  }

  render() {


    return(
      <form onSubmit={this.state.body ? this.onSubmit : null} className="comment-form">
        <input type="text" value={this.state.body}
        onChange={this.updateField('body')} placeholder="Add a comment" autoFocus="autofocus" />
        <input type="submit" value={this.props.formType === 'edit' ? "Edit" : "Post"} />
      </form>

    )
  }

}

export default CommentForm;
