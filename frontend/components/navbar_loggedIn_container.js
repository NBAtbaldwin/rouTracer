import { connect } from 'react-redux';
import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    linkText: "",
    linkRoute: "",
    currentUser: state.entities.users[state.session.id],
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {

// };

export default connect(mapStateToProps, null)(NavBar);
