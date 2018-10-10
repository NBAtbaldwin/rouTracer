import { connect } from 'react-redux';
import NavBar from './navbar';
import { logout } from './../actions/session_actions';
import { friendsSelector, strangersSelector, pendingFriendsSelector } from "./../reducers/selectors";
import { fetchUser, fetchPendingFriends, updateFriendship } from "./../actions/user_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    linkText: "",
    linkRoute: "",
    currentUser: state.entities.users[state.session.id],
    pendingFriends: pendingFriendsSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPendingFriends: () => dispatch(fetchPendingFriends()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
