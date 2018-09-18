import { fetchRoute } from './../../../actions/route_actions';
import { connect } from 'react-redux';
import RouteShow from './route_show';

const mapStateToProps = (state, ownProps) => ({
  route: state.entities.routes[ownProps.match.params.routeId],
  user: state.entities.users[state.session.id]
});

// need to fetch user

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRoute: (id) => dispatch(fetchRoute(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteShow);
