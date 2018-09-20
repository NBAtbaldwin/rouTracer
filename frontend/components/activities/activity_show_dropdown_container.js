import { connect } from 'react-redux';
import ActivityShowDropdown from './activity_show_dropdown';
import { deleteActivity } from "./../../actions/activity_actions";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
});


const mapDispatchToProps = (dispatch) => ({
  deleteActivity: (id) => dispatch(deleteActivity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityShowDropdown);
