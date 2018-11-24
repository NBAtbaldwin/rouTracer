import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchActivities } from "./../actions/activity_actions";
import { fetchUser } from "./../actions/user_actions";
import { routeSelectorHash, friendsRouteSelectorHash, userActivitySelector, friendsActivitySelector, friendsSelector } from "./../reducers/selectors";
import { fetchComments } from "./../actions/comment_actions";
import * as ChartUtil from "./../util/chart_util";

function sortByDate(data) {
  let output = data.sort(function(a, b) {
    if (ChartUtil.parseDate(a.date) < ChartUtil.parseDate(b.date)) {
      return 1;
    }
    if (ChartUtil.parseDate(a.date) > ChartUtil.parseDate(b.date)) {
      return -1;
    }
    return 0;
  });
  return output;
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  friends: friendsSelector(state),
  activities: sortByDate(userActivitySelector(state)),
  friendActivities: sortByDate(friendsActivitySelector(state)),
  routes: routeSelectorHash(state),
  friendRoutes: friendsRouteSelectorHash(state),
  loading: Boolean(state.ui.loading.activityLoading),
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities()),
  fetchComments: () => dispatch(fetchComments()),
  fetchUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
