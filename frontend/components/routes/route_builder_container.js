import { createRoute } from './../../actions/route_actions';
import { connect } from 'react-redux';
import RouteBuilder from './route_builder';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  newRoute: { route_name: "", activity_type: "", coordinates_list: "", user_id: parseInt(state.entities.users[state.session.id].id), description: "", est_duration: 1, elevation: 1, distance: 1 }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createRoute: (route) => dispatch(createRoute(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteBuilder);
