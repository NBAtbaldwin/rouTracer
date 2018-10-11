import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { fetchUser, fetchUsers } from "./../../actions/user_actions";
import { routeSelectorHash, friendsRouteSelectorHash, userActivitySelector, friendsActivitySelector, friendsSelector, allUsersSelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  users: allUsersSelector(state),
  friends: friendsSelector(state),
  activities: userActivitySelector(state),
  friendActivities: friendsActivitySelector(state),
  routes: routeSelectorHash(state),
  friendRoutes: friendsRouteSelectorHash(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities()),
  fetchUser: (id) => dispatch(fetchUser(id)),
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
