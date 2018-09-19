import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchActivities } from "./../actions/activity_actions";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  activities: Object.values(state.entities.activities),
  routes: state.entities.routes,
})


const mapDispatchToProps = (dispatch) => ({
  fetchActivities: () => dispatch(fetchActivities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
