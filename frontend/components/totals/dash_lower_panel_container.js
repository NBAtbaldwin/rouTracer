import { connect } from 'react-redux';
import DashLowerPanel from './dash_lower_panel';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
})


const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, null)(DashLowerPanel);
