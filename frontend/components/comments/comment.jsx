import React from 'react';
import { Link } from "react-router-dom";
import CommentFormContainer from "./comment_form_container";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      new: this.props.new,
      body: this.props.comment.body,
    }
    this.deleteComment = this.deleteComment.bind(this);
    this.setEdit = this.setEdit.bind(this);
  }

  deleteComment() {
    this.props.deleteComment(this.props.comment.id);
  }

  setEdit() {
    this.setState({edit: true});
  }

  componentDidUpdate(prevProps) {
    if (this.props.comment !== prevProps.comment) {
      this.setState({edit: false, body: this.props.comment.body});
    }
  }

  render() {
    const form = () => {
      if(this.state.new) {
        return (
          <CommentFormContainer activity={this.props.activity} formType={"new"} comment={null}/>
        )
      } else if (this.state.edit) {
        return (
          <CommentFormContainer activity={this.props.activity} formType={"edit"} comment={this.props.comment} />
        )
      } else {
        return (
          <div>
            <h3>{this.props.user ? this.props.user.email : ""}</h3>
            <p>{this.state.body}</p>
          </div>
        )
      }
    }

    const deleteButton = () => {
      if(this.props.comment.user_id == this.props.currentUser.id) {
        return (
          <div className='comment-options'>
            <i className="far fa-trash-alt" onClick={this.deleteComment}></i>
            <i class="far fa-edit" onClick={this.setEdit}></i>
          </div>

        )
      } else {
        return (
          <div className='delete-comment'>
          </div>
        )
      }
    }

    return(
      <main className={this.state.new || this.state.edit ? 'comment-main-new' : 'comment-main'}>
        <div>
          <section>
            <img src={this.props.user ? this.props.user.photoUrl : ""} className="user-img"></img>
            {form()}
          </section>
          {deleteButton()}
        </div>
      </main>
    )
  }

}

export default Comment;
