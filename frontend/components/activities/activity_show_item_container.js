import { connect } from 'react-redux';
import ActivityShowItem from './activity_show_item';
import { fetchComment, createComment } from "./../../actions/comment_actions";
import { fetchActivity } from "./../../actions/activity_actions";
import { commentSelector, activityLikesSelector } from "./../../reducers/selectors";


const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  users: state.entities.users,
  comments: commentSelector(state, ownProps.activity.id),
  activity: ownProps.activity,
  likes: activityLikesSelector(state, ownProps.activity),
});


const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivity(id)),
  createComment: (comment) => dispatch(createComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityShowItem);
