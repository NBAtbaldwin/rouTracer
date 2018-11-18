import { connect } from 'react-redux';
import LikeButton from './like_button';
import { fetchLike, deleteLike, createLike } from "./../../actions/like_actions";
import { fetchActivity } from "./../../actions/activity_actions";
import { currentUserActivityLikeSelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => {
  return({
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[state.session.id],
    activity: ownProps.activity,
    like: currentUserActivityLikeSelector(state, ownProps.activity, state.session.id),
  })
}

const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivity(id)),
  fetchLike: (id) => dispatch(fetchLike(id)),
  deleteLike: (id) => dispatch(deleteLike(id)),
  createLike: (like) => dispatch(createLike(like)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
