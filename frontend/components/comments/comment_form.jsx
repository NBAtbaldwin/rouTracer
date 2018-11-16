import React from 'react';
import { Link } from "react-router-dom";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
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

  onSubmit() {
    if(this.props.formType === 'new') {
      this.props.createComment(this.state);
    } else {
      this.props.updateComment(this.state);
    }
  }

  render() {


    return(
      <form onSubmit={this.onSubmit}>
        <h3>{this.props.currentUser.email}</h3>
        <input type="text" value={this.state.body}
        onChange={this.updateField('body')}/>
      <input type="submit" value={this.props.formType === 'edit' ? "Edit" : "Post"} />
      </form>

    )
  }

}

export default CommentForm;
