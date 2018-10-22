import { updateRoute, fetchRoute } from './../../actions/route_actions';
import { connect } from 'react-redux';
import RouteBuilder from './route_builder';

const mapStateToProps = (state, ownProps) => ({
  defaultRoute: { route_name: "", activity_type: "WALKING", coordinates_list: "", user_id: parseInt(state.entities.users[state.session.id].id), description: "", est_duration: 0, elevation: 0, distance: 0, marker_coordinates: [] },
  route: state.entities.routes[ownProps.match.params.routeId],
  flag: true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: (route) => dispatch(updateRoute(route)),
  fetchRoute: (id) => dispatch(fetchRoute(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteBuilder);
