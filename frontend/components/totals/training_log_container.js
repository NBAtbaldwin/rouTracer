import { connect } from 'react-redux';
import TrainingLog from './training_log';
import { fetchActivities } from "./../../actions/activity_actions";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  activities: Object.values(state.entities.activities)
})


const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingLog);
