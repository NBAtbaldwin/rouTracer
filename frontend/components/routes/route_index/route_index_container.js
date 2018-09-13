import { fetchRoutes } from './../../../actions/route_actions';
import { connect } from 'react-redux';
import RouteIndex from './route_index';
import { routeSelector } from './../../../reducers/selectors.js';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  routes: routeSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRoutes: () => dispatch(fetchRoutes())
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);
