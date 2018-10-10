import { connect } from 'react-redux';
import Requests from './requests';
import { fetchUser, fetchPendingFriends, updateFriendship, deleteFriendship } from "./../../actions/user_actions";
import { friendsSelector, strangersSelector, pendingFriendsSelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  friends: friendsSelector(state),
  pendingFriends: pendingFriendsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
  fetchPendingFriends: () => dispatch(fetchPendingFriends()),
  updateFriendship: (friendship) => dispatch(updateFriendship(friendship)),
  deleteFriendship: (friendship) => dispatch(deleteFriendship(friendship)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
