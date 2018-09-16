import { deleteRoute, updateRoute } from './../../../actions/route_actions';
import { connect } from 'react-redux';
import RouteIndexItem from './route_index_item';

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteRoute: (id) => dispatch(deleteRoute(id)),
})

export default connect(null, mapDispatchToProps)(RouteIndexItem);
