import { connect } from 'react-redux';
import SuggestedFriends from './suggested_friends';
import { fetchActivities } from "./../../actions/activity_actions";
import { fetchUser, fetchPendingFriends, createFriendship } from "./../../actions/user_actions";
import { routeSelectorHash, friendsRouteSelectorHash, userActivitySelector, friendsActivitySelector, friendsSelector, strangersSelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  friends: friendsSelector(state),
  suggestedFriends: strangersSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities()),
  fetchUser: (id) => dispatch(fetchUser(id)),
  fetchPendingFriends: () => dispatch(fetchPendingFriends()),
  createFriendship: (friendship) => dispatch(createFriendship(friendship)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFriends);
