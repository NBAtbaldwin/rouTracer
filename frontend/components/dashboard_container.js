import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchActivities } from "./../actions/activity_actions";
import { fetchUser } from "./../actions/user_actions";
import { routeSelectorHash, friendsRouteSelectorHash, userActivitySelector, friendsActivitySelector, friendsSelector } from "./../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  friends: friendsSelector(state),
  activities: userActivitySelector(state),
  friendActivities: friendsActivitySelector(state),
  routes: routeSelectorHash(state),
  friendRoutes: friendsRouteSelectorHash(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities()),
  fetchUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
