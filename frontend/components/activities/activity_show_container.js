import { connect } from 'react-redux';
import ActivityShow from './activity_show';
import { fetchActivity, deleteActivity } from "./../../actions/activity_actions";
import { routeSelector } from './../../reducers/selectors.js';

const findRide = (routes, activity) => {
  if (activity === undefined) {
    return null;
  }
  let output;
  routes.forEach((route) => {
    if (route.id == activity.route_id) {
      output = route;
    }
  })
  return output
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  activity: state.entities.activities[ownProps.match.params.activityId],
  route: findRide(routeSelector(state), state.entities.activities[ownProps.match.params.activityId]),
  errors: state.errors.activity,
});


const mapDispatchToProps = (dispatch) => ({
  fetchActivity: (id) => dispatch(fetchActivity(id)),
  deleteActivity: (id) => dispatch(deleteActivity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityShow);
