import { connect } from 'react-redux';
import Profile from './profile';
import { fetchActivities } from "./../../actions/activity_actions";
import { fetchUser, createFriendship, updateFriendship, deleteFriendship, fetchPendingFriends } from "./../../actions/user_actions";
import { routeSelectorHash, friendsRouteSelectorHash, agnosticActivitySelector, friendsSelector, pendingFriendsSelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  user: state.entities.users[ownProps.match.params.userId],
  friends: friendsSelector(state, ownProps.match.params.userId),
  activities: agnosticActivitySelector(state, ownProps.match.params.userId),
  routes: routeSelectorHash(state, ownProps.match.params.userId),
  pendingFriends: pendingFriendsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities()),
  fetchUser: (id) => dispatch(fetchUser(id)),
  fetchPendingFriends: () => dispatch(fetchPendingFriends()),
  updateFriendship: (friendship) => dispatch(updateFriendship(friendship)),
  createFriendship: (friendship) => dispatch(createFriendship(friendship)),
  deleteFriendship: (friendship) => dispatch(deleteFriendship(friendship)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
