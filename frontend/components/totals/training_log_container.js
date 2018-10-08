import { connect } from 'react-redux';
import TrainingLog from './training_log';
import { fetchActivities } from "./../../actions/activity_actions";
import { userActivitySelector } from "./../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  activities: userActivitySelector(state),
})


const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingLog);
