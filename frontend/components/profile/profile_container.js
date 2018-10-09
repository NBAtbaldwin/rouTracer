import { connect } from 'react-redux';
import Profile from './profile';
import { fetchActivities } from "./../../actions/activity_actions";
import { fetchUser, createFriendship, updateFriendship, deleteFriendship, fetchPendingFriends } from "./../../actions/user_actions";
import { routeSelectorHash, friendsRouteSelectorHash, userActivitySelector, friendsActivitySelector, friendsSelector, pendingFriendsSelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  friends: friendsSelector(state),
  activities: userActivitySelector(state),
  friendActivities: friendsActivitySelector(state),
  routes: routeSelectorHash(state),
  friendRoutes: friendsRouteSelectorHash(state),
  pendingFriends: pendingFriendsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities()),
  fetchUser: (id) => dispatch(fetchUser(id)),
  fetchPendingFriends: () => dispatch(fetchPendingFriends()),
  updateFriendship: (friendship) => dispatch(updateFriendship(friendship)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
