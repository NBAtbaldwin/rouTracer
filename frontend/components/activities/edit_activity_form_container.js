import { connect } from 'react-redux';
import ActivityForm from './activity_form';
import { updateActivity, fetchActivity } from "./../../actions/activity_actions";
import * as ConversionUtil from "./../../util/conversion_util";
import { routeSelector } from './../../reducers/selectors.js';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  defaultActivity: {
    distance: 0,
    duration: 0,
    elevation: 0,
    activity_type: "WALKING",
    date: ConversionUtil.yyyyMmDdDefault(),
    title: "",
    user_id: state.session.id,
    route_id: null,
    seconds: 0,
    minutes: 0,
    hours: 0,
  },
  activity: state.entities.activities[ownProps.match.params.activityId],
  routes: routeSelector(state),
  errors: state.errors.activity,
  flag: "Edit",
});


const mapDispatchToProps = (dispatch) => ({
  action: (activity) => dispatch(updateActivity(activity)),
  fetchActivity: (id) => dispatch(fetchActivity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
