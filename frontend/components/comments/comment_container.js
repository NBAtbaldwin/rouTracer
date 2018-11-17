import { connect } from 'react-redux';
import CommentShow from './comment';
import { fetchComment, deleteComment, updateComment, createComment } from "./../../actions/comment_actions";
import { fetchActivity } from "./../../actions/activity_actions";
import { commentSelector } from "./../../reducers/selectors";


const mapStateToProps = (state, ownProps) => {
  if(!ownProps.comment) {
    return({
      currentUser: state.entities.users[state.session.id],
      user: state.entities.users[state.session.id],
      comment: {body: ""},
      activity: ownProps.activity,
      new: ownProps.new,
    })
  } else {
    return({
      currentUser: state.entities.users[state.session.id],
      user: state.entities.users[ownProps.comment.user_id],
      comment: ownProps.comment,
      activity: ownProps.activity,
      new: ownProps.new,
    });
  }
}



const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivity(id)),
  fetchComment: (id) => dispatch(fetchComment(id)),
  deleteComment: (id) => dispatch(deleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
