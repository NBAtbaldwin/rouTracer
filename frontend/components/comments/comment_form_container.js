import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { fetchComment, deleteComment, updateComment, createComment } from "./../../actions/comment_actions";
import { fetchActivity } from "./../../actions/activity_actions";
import { commentSelector } from "./../../reducers/selectors";


const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  comment: ownProps.comment,
  activity: ownProps.activity,
  formType: ownProps.formType,
});


const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivity(id)),
  fetchComment: (id) => dispatch(fetchComment(id)),
  updateComment: (comment) => dispatch(updateComment(comment)),
  createComment: (comment) => dispatch(createComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
